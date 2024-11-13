import React, { useState, useEffect, useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VideoTexture, MathUtils, DoubleSide } from 'three';

const ModelLoaderWithVideo = ({ path, position, rotation = [0, 0, 0], scale, videoUrl }) => {
    const model = useLoader(GLTFLoader, path);
    const videoRef = useRef();
    const [videoTexture, setVideoTexture] = useState(null); // Khởi tạo state để lưu trữ videoTexture

    useEffect(() => {
        // Tạo phần tử video
        const video = document.createElement('video');
        video.src = videoUrl;
        video.crossOrigin = 'anonymous';
        video.loop = true;
        video.muted = true;
        video.play();

        // Tạo VideoTexture từ phần tử video
        const newVideoTexture = new VideoTexture(video);
        newVideoTexture.center.set(0.5, 0.5);
        newVideoTexture.rotation = MathUtils.degToRad(180);

        setVideoTexture(newVideoTexture); // Lưu videoTexture vào state
        videoRef.current = video;

        // Bật âm thanh khi người dùng nhấp chuột
        const enableAudio = () => {
            video.muted = false;
            video.play();
            window.removeEventListener('click', enableAudio);
        };
        window.addEventListener('click', enableAudio);

        return () => {
            video.pause();
            video.src = '';
            videoRef.current = null;
            window.removeEventListener('click', enableAudio);
        };
    }, [videoUrl]);

    useEffect(() => {
        if (videoTexture) {
            // Tìm và gán VideoTexture cho lưới màn hình trong mô hình
            model.scene.traverse((child) => {
                if (child.isMesh && child.name === 'Cube007') { // Thay 'Cube007' thành tên của lưới bạn muốn gán texture
                    child.material.map = videoTexture;
                    child.material.side = DoubleSide;
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [model, videoTexture]); // Chạy khi videoTexture được tạo

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={model.scene} />
        </group>
    );
};

export default ModelLoaderWithVideo;
