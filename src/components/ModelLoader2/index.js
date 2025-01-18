import React, { useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, Euler } from 'three';
import CameraClick from '../../action/CameraClick';

const ModelLoader2 = ({ path, position, rotation = [0, 0, 0], scale, clickable = false, onClick }) => {
    const model = useLoader(GLTFLoader, path);
    const [clicked, setClicked] = useState(false);
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

    useEffect(() => {
        model.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;  // Đổ bóng
                child.receiveShadow = true;  // Nhận bóng
            }
        });
    }, [model]);

    const handlePictureClick = (position, rotation) => {
        const direction = new Vector3(0, 0, 5); 
        const eulerRotation = new Euler(
            rotation[0] * (Math.PI / 180),
            rotation[1] * (Math.PI / 180),
            rotation[2] * (Math.PI / 180)
        );

        direction.applyEuler(eulerRotation); 
        const newCameraPosition = [
            position[0] + direction.x,
            position[1] + direction.y,
            position[2] + direction.z
        ];

        const newCameraRotation = [
            rotation[0], 
            rotation[1], 
            rotation[2]
        ];

        setTargetPosition(newCameraPosition);
        setTargetRotation(newCameraRotation);
        setClicked(true);
    };

    const handleClick = () => {
        if (clickable && onClick) {
            onClick(); // Gọi hàm xử lý khi click
        }
    };

    return (
        <group 
            position={position} 
            rotation={rotation} 
            scale={scale} 
            onClick={handleClick}
        >
            <primitive object={model.scene} />
            {/* <CameraClick
                targetPosition={targetPosition}
                targetRotation={targetRotation}
                clicked={clicked}
                setClicked={setClicked}
            /> */}
        </group>
    );
};

export default ModelLoader2;