import React, { useRef, useEffect, useContext } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import CameraContext from '../../helpers/CameraContext';

const CameraClick = ({ targetPosition, targetRotation, clicked, setClicked }) => {
    const { camera } = useThree();
    const { setYaw } = useContext(CameraContext);
    const startPos = useRef(new Vector3());
    const endPos = new Vector3(...targetPosition);
    const startRot = useRef(new Euler());
    const endRot = new Euler(
        targetRotation[0] * (Math.PI / 180),
        targetRotation[1] * (Math.PI / 180),
        targetRotation[2] * (Math.PI / 180)
    );
    const progress = useRef(0);

    useEffect(() => {
        if (clicked) {
            startPos.current.copy(camera.position);
            startRot.current.copy(camera.rotation);
            progress.current = 0;
        }
    }, [clicked, camera.position, camera.rotation]);

    const lerpAngle = (start, end, t) => {
        const delta = end - start;
        const shortestAngle = ((delta + Math.PI) % (2 * Math.PI)) - Math.PI;
        return start + shortestAngle * t;
    };

    useFrame(() => {
        if (clicked && progress.current < 1) {
            progress.current += 0.02; // Điều chỉnh giá trị này để chuyển động mượt hơn
            camera.position.lerpVectors(startPos.current, endPos, progress.current);
            camera.rotation.set(
                lerpAngle(startRot.current.x, endRot.x, progress.current),
                lerpAngle(startRot.current.y, endRot.y, progress.current),
                lerpAngle(startRot.current.z, endRot.z, progress.current)
            );
            if (progress.current >= 1) {
                startPos.current.copy(endPos);
                startRot.current.copy(endRot);
                setYaw(camera.rotation.y);
                setClicked(false); // Reset trạng thái clicked
            }
        }
    });

    return null;
};

export default CameraClick;
