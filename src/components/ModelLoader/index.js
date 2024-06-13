import React, { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, Euler } from 'three';
import CameraClick from '../../action/CameraClick';

const ModelLoader = ({ path, position, rotation=[0,0,0], scale, clickable = true, setYaw}) => {
    const model = useLoader(GLTFLoader, path);
    const [clicked, setClicked] = useState(false);
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);

    const handlePictureClick = (position, rotation) => {
        // Tạo vector định hướng cho camera (hướng về phía trước bức tranh)
        const direction = new Vector3(0, 0, 5); // Cách bức tranh 5 đơn vị theo hướng z âm
        const eulerRotation = new Euler(
          rotation[0] * (Math.PI / 180),
          rotation[1] * (Math.PI / 180),
          rotation[2] * (Math.PI / 180)
        );

        // Tính toán vị trí mới của camera
        direction.applyEuler(eulerRotation); // Áp dụng góc quay để tính toán hướng di chuyển
        const newCameraPosition = [
            position[0] + direction.x,
            position[1] + direction.y,
            position[2] + direction.z
        ];

        // Tính toán góc nhìn mới của camera để nhìn chính diện vào bức tranh
        const newCameraRotation = [
            rotation[0], // Xoay quanh trục X
            rotation[1], // Xoay quanh trục Y theo góc của bức tranh
            rotation[2]  // Xoay quanh trục Z
        ];

        setTargetPosition(newCameraPosition);
        setTargetRotation(newCameraRotation);
        setClicked(true);
    };

    const handleClick = () => {
        if (clickable) {
            handlePictureClick(position, rotation);
        }
    };

    return (
        <group 
            position={position} 
            rotation={rotation} 
            scale={scale} 
            receiveShadow
            onClick={handleClick}
        >
            <primitive object={model.scene} />
            <CameraClick
                targetPosition={targetPosition}
                targetRotation={targetRotation}
                clicked={clicked}
                setClicked={setClicked}
            />
        </group>
    );
};

export default ModelLoader;
