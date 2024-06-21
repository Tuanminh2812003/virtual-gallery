import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import "./PictureFrame.css";
import { Html } from '@react-three/drei';

function PictureFrame({ position, rotation, scale, imageUrl, onClick, info = { artist: '', title: '', year: '' } }) {
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    const ref = useRef();
    const borderRef = useRef();
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (ref.current) {
            const { width, height } = texture.image;
            const aspectRatio = width / height;
            ref.current.scale.set(aspectRatio * scale, scale, 1); // Set scale
            if (borderRef.current) {
                borderRef.current.scale.set(aspectRatio * scale + 0.1, scale + 0.1, 0.1); // Slightly larger for border
            }
        }
    }, [texture, scale]);

    const handlePointerOver = (e) => {
        document.body.style.cursor = 'pointer';
        setHovered(true);
    };
    const handlePointerOut = (e) => {
        document.body.style.cursor = 'default';
        setHovered(false);
    };

    const handleClick = () => {
        if (onClick) {
            onClick(position, rotation, ref.current);
        }
    };

    return (
        <group
            position={position}
            rotation={rotation.map(r => r * (Math.PI / 180))}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
        >
            <mesh ref={borderRef} position={[0, 0, -0.08]}>
                <boxGeometry args={[1.02, 1.02, 1]} />
                <meshBasicMaterial color="black" />
            </mesh>
            <mesh ref={ref} onClick={handleClick}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            {hovered && (
                <Html position={[0, -1.2, 0]} center>
                    <div className="picture-info">
                        <div className='picture-info__artist'>{info.artist}</div>
                        <div className='picture-info__disc'>{info.title}, {info.year}</div>
                    </div>
                </Html>
            )}
        </group>
    );
}

export default PictureFrame;
