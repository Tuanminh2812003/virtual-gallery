// src/components/MinhTestMotion/MinhTestMotion.js
import React, { useRef, useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils'; // Import clone
import { AnimationMixer } from 'three'; // Import AnimationMixer
import { Euler } from 'three';

function MinhTestMotion({ position, rotation, scale, onClick }) {
    const gltf = useLoader(GLTFLoader, '/assets/MinhTestMotion/Whale_anim_v4.glb');
    const ref = useRef();
    const mixer = useRef();
    const clonedScene = useRef();

    useEffect(() => {
        if (!clonedScene.current) {
            clonedScene.current = clone(gltf.scene);
            if (gltf.animations.length > 0) {
                mixer.current = new AnimationMixer(clonedScene.current);
                gltf.animations.forEach((clip) => {
                    mixer.current.clipAction(clip).play();
                });
            }
        }

        if (ref.current && !ref.current.children.length) {
            ref.current.add(clonedScene.current);
            ref.current.rotation.set(
                rotation[0] * (Math.PI / 180),
                (rotation[1] + 90) * (Math.PI / 180),
                rotation[2] * (Math.PI / 180)
            );
        }

        return () => {
            if (mixer.current) {
                mixer.current.stopAllAction();
            }
        };
    }, [gltf, rotation]);

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    const handleClick = () => {
        if (onClick) {
            onClick(position, rotation, clonedScene.current);
        }
    };

    return (
        <group ref={ref} position={position} scale={scale} onClick={handleClick} />
    );
}

export default MinhTestMotion;
