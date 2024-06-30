import React, { useState, lazy, Suspense, useEffect, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three';
import './Home.css';

// camera và move
import { CameraProvider } from '../../helpers/CameraContext';
import Movement from '../../action/Movement/index';
import CameraClick from '../../action/CameraClick';
import { Vector3, Euler } from 'three';

// môi trường và model
import ModelLoader from '../../components/ModelLoader/index'; // model tĩnh
import PictureFrame from '../../components/PictureFrame'; // hình ảnh
import MinhTestPicture from '../../components/MinhTestPicture'; // model động
import ResizeHandler from '../../action/ResizeElement2'; // responsive model
import { SpotLight } from '@react-three/drei';
import Minimap from '../../components/Minimap';

// pop up
import ModelPopup from '../../components/ModelPopup';
import PopUpHowToMove from '../../components/PopUpHowToMove';
import PopUpAboutTheExhibition from '../../components/PopUpAboutTheExhibition';
import PopUpListModel from '../../components/PopUpListModel';

// icon
import { MdOutlineZoomOutMap } from "react-icons/md";
import { MdOutlineZoomInMap } from "react-icons/md";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { RiDragMoveFill } from "react-icons/ri";
import { SiAwesomelists } from "react-icons/si";
import { PiListStarFill } from "react-icons/pi";
import { BsNewspaper } from "react-icons/bs";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { FaPause } from "react-icons/fa";

// Extend THREE with custom geometries
extend({ PlaneGeometry: THREE.PlaneGeometry, BoxGeometry: THREE.BoxGeometry });

function Home(){
    // mảng items các bức tranh để làm tour
    const [items, setItems] = useState([
        {
            id: 1,
            position: [10, 12, 27],
            rotation: [0, 180, 0],
            scale: 15,
            imageUrl: "/assets/Picture/art_1.jpg",
            info: { artist: 'Van Gogh', title: 'Paintings Collage', year: 2024 }
        },
        {
            id: 2,
            position: [-62, 12, 0],
            rotation: [0, 90, 0],
            scale: 15,
            imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/04._23-2_nu4mya?_a=BAMABmRg0",
            info: { artist: 'Google Doodle', title: 'Giỗ Tổ Ca Trù', year: 2024 }
        },
        {
            id: 3,
            position: [62,12, 0],
            rotation: [0, -90, 0],
            scale: 10,
            imageUrl: "/assets/Picture/art_2.jpg",
            info: { artist: 'Kobit', title: 'Kobit', year: 2024 }
        },
        {
            id: 4,
            position: [-10, 12, -27],
            rotation: [0, 0, 0],
            scale: 10,
            imageUrl: "/assets/Picture/art_3.jpg",
            info: { artist: 'Kobit', title: 'Kobit', year: 2024 }
        },
    ]);
    // mảng items các bức tranh để làm tour

    // KHAI BÁO
    // move
    const [yaw, setYaw] = useState(0);
    // move

    // click và các chức năng liên quan
    const [clicked, setClicked] = useState(false);
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState(null); // <-- Added state for selected info
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [tourActive, setTourActive] = useState(false);
    const [tourIndex, setTourIndex] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [countdownInterval, setCountdownInterval] = useState(null);
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 5, 0));
    const [cameraRotation, setCameraRotation] = useState(new Euler(0, yaw, 0));
    const [showDetailsPrompt, setShowDetailsPrompt] = useState(false); // <-- Added state for details prompt
    const [promptTimeout, setPromptTimeout] = useState(null); // <-- Added state for prompt timeout
    const [tourPopupOpen, setTourPopupOpen] = useState(false); // <-- Added state for tour popup
    const [freeExploration, setFreeExploration] = useState(true); // <-- Added state for free exploration
    const [showHowToMove, setShowHowToMove] = useState(true); // <-- Added state for how to move popup
    // click và các chức năng liên quan

    // giao diện và respondsive
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [landscapePromptVisible, setLandscapePromptVisible] = useState(false);
    // giao diện và respondsive

    // pop up
    const [instructionsOpen, setInstructionsOpen] = useState(true);
    const [popUpAboutTheExhibition, setPopUpAboutTheExhibition] = useState(false);
    const [popUpListModel, setPopUpListModel] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    // pop up
    // KHAI BÁO

    // HÀM
    // move
    const handleControl = (action, state) => {
        document.dispatchEvent(new CustomEvent('control', { detail: { action, state } }));
    };
    // move

    // click và các chức năng liên quan
    const handlePictureClick = (position, rotation, imageUrl, model, info) => {
        const direction = new Vector3(0, 0, 22);
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
        setSelectedImageUrl(imageUrl);
        setSelectedModel(model);
        setSelectedInfo(info);
        setClicked(true);
        setShowDetailsPrompt(true); // Show the details prompt
        clearTimeout(promptTimeout); // Clear any existing timeout
        setPromptTimeout(setTimeout(() => setShowDetailsPrompt(false), 5000)); // Hide the prompt after 5 seconds
    };

    const handleDetailClick = (imageUrl, info) => {
        setSelectedImageUrl(imageUrl);
        setSelectedInfo(info); // Set the selected info
        setPopupOpen(true);
        setShowDetailsPrompt(false); // Hide the details prompt when popup opens
        setTourPopupOpen(false); // Hide the tour popup when model popup opens
    };

    const updateCameraState = (position, rotation) => {
        setCameraPosition(new Vector3(position.x, position.y, position.z));
        setCameraRotation(new Euler(rotation.x, rotation.y, rotation.z));
    };

    // hàm xử lý sự kiện hoàn tất di chuyển camera
    const handleCameraMoveComplete = () => {
        setClicked(false); // Reset clicked state after camera move complete
        if (tourActive) {
            setTourPopupOpen(true); // Show tour popup when camera move completes during tour
        }
    };

    const handleListItemClick = (item) => {
        handlePictureClick(item.position, item.rotation, item.imageUrl, null, item.info);
        handleClosePopUpListModel();
    };

    const handleNextItem = () => {
        if (currentItemIndex < items.length - 1) {
            const nextIndex = currentItemIndex + 1;
            setCurrentItemIndex(nextIndex);
            const nextItem = items[nextIndex];
            handlePictureClick(nextItem.position, nextItem.rotation, nextItem.imageUrl, null, nextItem.info);
        }
    };

    const handlePreviousItem = () => {
        if (currentItemIndex > 0) {
            const prevIndex = currentItemIndex - 1;
            setCurrentItemIndex(prevIndex);
            const prevItem = items[prevIndex];
            handlePictureClick(prevItem.position, prevItem.rotation, prevItem.imageUrl, null, prevItem.info);
        }
    };

    const startTour = () => {
        setTourActive(true);
        setTourIndex(0);
        setCountdown(10);
        setFreeExploration(false);
        moveToItem(0);
    };

    const startFreeExploration = () => {
        setTourActive(false);
        setFreeExploration(true);
    };

    const moveToItem = (index) => {
        if (index < items.length) {
            const item = items[index];
            handlePictureClick(item.position, item.rotation, item.imageUrl, null, item.info);
            setTourIndex(index);
            setCountdown(10);
            setTourPopupOpen(true); // Show tour popup
        } else {
            endTour();
        }
    };

    const endTour = () => {
        setTourActive(false);
        setTourIndex(0);
        setCountdown(0);
        setTourPopupOpen(false); // Hide tour popup
        setShowHowToMove(true); // Show HowToMove popup
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    };

    useEffect(() => {
        if (tourActive && tourIndex < items.length) {
            const interval = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown > 1) {
                        return prevCountdown - 1;
                    } else {
                        moveToItem(tourIndex + 1);
                        return 10;
                    }
                });
            }, 1000);
            setCountdownInterval(interval);

            return () => {
                clearInterval(interval);
            };
        }
    }, [tourActive, tourIndex]);
    //click và các chức năng liên quan

    // giao diện và respondsive
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const handleFullscreenToggle = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const [navToggle, setNavToggle] = useState(false);
    const navHandler = () => {
        setNavToggle(prevData => !prevData);
    };
    // giao diện và respondsive

    const updateItemsForScreenSize = (newItems) => {
        setItems(newItems);
    };

    // pop up
    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const handleCloseInstructions = () => {
        setInstructionsOpen(false);
    };

    const handleOpenInstructions = () => {
        setShowHowToMove(true);
    };

    const handleClosePopUpAboutTheExhibition = () => {
        setPopUpAboutTheExhibition(false);
    };

    const handleOpenPopUpAboutTheExhibition = () => {
        setPopUpAboutTheExhibition(true);
    };

    const handleOpenPopUpListModel = () => {
        setPopUpListModel(true);
    };

    const handleClosePopUpListModel = () => {
        setPopUpListModel(false);
    };

    const handleCloseHowToMove = (mode) => {
        setShowHowToMove(false);
        if (mode === 'free') {
            startFreeExploration();
        } else if (mode === 'tour') {
            startTour();
        }
    };
    // pop up

    // kiểm tra hướng màn hình
    useEffect(() => {
        const handleOrientationChange = () => {
            if (window.orientation === 90 || window.orientation === -90) {
                setLandscapePromptVisible(false);
            } else if (/Mobi|Android/i.test(navigator.userAgent)) {
                setLandscapePromptVisible(true);
            }
        };
    
        window.addEventListener("orientationchange", handleOrientationChange);
    
        // kiểm tra hướng khi trang được tải
         handleOrientationChange();
    
        return () => {
            window.removeEventListener("orientationchange", handleOrientationChange);
        };
    }, []);
    
     const closeLandscapePrompt = () => {
        setLandscapePromptVisible(false);
    };

        
    // HÀM

    return(
        <>
            <CameraProvider>
                <div className='main'>
                    {/* Thông báo xoay màn hình */}
                    {landscapePromptVisible && (
                        <div id="landscape-prompt">
                            <div className='landscape-prompt-content'>
                                <div class="iframe-container">
                                    <iframe src="https://giphy.com/embed/XXU2vaPVrnhV7ZAGpY" className='gif-rotate-phone'></iframe>
                                    <div class="iframe-overlay"></div>
                                </div>
                                
                                <p>
                                    Rotate device for better experience
                                </p>
                            </div>
                            <button onClick={closeLandscapePrompt}>✕</button>
                        </div>
                    )}
                    {/* Thông báo xoay màn hình */}
                    <Canvas shadows>
                        <Suspense fallback={null}>

                            {/* Môi trường */}
                            <ModelLoader 
                                path={"/assets/vr_modern_gallery_room.glb"} 
                                rotation={[0, Math.PI / 2, 0]}
                                position={[0, 0, 0]} 
                                scale={[5, 5, 5]}
                                clickable={false}
                            /> 
                            <ambientLight intensity={2.2} />

                            {/* Chiếu sáng các model cụ thể */}
                            <SpotLight
                                position={[-10, 25, -5]}
                                intensity={80}
                                angle={Math.PI / 6}
                                penumbra={1}
                                distance={0}
                                decay={1}
                                castShadow
                                target={(() => {
                                    const target = new THREE.Object3D();
                                    target.position.set(-10, 12, -27);
                                    return target;
                                })()}
                            />
                            <SpotLight
                                position={[-40, 30, 13]}
                                intensity={80}
                                angle={Math.PI / 6}
                                penumbra={1}
                                distance={0}
                                decay={1}
                                castShadow
                                target={(() => {
                                    const target = new THREE.Object3D();
                                    target.position.set(-62, 12, 12);
                                    return target;
                                })()}
                            />
                            <SpotLight
                                position={[-40, 30, -13]}
                                intensity={80}
                                angle={Math.PI / 6}
                                penumbra={1}
                                distance={0}
                                decay={1}
                                castShadow
                                target={(() => {
                                    const target = new THREE.Object3D();
                                    target.position.set(-62, 12, -12);
                                    return target;
                                })()}
                            />
                            <SpotLight
                                position={[10, 28, 9]}
                                intensity={80}
                                angle={Math.PI / 5}
                                penumbra={1}
                                distance={0}
                                decay={1}
                                castShadow
                                target={(() => {
                                    const target = new THREE.Object3D();
                                    target.position.set(10, 12, 27);
                                    return target;
                                })()}
                            />                            
                            <SpotLight
                                position={[40, 30, 2]}
                                intensity={80}
                                angle={Math.PI / 6}
                                penumbra={1}
                                distance={0}
                                decay={1}
                                castShadow
                                target={(() => {
                                    const target = new THREE.Object3D();
                                    target.position.set(62,12, 0);
                                    return target;
                                })()}
                            />
                            {/* Môi trường */}

                            {/* item */}
                            {items.map(item => (
                                <PictureFrame
                                    key={item.id}
                                    position={item.position}
                                    rotation={item.rotation}
                                    scale={item.scale}
                                    imageUrl={item.imageUrl}
                                    info={item.info}
                                    onClick={(position, rotation) => handlePictureClick(position, rotation, item.imageUrl, null, item.info)}
                                    onDetailClick={handleDetailClick}
                                    showDetailsPrompt={showDetailsPrompt} // Pass showDetailsPrompt state
                                    setShowDetailsPrompt={setShowDetailsPrompt} // Pass setShowDetailsPrompt function
                                    tourPopupOpen={tourPopupOpen && tourIndex === items.indexOf(item)} // Show tour popup when in tour and at the current item
                                />
                            ))}
                            {/* <Minimap items={items} handlePictureClick={handlePictureClick} /> */}
                            
                            {/* <MinhTestPicture
                                position={[20, 0, 0]}
                                rotation={[0, 0, 0]}
                                scale={[scaleFactor, scaleFactor, scaleFactor]}
                                onClick={(position, rotation, imageUrl, model) => handlePictureClick(position, rotation, null, model)}
                            /> */}
                            {/* item */}

                            {/* Hàm bổ trợ */}
                            <CameraClick
                                targetPosition={targetPosition}
                                targetRotation={targetRotation}
                                clicked={clicked}
                                setClicked={setClicked}
                                onMoveComplete={handleCameraMoveComplete}
                                updateCameraState={updateCameraState}
                            />
                            {!clicked && <Movement cameraPosition={cameraPosition} cameraRotation={cameraRotation} clicked={clicked} freeExploration={freeExploration} />}
                            {/* Hàm bổ trợ */}
                        </Suspense>
                    </Canvas>

                    {/* Thanh sidebar */}
                    <div className='sidebarMain'>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handlePreviousItem}>
                            <MdSkipPrevious />
                        </div>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleNextItem}>
                            <MdSkipNext />
                        </div>
                        {!isFullscreen ? (
                            <button className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleFullscreenToggle}><MdOutlineZoomOutMap /></button>
                        ) : (
                            <button className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleFullscreenToggle}><MdOutlineZoomInMap /></button>
                        )}
                        <div type = "button" className={`sidebar ${navToggle ? 'sidebar-change' : ""}`} onClick={navHandler}>
                            <div className='sidebar-top'></div>
                            <div className='sidebar-middle'></div>
                            <div className='sidebar-bottom'></div>
                        </div>
                    </div>
                    {navToggle ? (
                        <div className='sidebarDisc'>
                            <div className='sidebarDisc__button' onClick={handleFullscreenToggle}>
                                <div className='sidebarDisc__button__text'>Enter fullscreen</div>
                                {!isFullscreen ? (
                                    <button className={`fullscreen_button`}><MdOutlineZoomOutMap /></button>
                                ) : (
                                    <button className={`fullscreen_button`}><MdOutlineZoomInMap /></button>
                                )}
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenInstructions}>
                                <div className='sidebarDisc__button__text'>How to move</div>
                                <div className='sidebarDisc__button__btn'><RiDragMoveFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={startTour}>
                                <div className='sidebarDisc__button__text'>Start tour</div>
                                <div className='sidebarDisc__button__btn'><SiAwesomelists /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpListModel}>
                                <div className='sidebarDisc__button__text'>List model</div>
                                <div className='sidebarDisc__button__btn'><PiListStarFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpAboutTheExhibition}>
                                <div className='sidebarDisc__button__text'>About the Exhibition</div>
                                <div className='sidebarDisc__button__btn'><BsNewspaper /></div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    {/* Thanh sidebar */}

                    {/* Nút bấm di chuyển */}
                    {freeExploration && (
                        <div className="controler">
                            <div className='top'>
                                <button
                                    onMouseDown={() => handleControl('forward', true)}
                                    onMouseUp={() => handleControl('forward', false)}
                                    onTouchStart={() => handleControl('forward', true)}
                                    onTouchEnd={() => handleControl('forward', false)}
                                    className='controler__button'
                                >
                                    <FaCaretUp />
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
                                    <FaCaretLeft />
                                </button>
                                <button
                                    onMouseDown={() => handleControl('backward', true)}
                                    onMouseUp={() => handleControl('backward', false)}
                                    onTouchStart={() => handleControl('backward', true)}
                                    onTouchEnd={() => handleControl('backward', false)}
                                    className='controler__button'
                                >
                                    <FaCaretDown />
                                </button>
                                <button
                                    onMouseDown={() => handleControl('rotateRight', true)}
                                    onMouseUp={() => handleControl('rotateRight', false)}
                                    onTouchStart={() => handleControl('rotateRight', true)}
                                    onTouchEnd={() => handleControl('rotateRight', false)}
                                    className='controler__button'
                                >
                                    <FaCaretRight />
                                </button>
                            </div>
                        </div>
                    )}
                    {/* Nút bấm di chuyển */}

                    {/* Pop up */}
                    <ModelPopup open={popupOpen} onClose={handleClosePopup} imageUrl={selectedImageUrl} info={selectedInfo} model={selectedModel} />
                    <PopUpHowToMove open={showHowToMove} handleClose={handleCloseHowToMove} />
                    <PopUpAboutTheExhibition open={popUpAboutTheExhibition} handleClose={handleClosePopUpAboutTheExhibition} />
                    <PopUpListModel open={popUpListModel} onClose={handleClosePopUpListModel} items={items} onItemClick={handleListItemClick} /> {/* List Popup */}
                    {/* Pop up */}

                    {/* Đếm thời gian tour */}
                    {tourActive && (
                        <div className="tour-countdown">
                            {tourIndex < items.length ? (
                                <div>
                                    <p>Next item in {countdown} seconds</p>
                                </div>
                            ) : (
                                <div>
                                    <p>Tour finished!</p>
                                </div>
                            )}
                            <div className='endtour' onClick={endTour}>
                                <FaPause />
                            </div>
                        </div>
                    )}
                    {/* Đếm thời gian tour */}
                </div>
            </CameraProvider>
            {/* Respondsive */}
            <ResizeHandler updateItemsForScreenSize={updateItemsForScreenSize} />
            {/* Respondsive */}
        </>
    )
}

export default Home;
