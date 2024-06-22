import React, { useRef, useEffect, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Euler, Quaternion } from 'three';
import CameraContext from '../../helpers/CameraContext';

const CameraClick = ({ targetPosition, targetRotation, clicked, setClicked, onMoveComplete, updateCameraState }) => {
    const { camera } = useThree();
    const { setYaw } = useContext(CameraContext);
    const startPos = useRef(new Vector3());
    const startQuat = useRef(new Quaternion());
    const endPos = useRef(new Vector3(...targetPosition));
    const endQuat = useRef(new Quaternion().setFromEuler(new Euler(
        targetRotation[0] * (Math.PI / 180),
        targetRotation[1] * (Math.PI / 180),
        targetRotation[2] * (Math.PI / 180)
    )));
    const progress = useRef(0);
    const initialY = useRef(camera.position.y);
    const movementSpeed = 0.01; // Adjust this value to control the movement speed

    useEffect(() => {
        if (clicked) {
            startPos.current.copy(camera.position);
            startQuat.current.copy(camera.quaternion);
            endPos.current.set(...targetPosition);
            endQuat.current.setFromEuler(new Euler(
                targetRotation[0] * (Math.PI / 180),
                targetRotation[1] * (Math.PI / 180),
                targetRotation[2] * (Math.PI / 180)
            ));
            progress.current = 0;
            initialY.current = camera.position.y;
            console.log('Camera start position:', startPos.current);
            console.log('Camera start rotation:', startQuat.current);
            console.log('Camera target position:', endPos.current);
            console.log('Camera target rotation:', endQuat.current);
        }
    }, [clicked, camera.position, camera.quaternion, targetPosition, targetRotation]);

    useFrame(() => {
        if (clicked && progress.current < 1) {
            progress.current += movementSpeed; // Adjust this value for smoother motion

            // Update only the x and z coordinates, keep y coordinate fixed
            const newPosition = new Vector3().lerpVectors(startPos.current, endPos.current, progress.current);
            camera.position.set(newPosition.x, initialY.current, newPosition.z);

            camera.quaternion.slerp(endQuat.current, progress.current);

            if (progress.current >= 1) {
                // Ensure the camera maintains the final position and orientation
                camera.position.set(endPos.current.x, initialY.current, endPos.current.z);
                camera.quaternion.copy(endQuat.current);

                // Fix potential 180-degree issue
                if (Math.abs(camera.rotation.y - targetRotation[1] * (Math.PI / 180)) > Math.PI / 2) {
                    camera.rotation.y += Math.PI;
                }

                // console.log('Camera final position:', camera.position);
                // console.log('Camera final rotation:', camera.rotation);
                setYaw(camera.rotation.y);
                setClicked(false);
                updateCameraState(camera.position, camera.rotation);
                if (onMoveComplete) onMoveComplete();
            }
        }
    });

    return null;
};

export default CameraClick;
