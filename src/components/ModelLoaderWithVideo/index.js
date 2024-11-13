import React, { useState, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Vector3, Euler } from 'three';

const ModelLoaderWithVideo = ({ path, position, rotation = [0, 0, 0], scale, videoUrl }) => {
    const model = useLoader(GLTFLoader, path);
    const { scene } = useThree();
    const [videoTexture, setVideoTexture] = useState(null);

    useEffect(() => {
        // Load video and create a texture from it
        const video = document.createElement('video');
        video.src = videoUrl;
        video.loop = true;
        video.muted = true;
        video.play();

        const texture = new THREE.VideoTexture(video);
        setVideoTexture(texture);

        model.scene.traverse((child) => {
            if (child.isMesh) {
                // Identify the TV screen and apply the video texture to it
                if (child.name === "Cube.001") { // Replace with the actual name of the TV surface
                    child.material = new THREE.MeshStandardMaterial({ map: texture });
                }
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        return () => {
            video.pause(); // Stop the video when component unmounts
        };
    }, [model, videoUrl]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <primitive object={model.scene} />
        </group>
    );
};

export default ModelLoaderWithVideo;
