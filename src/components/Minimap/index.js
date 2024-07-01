import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { Tween, Easing, update as TWEENUpdate } from '@tweenjs/tween.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { throttle } from 'lodash';

const Minimap = ({ items, handlePictureClick }) => {
    const { scene, camera } = useThree();
    const minimapCamera = useRef();
    const minimapRenderer = useRef();
    const minimapLabelRenderer = useRef();
    const userPositionRef = useRef();
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const clickTargets = useRef([]);
    const [hovered, setHovered] = useState(null);

    const initializeMinimap = useCallback(() => {
        console.log("Initializing minimap...");

        if (!minimapCamera.current) {
            const aspect = window.innerWidth / window.innerHeight;
            const size = 35;
            minimapCamera.current = new THREE.OrthographicCamera(-size * aspect, size * aspect, size, -size, 0.1, 1000);
            minimapCamera.current.position.set(0, 50, 0);
            minimapCamera.current.lookAt(0, 0, 0);
            console.log("Minimap camera initialized");
        }

        if (!minimapRenderer.current) {
            minimapRenderer.current = new THREE.WebGLRenderer({ antialias: true });
            minimapRenderer.current.setSize(window.innerWidth * 0.225, window.innerHeight * 0.225);
            minimapRenderer.current.domElement.style.position = 'absolute';
            minimapRenderer.current.domElement.style.top = '10px';
            minimapRenderer.current.domElement.style.left = '10px';
            minimapRenderer.current.domElement.style.zIndex = '1000';
            minimapRenderer.current.domElement.style.border = '#56A0D8 solid 3px';
            minimapRenderer.current.domElement.style.borderRadius = '8px';
            document.body.appendChild(minimapRenderer.current.domElement);
            console.log("Minimap renderer initialized and added to DOM");
        }

        if (!minimapLabelRenderer.current) {
            minimapLabelRenderer.current = new CSS2DRenderer();
            minimapLabelRenderer.current.setSize(window.innerWidth * 0.225, window.innerHeight * 0.225);
            minimapLabelRenderer.current.domElement.style.position = 'absolute';
            minimapLabelRenderer.current.domElement.style.top = '10px';
            minimapLabelRenderer.current.domElement.style.left = '10px';
            minimapLabelRenderer.current.domElement.style.zIndex = '1001';
            minimapLabelRenderer.current.domElement.style.pointerEvents = 'none';
            document.body.appendChild(minimapLabelRenderer.current.domElement);
            console.log("Minimap label renderer initialized and added to DOM");
        }

        if (!userPositionRef.current) {
            const userGeometry = new THREE.SphereGeometry(2, 32, 32);
            const userMaterial = new THREE.MeshBasicMaterial({ color: '#fff' });
            userPositionRef.current = new THREE.Mesh(userGeometry, userMaterial);
            scene.add(userPositionRef.current);
            console.log("User position indicator added to scene");
        }

        if (clickTargets.current.length === 0) {
            items.forEach((item) => {
                const geometry = new THREE.BoxGeometry(0, 0, 0);
                const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, visible: false });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(...item.position);
                mesh.userData = item;
                clickTargets.current.push(mesh);
                scene.add(mesh);

                const infoDiv = document.createElement('div');
                infoDiv.className = 'minimap-label'; 
                infoDiv.textContent = `${item.info.artist}: ${item.info.title}`;
                infoDiv.style.pointerEvents = 'auto';
                const infoLabel = new CSS2DObject(infoDiv);
                infoLabel.position.set(0, 3, 0);
                infoLabel.element.addEventListener('click', (event) => {
                    event.stopPropagation();
                    handlePictureClick(item.position, item.rotation, item.imageUrl, mesh, item.info);
                });
                mesh.add(infoLabel);
                console.log(`Info element for ${item.info.title} created and added to the scene`);
            });
        }
    }, [items, scene, handlePictureClick]);

    useEffect(() => {
        initializeMinimap();

        const handleMouseMove = throttle((event) => {
            const rect = minimapRenderer.current.domElement.getBoundingClientRect();
            mouse.current.x = ((event.clientX - rect.left) / minimapRenderer.current.domElement.clientWidth) * 2 - 1;
            mouse.current.y = -((event.clientY - rect.top) / minimapRenderer.current.domElement.clientHeight) * 2 + 1;

            raycaster.current.setFromCamera(mouse.current, minimapCamera.current);
            const intersects = raycaster.current.intersectObjects(clickTargets.current);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                setHovered(intersectedObject.userData);
                intersectedObject.children.forEach((child) => {
                    if (child instanceof CSS2DObject) {
                        child.element.style.display = 'block';
                    }
                });
            } else {
                setHovered(null);
                clickTargets.current.forEach(mesh => {
                    mesh.children.forEach((child) => {
                        if (child instanceof CSS2DObject) {
                            child.element.style.display = 'none';
                        }
                    });
                });
            }
        }, 100);

        const handleClick = (event) => {
            console.log('Minimap click event triggered');
            const rect = minimapRenderer.current.domElement.getBoundingClientRect();
            mouse.current.x = ((event.clientX - rect.left) / minimapRenderer.current.domElement.clientWidth) * 2 - 1;
            mouse.current.y = -((event.clientY - rect.top) / minimapRenderer.current.domElement.clientHeight) * 2 + 1;

            raycaster.current.setFromCamera(mouse.current, minimapCamera.current);
            const intersects = raycaster.current.intersectObjects(clickTargets.current);
            if (intersects.length > 0) {
                const intersectedObject = intersects[0].object;
                if (intersectedObject.userData) {
                    const item = items.find(item => item.position.every((val, index) => val === intersectedObject.position.toArray()[index]));
                    if (item) {
                        handlePictureClick(item.position, item.rotation, item.imageUrl, intersectedObject, item.info);
                    }
                }
            } else {
                raycaster.current.setFromCamera(mouse.current, minimapCamera.current);
                const intersectsScene = raycaster.current.intersectObjects(scene.children, true);
                if (intersectsScene.length > 0) {
                    const targetPosition = intersectsScene[0].point;
                    moveToPosition(targetPosition);
                }
            }
        };

        const moveToPosition = (position) => {
            const targetPosition = new THREE.Vector3(position.x, 5, position.z);
            const start = {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z,
            };
            const end = {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
            };

            new Tween(start)
                .to(end, 1000)
                .easing(Easing.Quadratic.Out)
                .onUpdate(() => {
                    camera.position.set(start.x, start.y, start.z);
                })
                .start();
        };

        minimapRenderer.current.domElement.addEventListener('mousemove', handleMouseMove);
        minimapRenderer.current.domElement.addEventListener('click', handleClick);

        const handleResize = () => {
            if (minimapRenderer.current) {
                minimapRenderer.current.setSize(window.innerWidth * 0.225, window.innerHeight * 0.225);
            }
            if (minimapLabelRenderer.current) {
                minimapLabelRenderer.current.setSize(window.innerWidth * 0.225, window.innerHeight * 0.225);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            if (minimapRenderer.current && minimapRenderer.current.domElement && minimapRenderer.current.domElement.parentNode) {
                minimapRenderer.current.dispose();
                document.body.removeChild(minimapRenderer.current.domElement);
                minimapRenderer.current = null;
                console.log("Minimap renderer removed from DOM");
            }
            if (minimapLabelRenderer.current && minimapLabelRenderer.current.domElement && minimapLabelRenderer.current.domElement.parentNode) {
                document.body.removeChild(minimapLabelRenderer.current.domElement);
                minimapLabelRenderer.current = null;
                console.log("Minimap label renderer removed from DOM");
            }
            if (userPositionRef.current) {
                scene.remove(userPositionRef.current);
                userPositionRef.current = null;
                console.log("User position indicator removed from scene");
            }
            clickTargets.current.forEach(mesh => {
                scene.remove(mesh);
                console.log(`Mesh for ${mesh.userData.info.title} removed from scene`);
            });
            clickTargets.current = [];
            minimapRenderer.current?.domElement.removeEventListener('mousemove', handleMouseMove);
            minimapRenderer.current?.domElement.removeEventListener('click', handleClick);
            window.removeEventListener('resize', handleResize);
        };
    }, [initializeMinimap, items, scene, handlePictureClick]);

    useFrame(() => {
        try {
            TWEENUpdate();

            if (userPositionRef.current) {
                userPositionRef.current.position.copy(camera.position);
            }

            if (minimapCamera.current && minimapRenderer.current) {
                minimapRenderer.current.render(scene, minimapCamera.current);
            }

            if (minimapLabelRenderer.current) {
                minimapLabelRenderer.current.render(scene, minimapCamera.current);
            }
        } catch (error) {
            console.error('Error in Minimap useFrame:', error);
        }
    });

    return null;
};

export default Minimap;
