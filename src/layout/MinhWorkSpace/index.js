// src/components/MinhWorkSpace/MinhWorkSpace.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MinhTestPicture from '../../components/MinhTestPicture';
import CameraControler from './CameraControler'; //di chuyển test
//QUAN TRỌNG
import ResizeElement from '../../action/ResizeElement'; //respondsive, chuyền vào scaleFactor mặc định
import { Vector3, Euler } from 'three'; //click vào tranh
import CameraClick from '../../action/CameraClick'; //component click vào tranh
//QUAN TRỌNG

function MinhWorkSpace() {
    const [clicked, setClicked] = useState(false); //click vào tranh
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]); //click vào tranh
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]); //click vào tranh
    const [scaleFactor, setScaleFactor] = useState(2); //respondsive

    //CLICK VÀO TRANH
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
    //CLICK VÀO TRANH

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Canvas shadows>
                {/* đèn */}
                <ambientLight intensity={1} />
                {/* đèn */}

                {/* môi trường */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="yellow" roughness={0.1} metalness={0} />
                </mesh>
                {/* môi trường */}

                {/* tranh */}
                <MinhTestPicture
                    position={[0, 1, 0]}
                    rotation={[0, 0, 0]}
                    scale={[scaleFactor, scaleFactor, scaleFactor]} //respondsive
                    onClick={handlePictureClick} //click vào tranh
                />
                <MinhTestPicture
                    position={[5, 1, 0]}
                    rotation={[0, 45, 0]}
                    scale={[scaleFactor, scaleFactor, scaleFactor]}
                    onClick={handlePictureClick}
                />
                <MinhTestPicture
                    position={[-5, 1, 0]}
                    rotation={[0, -45, 0]}
                    scale={[scaleFactor, scaleFactor, scaleFactor]}
                    onClick={handlePictureClick}
                />
                {/* tranh */}

                {/* click vào tranh, COPY Y NGUYÊN */}
                <CameraClick
                    targetPosition={targetPosition}
                    targetRotation={targetRotation}
                    clicked={clicked}
                    setClicked={setClicked}
                />
                {/* click vào tranh, COPY Y NGUYÊN */}

                {/* component di chuyển */}
                <CameraControler />
                {/* component di chuyển */}
            </Canvas>

            {/* respondsive, COPY Y NGUYÊN */}
            <ResizeElement setScaleFactor={setScaleFactor} />
            {/* respondsive, COPY Y NGUYÊN */}
        </div>
    );
}

export default MinhWorkSpace;
