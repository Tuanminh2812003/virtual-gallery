import React, { useState, lazy, Suspense, useEffect, useRef, useCallback } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Physics } from '@react-three/cannon';
import { EffectComposer, Bloom, SSAO, DepthOfField } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';

// camera và move
import { CameraProvider } from '../../helpers/CameraContext';
import Movement from '../../action/Movement/index';
import Movement2 from '../../action/Movement2/index';

import CameraClick from '../../action/CameraClick';
import { Vector3, Euler } from 'three';

// môi trường và model
import ModelLoader from '../../components/ModelLoader/index'; // model tĩnh
import ModelLoader2 from '../../components/ModelLoader2/index'; // model tĩnh
import ModelLoaderWithVideo from '../../components/ModelLoaderWithVideo';
import ModelInspector from '../../helpers/ModelInspector';
import ModelAnimated2 from '../../components/ModelAnimated2';
import ManequinLoader from '../../components/ManequinLoader';

import PictureFrame from '../../components/PictureFrame'; // hình ảnh
import ResizeHandler from '../../action/ResizeElement2'; // responsive model
import { SpotLight } from '@react-three/drei';
import Minimap from '../../components/Minimap';
import RectAreaLight from '../../components/RectAreaLight'

import Particles from "./../../components/Particles/index";

// pop up
import ModelPopup from '../../components/ModelPopup';
import PopUpHowToMove from '../../components/PopUpHowToMove';
import PopUpAboutTheExhibition from '../../components/PopUpAboutTheExhibition';
import PopUpListModel from '../../components/PopUpListModel';
import PopUpUpdate from "../../components/PopUpUpdate"

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

import PuzzleGame from "../GamePuzzle"

// Extend THREE with custom geometries
extend({ PlaneGeometry: THREE.PlaneGeometry, BoxGeometry: THREE.BoxGeometry });

function Custom(){

    const modelsConfig = [
        // {
        //     path: "/assets/space2/All.glb",
        //     position: [0, 0, 10],
        //     rotation: [0, 0, 0],
        //     scale: [1, 1, 1],
        //     clickable: false,
        // },
        {
            path: "/NTST/Virtual Gallery.glb",
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            clickable: false,
        },
        // {
        //     path: "/NTST/Statue 1.glb",
        //     position: [0, 0, 0],
        //     rotation: [0, 0, 0],
        //     scale: [1, 1, 1],
        //     clickable: true,
        //     onClick: () => setShowPuzzleGame(true), // Mở pop-up trò chơi khi click
        // },
        // {
        //     path: "/NTST/Statue 2.glb",
        //     position: [0, 0, 0],
        //     rotation: [0, 0, 0],
        //     scale: [1, 1, 1],
        //     clickable: false,
        // },
        // {
        //     path: "/NTST/Statue 3.glb",
        //     position: [0, 0, 0],
        //     rotation: [0, 0, 0],
        //     scale: [1, 1, 1],
        //     clickable: false,
        // },
        
        // Add more models as needed
    ];

    // mảng items các bức tranh để làm tour
    const [items, setItems] = useState([
        // Your items here...
    ]);
    // mảng items các bức tranh để làm tour

    const [uploadedModelPath, setUploadedModelPath] = useState("/NTST/Manequin.glb");
    const [modelPath, setModelPath] = useState("/NTST/Manequin.glb"); // Đường dẫn model mặc định
    const [modelPosition, setModelPosition] = useState([3.04, 2.15, 3.69]); // Position mặc định
    const [modelRotation, setModelRotation] = useState([0, 0, 0]); // Rotation mặc định
    const inputRef = useRef();

    // KHAI BÁO
    // move
    const [controlMode, setControlMode] = useState("user"); // "user" hoặc "overview"
    const [yaw, setYaw] = useState(0);
    // move

    const [showPuzzleGame1, setShowPuzzleGame1] = useState(false);
    const [showPuzzleGame2, setShowPuzzleGame2] = useState(false);
    const [showPuzzleGame3, setShowPuzzleGame3] = useState(false);
    const [currentModelPath1, setCurrentModelPath1] = useState("/NTST/Question 1.glb");
    const [currentModelPath2, setCurrentModelPath2] = useState("/NTST/Question 2.glb");
    const [currentModelPath3, setCurrentModelPath3] = useState("/NTST/Question 3.glb");

    const handlePuzzle1Complete = () => {
        setShowPuzzleGame1(false);
        setCurrentModelPath1("/NTST/Statue 1.glb"); // Thay đổi model thành Statue 1.glb sau chiến thắng
    };
    const handlePuzzle2Complete = () => {
        setShowPuzzleGame2(false);
        setCurrentModelPath2("/NTST/Statue 2.glb"); // Thay đổi model thành Statue 1.glb sau chiến thắng
    };
    const handlePuzzle3Complete = () => {
        setShowPuzzleGame3(false);
        setCurrentModelPath3("/NTST/Statue 3.glb"); // Thay đổi model thành Statue 1.glb sau chiến thắng
    };

    //audio
    const [introAudio, setIntroAudio] = useState(null); 
    const [introActive, setIntroActive] = useState(false); // <-- Added state for intro phase
    const [introPausedTime, setIntroPausedTime] = useState(0); // Thời gian đã phát của intro audio
    const [currentAudio, setCurrentAudio] = useState(null); // Để lưu lại audio hiện tại khi pause
    //audio

    // click và các chức năng liên quan
    const [clicked, setClicked] = useState(false);
    const [targetPosition, setTargetPosition] = useState([0, 0, 0]);
    const [targetRotation, setTargetRotation] = useState([0, 0, 0]);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedInfo, setSelectedInfo] = useState(null); 
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [cameraPosition, setCameraPosition] = useState(new Vector3(0, 1.6, 12));
    const [cameraRotation, setCameraRotation] = useState(new Euler(0, 2 * Math.PI, 0));
    const [showDetailsPrompt, setShowDetailsPrompt] = useState(false); // <-- Added state for details prompt
    const [promptTimeout, setPromptTimeout] = useState(null); // <-- Added state for prompt timeout
    const [showHowToMove, setShowHowToMove] = useState(true); // <-- Added state for how to move popup
    const [popupOpen, setPopupOpen] = useState(false); // <-- Added state for model popup
    // click và các chức năng liên quan

    // giao diện và respondsive
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [landscapePromptVisible, setLandscapePromptVisible] = useState(false);
    const [navToggle, setNavToggle] = useState(false);
    // giao diện và respondsive

    // pop up
    const [instructionsOpen, setInstructionsOpen] = useState(true);
    const [popUpAboutTheExhibition, setPopUpAboutTheExhibition] = useState(false);
    const [popUpListModel, setPopUpListModel] = useState(false);
    const [popUpUpdate, setPopUpUpdate] = useState(false);
    // pop up

    //tour
    const [showCountdown, setShowCountdown] = useState(false);
    const countdownTimeout = useRef(null);
    const [tourActive, setTourActive] = useState(false);
    const [tourIndex, setTourIndex] = useState(0);
    const [countdown, setCountdown] = useState(10); // Đặt mặc định là 10 giây
    const [countdownInterval, setCountdownInterval] = useState(null);
    const [paused, setPaused] = useState(false); // Thêm trạng thái paused
    const [tourPopupOpen, setTourPopupOpen] = useState(false); // <-- Added state for tour popup
    const [freeExploration, setFreeExploration] = useState(true); // <-- Added state for free exploration
    //tour

    // HÀM
    // move
    const handleControl = (action, state) => {
        document.dispatchEvent(new CustomEvent('control', { detail: { action, state } }));
    };
    // move

    const handleModelClick = () => {
        if (inputRef.current) {
          inputRef.current.click(); // Kích hoạt input khi nhấn vào model
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const objectURL = URL.createObjectURL(file);
        setModelPath(objectURL); // Cập nhật đường dẫn model
        setModelPosition([3.2, 6, 6.2]);
        setModelRotation([0, 0, 0]);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            setUploadedModelPath(objectURL); // Cập nhật đường dẫn model mới
        }
    };

    // click và các chức năng liên quan
    const handlePictureClick = useCallback((position, rotation, imageUrl, model, info, video) => {
        console.log("handlePictureClick called with position:", position);
        console.log("handlePictureClick called with rotation:", rotation);
        console.log("handlePictureClick called with imageUrl:", imageUrl);
        console.log("handlePictureClick called with model:", model);
        console.log("handlePictureClick called with info:", info);
        console.log("handlePictureClick called with video", video);
        
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
        setSelectedVideo(video);
        setClicked(true);
        setShowDetailsPrompt(true); // Hiển thị chi tiết prompt
        clearTimeout(promptTimeout); // Xóa timeout hiện tại nếu có
        setPromptTimeout(setTimeout(() => setShowDetailsPrompt(false), 5000)); // Ẩn prompt sau 5 giây
    }, [tourIndex, tourActive]);    
    
    const handleDetailClick = (imageUrl, info, video) => {
        setSelectedImageUrl(imageUrl);
        setSelectedInfo(info); // Set the selected info
        setSelectedVideo(video); // Set the selected video link
        setPopupOpen(true);
        setShowDetailsPrompt(false); // Hide the details prompt when popup opens
        setTourPopupOpen(false); // Hide the tour popup when model popup opens
    
        if (countdownInterval) {
            clearInterval(countdownInterval); // Dừng bộ đếm thời gian
            setCountdownInterval(null);
            setPaused(true); // Đặt trạng thái paused thành true
        }
    
        if (currentAudio) {
            currentAudio.pause(); // Dừng audio hiện tại nếu có
        }

        const audio = new Audio(video);
        setCurrentAudio(audio);
        if(tourActive){
            audio.play();
            audio.onended = handleAudioEnded;
        }
    };    

    const updateCameraState = (position, rotation) => {
        setCameraPosition(new Vector3(position.x, position.y, position.z));
        setCameraRotation(new Euler(rotation.x, rotation.y, rotation.z));
    };

    // hàm xử lý sự kiện hoàn tất di chuyển camera
    const handleCameraMoveComplete = () => {
        setClicked(false); // Reset clicked state after camera move complete
        if (tourActive) {
            setPopupOpen(true); // Tự động mở popup khi di chuyển đến bức tranh
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

    //Tour
    const startTour = () => {
        setPaused(false);
        if (countdownInterval) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
        
        if (introAudio) {
            introAudio.pause(); // Dừng intro audio nếu nó đang phát
            setIntroAudio(null); // Xóa đối tượng intro audio
        }
    
        setTourActive(true);
        setIntroActive(true); // <-- Set introActive to true
        setFreeExploration(false);
        setCountdown(300); // Đặt thời gian đếm ngược cho toàn bộ tour, ví dụ: 300 giây (5 phút)
        playIntroAudioAndMove();
    };

    const startFreeExploration = () => {
        setTourActive(false);
        setFreeExploration(true);
    };

    const moveToItem = (index) => {
        if (index < items.length) {
            const item = items[index];
            handlePictureClick(item.position, item.rotation, item.imageUrl, null, item.info, item.video);
            setTourIndex(index);
            // setTourPopupOpen(true); 
        } else {
            endTour();
        }
    };

    const endTour = () => {
        setPaused(false);
        setTourActive(false);
        setTourIndex(0);
        setCountdown(0);
        setTourPopupOpen(false); // Ẩn popup tour
        setShowHowToMove(true); // Hiển thị popup HowToMove
    
        if (countdownInterval) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
        
        if (introAudio) {
            introAudio.pause(); // Dừng intro audio nếu nó đang phát
            setIntroAudio(null); // Xóa đối tượng intro audio
        }
    };

    // pauseTour function to pause the tour
    const pauseTour = () => {
        setPaused(true);
        setFreeExploration(true);
    
        if (countdownInterval) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
    
        if (introActive && introAudio) {
            introAudio.pause(); // Dừng intro audio
            setIntroPausedTime(introAudio.currentTime); // Lưu thời gian đã phát
        } else if (currentAudio) {
            currentAudio.pause(); // Dừng audio của tranh
        }
    };

    // continueTour function to continue the tour
    const continueTour = () => {
        setPaused(false);
        setFreeExploration(false);
    
        if (introActive && introAudio) {
            introAudio.currentTime = introPausedTime; // Tiếp tục từ thời gian đã tạm dừng
            introAudio.play();
        } else if (currentAudio) {
            currentAudio.play(); // Tiếp tục audio của tranh
        } else {
            moveToItem(tourIndex); // Di chuyển đến tranh hiện tại trong tour
        }
    
        let interval = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown > 1) {
                    return prevCountdown - 1;
                } else {
                    endTour();
                    return 0;
                }
            });
        }, 1000);
        setCountdownInterval(interval);
    };    
    useEffect(() => {
        const handleMouseMove = () => {
            setShowCountdown(true);
            if (countdownTimeout.current) {
                clearTimeout(countdownTimeout.current);
            }
            countdownTimeout.current = setTimeout(() => {
                setShowCountdown(false);
            }, 1000); // Thời gian ẩn countdown sau 1 giây không có hoạt động chuột
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (countdownTimeout.current) {
                clearTimeout(countdownTimeout.current);
            }
        };
    }, []);
    //Tour

    // giao diện và respondsive
    // Chặn cuộn trang trên thiết bị di động
    useEffect(() => {
        const disableScroll = (e) => {
            e.preventDefault();
        };

        window.addEventListener('touchmove', disableScroll, { passive: false });

        return () => {
            window.removeEventListener('touchmove', disableScroll);
        };
    }, []);
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

    const navHandler = () => {
        setNavToggle(prevData => !prevData);
    };

    const updateItemsForScreenSize = (newItems) => {
        setItems(newItems);
    };
    // giao diện và respondsive

    // pop up
    const handleClosePopup = () => {
        setPopupOpen(false);
        if (currentAudio) {
            currentAudio.pause(); // Dừng audio hiện tại
            setCurrentAudio(null); // Xóa đối tượng audio hiện tại
        }
        if (tourActive && !paused) {
            moveToItem(tourIndex + 1);
        }
    };    

    const handleCloseInstructions = () => {
        setInstructionsOpen(false);
    };

    const handleOpenInstructions = () => {
        setShowHowToMove(true);
    };
    const handleOpenPopUpUpdate = () => {
        setPopUpUpdate(true);
    };
    const handleClosePopUpUpdate = () => {
        setPopUpUpdate(false);
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
        } else if (mode === 'update') {
            setPopUpUpdate(true);
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

    // phát audio
    const playIntroAudioAndMove = () => {
        const audio = new Audio('/assets/Audio/intro.mp3');
        setIntroAudio(audio); // Lưu intro audio vào state
        audio.play();
        
        audio.onended = () => {
            setIntroActive(false); // <-- Set introActive to false
            startTourAfterIntro();
        };
    };

    const startTourAfterIntro = () => {
        setTourIndex(0);
        setFreeExploration(false);
        moveToItem(0);
    };

    const handleAudioEnded = () => {
        setCurrentAudio(null); // Xóa đối tượng audio hiện tại sau khi phát xong
        setPopupOpen(false);
        if (tourActive && !paused) {
            moveToItem(tourIndex + 1);
        }
    };    
    
    // phát audio

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
                    <Canvas 
                    shadows
                    gl={{
                        toneMapping: THREE.ACESFilmicToneMapping,
                        // colorSpace: THREE.LinearSRGBColorSpace, // Use this instead of `sRGBEncoding`
                        antialias: true // Sửa lại cú pháp ở đây
                    }}>
                        <Suspense fallback={null}>
                                {/* Môi trường */}

                                {/* Render các ModelLoader từ mảng config */}
                                {modelsConfig.map((modelProps, index) => (
                                    <ModelLoader2 key={index} {...modelProps} />
                                ))}

                                {/* <ModelInspector path="/assets/space2/untitled.glb" /> */}

                                <ModelLoaderWithVideo
                                    path="/NTST/TV Screen.glb"
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl="/NTST/VR Gallery.mp4"
                                    mesh ="TV_Screen001"
                                />
                                <ModelLoaderWithVideo
                                    path="/NTST/game screen.glb"
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    videoUrl="/NTST/video/finger click green screen videos Animation.mp4"
                                    mesh ="Game_Station_Screen_PROCESSED001"
                                />
                                <ModelAnimated2
                                    path="/NTST/Game Station.glb" // Đường dẫn đến file GLB/GLTF
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                />
                                <ModelAnimated2
                                    path={currentModelPath1} // Sử dụng trạng thái currentModelPath
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={() => setShowPuzzleGame1(true)}
                                />
                                <ModelAnimated2
                                    path={currentModelPath2} // Sử dụng trạng thái currentModelPath
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={() => setShowPuzzleGame2(true)}
                                />
                                <ModelAnimated2
                                    path={currentModelPath3} // Sử dụng trạng thái currentModelPath
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    onClick={() => setShowPuzzleGame3(true)}
                                />

                                {/* <ModelLoader2
                                    path={uploadedModelPath} // Đường dẫn được cập nhật từ trạng thái
                                    position={[0, 0, 0]}
                                    rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]}
                                    clickable={true}
                                    onClick={() => document.getElementById("file-input").click()} // Mở chọn file khi nhấn vào model
                                /> */}

                                <ManequinLoader
                                        modelPath={modelPath}
                                        position={modelPosition} // Truyền position từ state
                                        rotation={modelRotation} // Truyền rotation từ state
                                        onModelClick={handleModelClick}
                                        />

                                {/* <RectAreaLight position={[0,10,10]} color="red" intensity={10} lookAt={[0,5,0]}/>
                                <RectAreaLight position={[0,10,-10]} color="blue" intensity={10} lookAt={[0,5,0]}/>
                                <RectAreaLight position={[-10,10,5]} color="pink" intensity={10} lookAt={[0,5,0]}/> */}

                                {/* <SpotLight
                                    position={[0, 2, 0]}
                                    intensity={10}
                                    angle={360}
                                    penumbra={1}
                                    distance={0}
                                    decay={1}
                                    color="yellow"
                                    castShadow
                                />
                                <directionalLight 
                                    position={[0, 10, 10]} 
                                    color="red" 
                                    intensity={5} 
                                    castShadow
                                    penumbra={1}
                                />
                                <directionalLight 
                                    position={[0, 10, -10]} 
                                    color="blue" 
                                    intensity={5} 
                                    castShadow
                                /> */}
                                
                                <ambientLight intensity={2.5} />

                                {/* Chiếu sáng các model cụ thể */}
                                
                                {/* Môi trường */}

                                {/* item */}
                                
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
                                {/* Chuyển đổi bộ điều khiển dựa trên controlMode */}
                                {controlMode === "user" && (
                                    <Movement2
                                        cameraPosition={cameraPosition}
                                        cameraRotation={cameraRotation}
                                        clicked={clicked}
                                        freeExploration={freeExploration}
                                    />
                                )}

                                {controlMode === "overview" && (
                                    <OrbitControls enableZoom={true} enableRotate={true} />
                                )}
                                {/* Hàm bổ trợ */}
                                {/* <EffectComposer>
                                    <SSAO samples={31} radius={20} intensity={15} luminanceInfluence={0.6} />
                                    <DepthOfField focusDistance={0.015} focalLength={0.02} bokehScale={2} />
                                </EffectComposer> */}
                                {/* bloom, vignette, color correction, noise, film grain, Lens Distortion / Chromatic Aberration, Glitch, God Rays (Light Shafts), Hue/Saturation, Tone Mapping, Outline, Tilt Shift, Bloom Selective */}

                        </Suspense>
                    </Canvas>

                    <div className="control-mode-buttons">
                                <button
                                    onClick={() => setControlMode("user")}
                                    style={{
                                        marginRight: "10px",
                                        padding: "10px",
                                        backgroundColor: controlMode === "user" ? "#4caf50" : "#f0f0f0",
                                        color: controlMode === "user" ? "white" : "black",
                                    }}
                                >
                                    View người dùng
                                </button>
                                <button
                                    onClick={() => setControlMode("overview")}
                                    style={{
                                        padding: "10px",
                                        backgroundColor: controlMode === "overview" ? "#4caf50" : "#f0f0f0",
                                        color: controlMode === "overview" ? "white" : "black",
                                    }}
                                >
                                    View toàn bộ
                                </button>
                            </div>

                    {/* Thanh sidebar */}
                    <div className='sidebarMain'>
                        {/* <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handlePreviousItem}>
                            <MdSkipPrevious />
                        </div>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleNextItem}>
                            <MdSkipNext />
                        </div> */}
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleOpenPopUpUpdate}>
                            <MdSkipPrevious />
                        </div>
                        <div className={`fullscreen_button ${navToggle ? 'fullscreen_button-change' : ""}`} onClick={handleOpenPopUpUpdate}>
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
                                <div className='sidebarDisc__button__text'>Chế độ toàn màn hình</div>
                                {!isFullscreen ? (
                                    <button className={`fullscreen_button`}><MdOutlineZoomOutMap /></button>
                                ) : (
                                    <button className={`fullscreen_button`}><MdOutlineZoomInMap /></button>
                                )}
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenInstructions}>
                                <div className='sidebarDisc__button__text'>Hướng dẫn di chuyển</div>
                                <div className='sidebarDisc__button__btn'><RiDragMoveFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpUpdate}>
                                <div className='sidebarDisc__button__text'>Bắt đầu tham quan</div>
                                <div className='sidebarDisc__button__btn'><SiAwesomelists /></div>
                            </div>
                            {/* <div className='sidebarDisc__button' onClick={startTour}>
                                <div className='sidebarDisc__button__text'>Start tour</div>
                                <div className='sidebarDisc__button__btn'><SiAwesomelists /></div>
                            </div> */}
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpListModel}>
                                <div className='sidebarDisc__button__text'>Danh sách mẫu vật</div>
                                <div className='sidebarDisc__button__btn'><PiListStarFill /></div>
                            </div>
                            <div className='sidebarDisc__button' onClick={handleOpenPopUpAboutTheExhibition}>
                                <div className='sidebarDisc__button__text'>Về triển lãm</div>
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
                    <ModelPopup 
                        open={popupOpen} 
                        onClose={handleClosePopup} 
                        imageUrl={selectedImageUrl} 
                        info={selectedInfo} 
                        model={selectedModel} 
                        video={selectedVideo} 
                        onAudioEnded={handleAudioEnded} 
                        tourActive={tourActive} 
                    />
                    <PopUpHowToMove open={showHowToMove} handleClose={handleCloseHowToMove} />
                    <PopUpAboutTheExhibition open={popUpAboutTheExhibition} handleClose={handleClosePopUpAboutTheExhibition} />
                    <PopUpUpdate open={popUpUpdate} onClose={handleClosePopUpUpdate} />
                    <PopUpListModel open={popUpListModel} onClose={handleClosePopUpListModel} items={items} onItemClick={handleListItemClick} /> {/* List Popup */}
                    {/* Pop up */}

                    {/* Đếm thời gian tour */}
                    {tourActive && (
                        <div className={`tour-countdown ${showCountdown ? 'show' : ''}`}>
                            {!paused ? (
                                <div className="pause-tour" onClick={pauseTour}>
                                    Pause Tour
                                </div>
                            ) : (
                                <div className="pause-tour" onClick={continueTour}>
                                    Continue Tour
                                </div>
                            )}
                            <div className="end-tour" onClick={endTour}>
                                End Tour
                            </div>
                        </div>
                    )}
                    {/* Đếm thời gian tour */}

                    {showPuzzleGame1 && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button
                                    className="close-popup"
                                    onClick={() => setShowPuzzleGame1(false)}
                                >
                                    ✕
                                </button>
                                <PuzzleGame onComplete={handlePuzzle1Complete} />
                            </div>
                        </div>
                    )}
                    {showPuzzleGame2 && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button
                                    className="close-popup"
                                    onClick={() => setShowPuzzleGame2(false)}
                                >
                                    ✕
                                </button>
                                <PuzzleGame onComplete={handlePuzzle2Complete} />
                            </div>
                        </div>
                    )}
                    {showPuzzleGame3 && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <button
                                    className="close-popup"
                                    onClick={() => setShowPuzzleGame3(false)}
                                >
                                    ✕
                                </button>
                                <PuzzleGame onComplete={handlePuzzle3Complete} />
                            </div>
                        </div>
                    )}
                </div>
                {/* Input file hidden */}
                {/* <input
                        id="file-input"
                        type="file"
                        accept=".glb"
                        style={{ display: "none" }}
                        onChange={handleFileUpload}
                    /> */}
                <input
                    ref={inputRef}
                    type="file"
                    accept=".glb"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
            </CameraProvider>
            {/* Respondsive */}
            <ResizeHandler updateItemsForScreenSize={updateItemsForScreenSize} />
            {/* Respondsive */}
        </>
    )
}

export default Custom;
