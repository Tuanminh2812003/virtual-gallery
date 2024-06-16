import React, { useRef, useEffect, useState, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraContext from '../../helpers/CameraContext';

const CameraControls = ({ targetPosition }) => {
    const { camera, gl } = useThree();
    const { setYaw } = useContext(CameraContext);
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);
    const rotateLeft = useRef(false);
    const rotateRight = useRef(false);
    const moveSpeed = 8;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const yaw = useRef(camera.rotation.y);
    const pitch = useRef(0);
    const rotateSpeed = 0.03;
    const camHeight = 5;
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isTouchDevice = useRef(false);

    const [isMovingTowardsPicture, setIsMovingTowardsPicture] = useState(false); // Track whether moving towards a picture

    useEffect(() => {
        camera.position.set(5, camHeight, -10);
        yaw.current = camera.rotation.y;
    }, [camera, camHeight]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.code) {
                case 'KeyW':
                    moveForward.current = true;
                    break;
                case 'KeyS':
                    moveBackward.current = true;
                    break;
                case 'KeyA':
                    moveLeft.current = true;
                    break;
                case 'KeyD':
                    moveRight.current = true;
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.code) {
                case 'KeyW':
                    moveForward.current = false;
                    break;
                case 'KeyS':
                    moveBackward.current = false;
                    break;
                case 'KeyA':
                    moveLeft.current = false;
                    break;
                case 'KeyD':
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
            moveForward.current = false;
            moveBackward.current = false;
        };

        const handleMouseMove = (event) => {
            if (isMouseDown) {
                const deltaY = event.clientY - initialMousePosition.current.y;

                if (deltaY < -20) {
                    moveForward.current = true;
                    moveBackward.current = false;
                } else if (deltaY > 20) {
                    moveForward.current = false;
                    moveBackward.current = true;
                } else {
                    moveForward.current = false;
                    moveBackward.current = false;
                }

                yaw.current -= event.movementX * 0.005;
                pitch.current -= event.movementY * 0.002;
                pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));
                camera.rotation.set(0, yaw.current, 0);
                setYaw(camera.rotation.y);
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
            moveForward.current = false;
            moveBackward.current = false;
        };

        const handleTouchMove = (event) => {
            if (isMouseDown && event.touches.length === 1) {
                const deltaX = event.touches[0].clientX - initialMousePosition.current.x;
                const deltaY = event.touches[0].clientY - initialMousePosition.current.y;

                if (deltaY < -20) {
                    moveForward.current = true;
                    moveBackward.current = false;
                } else if (deltaY > 20) {
                    moveForward.current = false;
                    moveBackward.current = true;
                } else {
                    moveForward.current = false;
                    moveBackward.current = false;
                }

                yaw.current -= deltaX * 0.005;
                pitch.current -= deltaY * 0.002;
                pitch.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch.current));

                camera.rotation.set(0, yaw.current, 0);
                setYaw(camera.rotation.y);

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
        yaw.current = camera.rotation.y;

        if (moveForward.current) {
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            camera.position.addScaledVector(direction, moveSpeed * delta);
        }

        if (moveBackward.current) {
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            camera.position.addScaledVector(direction, -moveSpeed * delta);
        }

        if (moveLeft.current) {
            right.setFromMatrixColumn(camera.matrix, 0);
            camera.position.addScaledVector(right, -moveSpeed * delta);
        }

        if (moveRight.current) {
            right.setFromMatrixColumn(camera.matrix, 0);
            camera.position.addScaledVector(right, moveSpeed * delta);
        }

        if (rotateLeft.current) {
            yaw.current += rotateSpeed;
            camera.rotation.set(0, yaw.current, 0);
        }

        if (rotateRight.current) {
            yaw.current -= rotateSpeed;
            camera.rotation.set(0, yaw.current, 0);
        }

        // Log vị trí của camera
        console.log(`Camera position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`, `rot: ${yaw.current}`);
    });

    return null;
};

export default CameraControls;
