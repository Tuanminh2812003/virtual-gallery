import {React, useState} from 'react';
import { Canvas, extend } from '@react-three/fiber';
import { PlaneGeometry, BoxGeometry } from 'three';
import Movement from '../../action/Movement/index';
import ModelLoader from '../../components/ModelLoader/index';
import { CameraProvider } from '../../helpers/CameraContext';
import './index.css'
extend({ PlaneGeometry, BoxGeometry });

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

    return (
        <CameraProvider>
            <div className='main'>

            <Canvas shadows>
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
                <Movement setYaw={setYaw} />
                <ModelLoader path={"https://res.cloudinary.com/doom8nugx/image/upload/v1718006817/wjwjmwgxfi8xfdjfmhvk.glb"} position={[15, 2, -17]}/> 
                <ModelLoader 
                    path={"/assets/abandoned_vr_gallery.glb"} 
                    rotation={[0, Math.PI/2, 0]}
                    position={[25, 0, 0]} 
                    scale={[5, 5, 5]}
                    clickable={false}
                /> 

                {/* Model */}
                <ModelLoader 
                    path={"/assets/iron_sting_sword_free.glb"}  
                    position={[1, 5, -30]} 
                    scale={[55, 55, 55]}
                    rotation={[0, 90, 0]}
                />
                <ModelLoader 
                    path={"/assets/striker_eureka.glb"} 
                    position={[0, 5, -16]} 
                    scale={[0.01, 0.01, 0.01]}
                    rotation={[0, 0, 0]}
                />
            </Canvas>
                <div className="controls">
                    <button onMouseDown={() => handleControl('forward', true)} onMouseUp={() => handleControl('forward', false)}>▲</button>
                    <button onMouseDown={() => handleControl('backward', true)} onMouseUp={() => handleControl('backward', false)}>▼</button>
                    <button onMouseDown={() => handleControl('rotateLeft', true)} onMouseUp={() => handleControl('rotateLeft', false)}>◄</button>
                    <button onMouseDown={() => handleControl('rotateRight', true)} onMouseUp={() => handleControl('rotateRight', false)}>►</button>
                    <button className="fullscreen-button" onClick={handleFullscreenToggle}>⛶</button>
                </div>

            </div>
        </CameraProvider>
    );
};

export default Gallery;
