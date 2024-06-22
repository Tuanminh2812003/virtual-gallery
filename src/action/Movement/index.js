import React, { useRef, useEffect, useState, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraContext from '../../helpers/CameraContext';

const CameraControls = () => {
    const { camera, gl } = useThree();
    const { setYaw } = useContext(CameraContext);
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);
    const rotateLeft = useRef(false);
    const rotateRight = useRef(false);
    const moveSpeed = 19;
    const smoothTime = 0.1;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const yaw = useRef(camera.rotation.y);
    const targetYaw = useRef(camera.rotation.y);
    const rotateSpeed = 0.03;
    const camHeight = 5;
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isTouchDevice = useRef(false);
    const aspect = useRef(window.innerWidth / window.innerHeight);
    const velocity = useRef(new THREE.Vector3());

    useEffect(() => {
        camera.position.set(5, camHeight, -10);
        yaw.current = camera.rotation.y;
        targetYaw.current = camera.rotation.y;
    }, [camera, camHeight]);

    useEffect(() => {
        const handleResize = () => {
            aspect.current = window.innerWidth / window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    moveForward.current = true;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    moveBackward.current = true;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    moveLeft.current = true;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    moveRight.current = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.code) {
                case 'KeyW':
                case 'ArrowUp':
                    moveForward.current = false;
                    break;
                case 'KeyS':
                case 'ArrowDown':
                    moveBackward.current = false;
                    break;
                case 'KeyA':
                case 'ArrowLeft':
                    moveLeft.current = false;
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    moveRight.current = false;
                    break;
                default:
                    break;
            }
        };

        const handleMouseDown = (event) => {
            setIsMouseDown(true);
            initialMousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = () => {
            setIsMouseDown(false);
        };

        const handleMouseMove = (event) => {
            if (isMouseDown) {
                targetYaw.current -= event.movementX * 0.005;

                const direction = new THREE.Vector3();
                direction.setFromMatrixColumn(camera.matrix, 0);
                direction.crossVectors(camera.up, direction);
                camera.position.addScaledVector(direction, -event.movementY * 0.05);

                initialMousePosition.current = { x: event.clientX, y: event.clientY };
            }
        };

        const handleTouchStart = (event) => {
            isTouchDevice.current = true;
            if (event.touches.length === 1) {
                setIsMouseDown(true);
                initialMousePosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }
        };

        const handleTouchEnd = () => {
            setIsMouseDown(false);
        };

        const handleTouchMove = (event) => {
            if (isMouseDown && event.touches.length === 1) {
                const deltaX = event.touches[0].clientX - initialMousePosition.current.x;
                const deltaY = event.touches[0].clientY - initialMousePosition.current.y;

                targetYaw.current -= deltaX * 0.005;

                const direction = new THREE.Vector3();
                direction.setFromMatrixColumn(camera.matrix, 0);
                direction.crossVectors(camera.up, direction);
                camera.position.addScaledVector(direction, -deltaY * 0.05);

                initialMousePosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }
        };

        const handleControl = (event) => {
            const { action, state } = event.detail;
            switch (action) {
                case 'forward':
                    moveForward.current = state;
                    break;
                case 'backward':
                    moveBackward.current = state;
                    break;
                case 'left':
                    moveLeft.current = state;
                    break;
                case 'right':
                    moveRight.current = state;
                    break;
                case 'rotateLeft':
                    rotateLeft.current = state;
                    break;
                case 'rotateRight':
                    rotateRight.current = state;
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        gl.domElement.addEventListener('mousedown', handleMouseDown);
        gl.domElement.addEventListener('mouseup', handleMouseUp);
        gl.domElement.addEventListener('mousemove', handleMouseMove);
        gl.domElement.addEventListener('touchstart', handleTouchStart);
        gl.domElement.addEventListener('touchend', handleTouchEnd);
        gl.domElement.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('control', handleControl);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
            gl.domElement.removeEventListener('mousedown', handleMouseDown);
            gl.domElement.removeEventListener('mouseup', handleMouseUp);
            gl.domElement.removeEventListener('mousemove', handleMouseMove);
            gl.domElement.removeEventListener('touchstart', handleTouchStart);
            gl.domElement.removeEventListener('touchend', handleTouchEnd);
            gl.domElement.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('control', handleControl);
        };
    }, [camera, gl.domElement, isMouseDown]);

    useFrame((state, delta) => {
        const direction = new THREE.Vector3();
        const right = new THREE.Vector3();
        const moveVector = new THREE.Vector3();

        if (moveForward.current) {
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            moveVector.addScaledVector(direction, moveSpeed * delta);
        }

        if (moveBackward.current) {
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            moveVector.addScaledVector(direction, -moveSpeed * delta);
        }

        if (moveLeft.current) {
            right.setFromMatrixColumn(camera.matrix, 0);
            moveVector.addScaledVector(right, -moveSpeed * delta);
        }

        if (moveRight.current) {
            right.setFromMatrixColumn(camera.matrix, 0);
            moveVector.addScaledVector(right, moveSpeed * delta);
        }

        // Apply smoothing to camera movement
        velocity.current.lerp(moveVector, smoothTime);
        camera.position.add(velocity.current);

        if (rotateLeft.current) {
            targetYaw.current += rotateSpeed;
        }

        if (rotateRight.current) {
            targetYaw.current -= rotateSpeed;
        }

        // Smoothly interpolate the camera rotation
        yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.1);

        camera.rotation.set(0, yaw.current, 0);
        setYaw(camera.rotation.y);

        // Set boundaries for x and z axes
        const xMin = -61;
        const xMax = 61;
        const zMin = -25;
        const zMax = 25;
        // Clamp the camera position within the defined boundaries
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, xMin, xMax);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, zMin, zMax);

        // console.log(camera.position.x, camera.position.y, camera.position.z);
    });

    return null;
};

export default CameraControls;
