// src/components/MinhWorkSpace/MinhWorkSpace.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import MinhTestPicture from '../../components/MinhTestPicture';
import MinhTestPicture2 from '../../components/MinhTestPicture2';
import CameraControler from './CameraControler'; //di chuyển test
import ResizeElement from '../../action/ResizeElement'; //respondsive, chuyền vào scaleFactor mặc định
import ModelPopup from '../../components/ModelPopup'; //Pop up thông tin model
import DetailSnackbar from '../../components/DetailSnackbar'; //Thông báo chi tiết
import { Vector3, Euler } from 'three'; //click vào tranh
import CameraClick from '../../action/CameraClick'; //component click vào tranh

function MinhWorkSpace() {
    const [clicked, setClicked] = useState(false); //click vào tranh
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]); //click vào tranh
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]); //click vào tranh
    const [scaleFactor, setScaleFactor] = useState(2); //respondsive

    const [snackbarOpen, setSnackbarOpen] = useState(false); //Thông báo chi tiết
    const [popupOpen, setPopupOpen] = useState(false); //Thông báo chi tiết
    const [selectedModel, setSelectedModel] = useState(null); //Pop up thông tin model

    const handlePictureClick = (position, rotation, model) => {
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
        setSelectedModel(model);
        setSnackbarOpen(true); // Hiển thị thông báo nhỏ
    };

    //Thông báo chi tiết
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    //Thông báo chi tiết

    //Pop up thông tin model
    const handleOpenPopup = () => {
        setSnackbarOpen(false);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };
    //Pop up thông tin model

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas shadows>
            <ambientLight intensity={1} />
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="yellow" roughness={0.1} metalness={0} />
            </mesh>

            <MinhTestPicture
            position={[0, 1, 0]}
            rotation={[0, 0, 0]}
            scale={[scaleFactor, scaleFactor, scaleFactor]} //respondsive
            onClick={handlePictureClick}
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

            <MinhTestPicture2
            position={[-10, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[scaleFactor, scaleFactor, scaleFactor]}
            onClick={handlePictureClick}
            />

            <CameraClick
            targetPosition={targetPosition}
            targetRotation={targetRotation}
            clicked={clicked}
            setClicked={setClicked}
            />

            <CameraControler />
        </Canvas>

        {/* Respondsive */}
        <ResizeElement setScaleFactor={setScaleFactor} />
        {/* Respondsive */}
        
        {/* Thông báo chi tiết */}
        <DetailSnackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            onClick={handleOpenPopup}
        />
        {/* Thông báo chi tiết */}

        {/* Pop up thông tin model */}
        <ModelPopup open={popupOpen} onClose={handleClosePopup} model={selectedModel} />
        {/* Pop up thông tin model */}
        </div>
    );
}

export default MinhWorkSpace;
