// src/components/MinhTestMotion/MinhTestMotion.js
import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

function MinhTestMotion({ path, position, rotation, scale }) {
    // Load GLTF model
    const gltf = useLoader(GLTFLoader, path);
    const modelRef = useRef();
    const mixer = useRef();

    useEffect(() => {
        // Initialize AnimationMixer and play all animations
        if (gltf && gltf.animations && gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
            gltf.animations.forEach((clip) => {
                mixer.current.clipAction(clip).play();
            });
        }
    }, [gltf]);

    // Update animation on each frame
    useFrame((state, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    return (
        <group
            ref={modelRef}
            position={position}
            scale={scale}
            rotation={rotation}
        >
            <primitive object={gltf.scene} />
        </group>
    );
}

export default MinhTestMotion;
