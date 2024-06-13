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

    useFrame(() => {
        if (clicked && progress.current < 1) {
        progress.current += 0.02; // Điều chỉnh giá trị này để chuyển động mượt hơn
        camera.position.lerpVectors(startPos.current, endPos, progress.current);
        camera.rotation.set(
            startRot.current.x + (endRot.x - startRot.current.x) * progress.current,
            startRot.current.y + (endRot.y - startRot.current.y) * progress.current,
            startRot.current.z + (endRot.z - startRot.current.z) * progress.current
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