import React, { useState, lazy, Suspense, startTransition } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraProvider } from '../../helpers/CameraContext';
import './index.css';

//hehe

// Extend THREE with custom geometries
extend({ PlaneGeometry: THREE.PlaneGeometry, BoxGeometry: THREE.BoxGeometry });

// Lazy load components
const Movement = lazy(() => import('../../action/Movement/index'));
const ModelLoader = lazy(() => import('../../components/ModelLoader/index'));
const MinhTestPicture = lazy(() => import('../../components/MinhTestPicture'));
const MinhTestPicture2 = lazy(() => import('../../components/MinhTestPicture2'));
const CameraClick = lazy(() => import('../../action/CameraClick'));
const ResizeElement = lazy(() => import('../../action/ResizeElement'));
const ModelPopup = lazy(() => import('../../components/ModelPopup'));
const InstructionsModal = lazy(() => import('../../components/InstructionsModal'));

const Gallery = () => {
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
    const [clicked, setClicked] = useState(false);
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
    const [scaleFactor, setScaleFactor] = useState(5);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);

    const [instructionsOpen, setInstructionsOpen] = useState(true);

    const handlePictureClick = (position, rotation, model) => {
        const direction = new THREE.Vector3(0, 0, 12);
        const eulerRotation = new THREE.Euler(
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
        startTransition(() => {
            setTargetPosition(newCameraPosition);
            setTargetRotation(newCameraRotation);
            setClicked(true);
            setSelectedModel(model);
            setSnackbarOpen(true);
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenPopup = () => {
        startTransition(() => {
            setSnackbarOpen(false);
            setPopupOpen(true);
        });
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

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
                        <Suspense >
                            <ModelLoader 
                                path={"/assets/vr_modern_gallery_room.glb"} 
                                rotation={[0, Math.PI / 2, 0]}
                                position={[0, 0, 0]} 
                                scale={[5, 5, 5]}
                                clickable={false}
                            /> 
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
                            <MinhTestPicture
                                position={[0, 8, -1]}
                                rotation={[0, 180, 0]}
                                scale={[scaleFactor, scaleFactor, scaleFactor]}
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
                            <Movement setYaw={setYaw} targetPosition={targetPosition} />
                            <CameraClick
                                targetPosition={targetPosition}
                                targetRotation={targetRotation}
                                clicked={clicked}
                                setClicked={setClicked}
                            />
                        </Suspense>
                    </Canvas>
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
                    <ResizeElement setScaleFactor={setScaleFactor} />
                    <ModelPopup open={popupOpen} onClose={handleClosePopup} model={selectedModel} />
                    <InstructionsModal open={instructionsOpen} handleClose={handleCloseInstructions} />
                    <button className="instructions_button" onClick={handleOpenInstructions}>Show Instructions</button>
                </div>
            </CameraProvider>
        </>
    );
}
export default Gallery;
