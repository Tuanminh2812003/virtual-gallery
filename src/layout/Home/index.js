import React, { useState, useEffect } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { PlaneGeometry, BoxGeometry } from 'three';
import Movement from '../../action/Movement/index';
import ModelLoader from '../../components/ModelLoader/index';
import { CameraProvider } from '../../helpers/CameraContext';
import './Home.css';
import MinhTestPicture from '../../components/MinhTestPicture'; //tranh test
import MinhTestPicture2 from '../../components/MinhTestPicture2'; //tranh test
import CameraClick from '../../action/CameraClick'; //component click vào tranh
import ResizeElement from '../../action/ResizeElement'; //respondsive, chuyền vào scaleFactor mặc định
import ModelPopup from '../../components/ModelPopup'; //Pop up thông tin model
import DetailSnackbar from '../../components/DetailSnackbar'; //Thông báo chi tiết
import { Vector3, Euler } from 'three'; //click vào tranh
import InstructionsModal from '../../components/InstructionsModal'; // Instructions Modal

extend({ PlaneGeometry, BoxGeometry });

function Home() {
    //CONTROL-HIEU
    const handleControl = (action, state) => {
        document.dispatchEvent(new CustomEvent('control', { detail: { action, state } }));
    };

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const [yaw, setYaw] = useState(0);
    //CONTROL-HIEU

    //CONTROL-MINH
    const [clicked, setClicked] = useState(false); //click vào tranh
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]); //click vào tranh
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]); //click vào tranh
    const [scaleFactor, setScaleFactor] = useState(5); //respondsive

    const [snackbarOpen, setSnackbarOpen] = useState(false); //Thông báo chi tiết
    const [popupOpen, setPopupOpen] = useState(false); //Thông báo chi tiết
    const [selectedModel, setSelectedModel] = useState(null); //Pop up thông tin model

    const [instructionsOpen, setInstructionsOpen] = useState(true); // Instructions modal state

    const handlePictureClick = (position, rotation, model) => {
        // Tạo vector định hướng cho camera (hướng về phía trước bức tranh)
        const direction = new Vector3(0, 0, 12); // Cách bức tranh 5 đơn vị theo hướng z âm
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

    const handleCloseInstructions = () => {
        setInstructionsOpen(false);
    };

    const handleOpenInstructions = () => {
        setInstructionsOpen(true);
    };

    return (
        <>
            <CameraProvider>
                <div className='main'>
                    <Canvas shadows>
                        {/* SPACE */}
                        <ModelLoader 
                            path={"/assets/abandoned_vr_gallery.glb"} 
                            rotation={[0, Math.PI/2, 0]}
                            position={[25, 0, 0]} 
                            scale={[5, 5, 5]}
                            clickable={false}
                        /> 
                        {/* SPACE */}

                        {/* LIGHT */}
                        <ambientLight intensity={1} />
                        <pointLight 
                            position={[5, 5, -30]} 
                            intensity={10} 
                            distance={15}
                            decay={1}
                            castShadow
                        />
                        <pointLight 
                            position={[5, 5, -16]} 
                            intensity={10} 
                            distance={15}
                            decay={1}
                            castShadow
                        />
                        <pointLight 
                            position={[18, 5, -40]} 
                            intensity={10} 
                            distance={15}
                            decay={1}
                            castShadow
                        />
                        {/* LIGHT */}

                        {/* MODEL */}
                        <MinhTestPicture
                            position={[0, 8, -1]}
                            rotation={[0, 180, 0]}
                            scale={[scaleFactor, scaleFactor, scaleFactor]} //respondsive
                            onClick={handlePictureClick}
                        />
                        <MinhTestPicture
                            position={[24.5, 8, -30]}
                            rotation={[0, 270, 0]}
                            scale={[scaleFactor, scaleFactor, scaleFactor]}
                            onClick={handlePictureClick}
                        />

                        <MinhTestPicture
                            position={[-49, 8, -20]}
                            rotation={[0, 90, 0]}
                            scale={[scaleFactor, scaleFactor, scaleFactor]}
                            onClick={handlePictureClick}
                        />

                        <MinhTestPicture2
                            position={[0, 0, -30]}
                            rotation={[0, 0, 0]}
                            scale={[scaleFactor, scaleFactor, scaleFactor]}
                            onClick={handlePictureClick}
                        />
                        {/* MODEL */}

                        {/* CAMERA */}
                        <Movement setYaw={setYaw} targetPosition={targetPosition} />
                        <CameraClick
                            targetPosition={targetPosition}
                            targetRotation={targetRotation}
                            clicked={clicked}
                            setClicked={setClicked}
                        />
                        {/* CAMERA */}
                    </Canvas>

                    {/* CONTROL-HIEU */}
                    <button className="fullscreen_button" onClick={handleFullscreenToggle}>⛶</button>
                    <div className="controler">
                        <div className='top'>
                            <button
                                onMouseDown={() => handleControl('forward', true)}
                                onMouseUp={() => handleControl('forward', false)}
                                onTouchStart={() => handleControl('forward', true)}
                                onTouchEnd={() => handleControl('forward', false)}
                                className='controler__button'
                            >
                                ▲
                            </button>
                        </div>
                        <div className='bottom'>
                            <button
                                onMouseDown={() => handleControl('rotateLeft', true)}
                                onMouseUp={() => handleControl('rotateLeft', false)}
                                onTouchStart={() => handleControl('rotateLeft', true)}
                                onTouchEnd={() => handleControl('rotateLeft', false)}
                                className='controler__button'
                            >
                                ◄
                            </button>
                            <button
                                onMouseDown={() => handleControl('backward', true)}
                                onMouseUp={() => handleControl('backward', false)}
                                onTouchStart={() => handleControl('backward', true)}
                                onTouchEnd={() => handleControl('backward', false)}
                                className='controler__button'
                            >
                                ▼
                            </button>
                            <button
                                onMouseDown={() => handleControl('rotateRight', true)}
                                onMouseUp={() => handleControl('rotateRight', false)}
                                onTouchStart={() => handleControl('rotateRight', true)}
                                onTouchEnd={() => handleControl('rotateRight', false)}
                                className='controler__button'
                            >
                                ►
                            </button>
                        </div>
                    </div>
                    {/* CONTROL-HIEU */}

                    {/* CONTROL-MINH */}
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
                    {/* CONTROL-MINH */}

                    {/* Instructions Modal */}
                    <InstructionsModal open={instructionsOpen} handleClose={handleCloseInstructions} />
                    <button className="instructions_button" onClick={handleOpenInstructions}>Show Instructions</button>
                </div>
            </CameraProvider>
        </>
    );
}

export default Home;
