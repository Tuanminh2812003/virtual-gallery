import React, { useRef, useEffect, useContext, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import CameraContext from '../../helpers/CameraContext';

// Các khu vực bị giới hạn

const restrictedAreaCenter = new THREE.Vector3(0, 0, 0); // Tọa độ trung tâm của vòng tròn
const restrictedAreaRadius = 25; // Bán kính của khu vực giới hạn

const restrictedAreas = [
    //tranh
    // { x: -3.93243, z: -3.30957, radius: 2.5 },
    // { x: -3.93243, z: 3.30957, radius: 2.5 },

    // //tuong
    // { x: 3.7, z: 6.29943, radius: 1.8 }, 
    // { x: 5.1, z: 4.89943, radius: 1.8 }, 
    // { x: 6.5, z: 3.49943, radius: 1.8 }, 

    // //manocanh
    // { x: 1.01536, z: 1.46519, radius: 1.8 }, 
    // { x: 0.798619, z: -1.48564, radius: 1.8 }, 
    // { x: 2.43313, z: -0.772722, radius: 1.8 }, 
    // { x: 2.43313, z: 0.79, radius: 1.8 },
    // { x: 6.28399, z: -4.13144, radius: 1.8 }, 
    // { x: 5.34067, z: -5.24213, radius: 1.8 }, 
    // { x: 4.12038, z: -6.22918, radius: 1.8 },

    // { x: 2.19652, z: -7.39112, radius: 1.8 },

    // { x: -0.308477, z: 9.60553, radius: 2.2 },
  
    // Thêm các khu vực cấm khác tại đây
];

const Movement2 = ({ cameraPosition, cameraRotation, clicked, freeExploration }) => {
    const { camera, gl } = useThree();
    const { setYaw } = useContext(CameraContext);
    const moveForward = useRef(false);
    const moveBackward = useRef(false);
    const moveLeft = useRef(false);
    const moveRight = useRef(false);
    const rotateLeft = useRef(false);
    const rotateRight = useRef(false);
    const moveSpeed = 5;
    const smoothTime = 0.1;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const yaw = useRef(cameraRotation.y);
    const targetYaw = useRef(cameraRotation.y);
    const rotateSpeed = 0.03;
    const camHeight = 1.6;
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isTouchDevice = useRef(false);
    const aspect = useRef(window.innerWidth / window.innerHeight);
    const velocity = useRef(new THREE.Vector3());
    const previousPosition = useRef(new THREE.Vector3()); // Lưu vị trí trước đó của camera

    useEffect(() => {
        camera.position.copy(cameraPosition);
        camera.rotation.copy(cameraRotation);
        yaw.current = camera.rotation.y;
        targetYaw.current = camera.rotation.y;
        previousPosition.current.copy(camera.position); // Khởi tạo vị trí trước đó
    }, [camera, cameraPosition, cameraRotation]);

    const isInsideRestrictedCircle = (position) => {
        const distanceToCenter = position.distanceTo(restrictedAreaCenter);
        return distanceToCenter <= restrictedAreaRadius;
    };

    const isInRestrictedArea = (position) => {
        for (let area of restrictedAreas) {
            const areaPosition = new THREE.Vector3(area.x, 0, area.z);
            const distance = position.distanceTo(areaPosition);
            if (distance < area.radius) return true;
        }
        return false;
    };

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
            if (!freeExploration) return;
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
            if (!freeExploration) return;
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
            if (!freeExploration) return;
            setIsMouseDown(true);
            initialMousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = () => {
            setIsMouseDown(false);
        };

        const handleMouseMove = (event) => {
            if (!freeExploration || !isMouseDown) return;
            targetYaw.current -= event.movementX * 0.003;

            const direction = new THREE.Vector3();
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            camera.position.addScaledVector(direction, -event.movementY * 0.01);

            initialMousePosition.current = { x: event.clientX, y: event.clientY };
        };

        const handleTouchStart = (event) => {
            isTouchDevice.current = true;
            if (event.touches.length === 1) {
                if (!freeExploration) return;
                setIsMouseDown(true);
                initialMousePosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            }
        };

        const handleTouchEnd = () => {
            setIsMouseDown(false);
        };

        const handleTouchMove = (event) => {
            if (!freeExploration || !isMouseDown || event.touches.length !== 1) return;
            const deltaX = event.touches[0].clientX - initialMousePosition.current.x;
            const deltaY = event.touches[0].clientY - initialMousePosition.current.y;

            targetYaw.current -= deltaX * 0.005;

            const direction = new THREE.Vector3();
            direction.setFromMatrixColumn(camera.matrix, 0);
            direction.crossVectors(camera.up, direction);
            camera.position.addScaledVector(direction, -deltaY * 0.05);

            initialMousePosition.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        };

        const handleControl = (event) => {
            if (!freeExploration) return;
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
    }, [camera, gl.domElement, cameraPosition, cameraRotation, isMouseDown, freeExploration]);

    useFrame((state, delta) => {
        if (clicked) return;

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

        velocity.current.lerp(moveVector, smoothTime);
        camera.position.add(velocity.current);

        if (rotateLeft.current) {
            targetYaw.current += rotateSpeed;
        }

        if (rotateRight.current) {
            targetYaw.current -= rotateSpeed;
        }

        if (rotateLeft.current) {
            targetYaw.current += rotateSpeed;
        }

        // Kiểm tra khu vực giới hạn di chuyển và khu vực cấm
        if (isInRestrictedArea(camera.position) || !isInsideRestrictedCircle(camera.position)) {
            camera.position.copy(previousPosition.current);
            velocity.current.set(0, 0, 0); // Dừng di chuyển
        } else {
            previousPosition.current.copy(camera.position); // Cập nhật vị trí trước đó
        }
        if (rotateRight.current) {
            targetYaw.current -= rotateSpeed;
        }

        yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.1);
        camera.rotation.set(0, yaw.current, 0);
        setYaw(camera.rotation.y);

        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -61, 61);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -25, 25);

        // In tọa độ người dùng
        // console.log('Current Position:', camera.position);
    });

    return null;
};

export default Movement2;