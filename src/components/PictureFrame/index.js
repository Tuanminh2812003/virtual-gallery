import React, { useRef, useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import "./PictureFrame.css";
import { Html } from '@react-three/drei';

function PictureFrame({ position, rotation, scale, imageUrl, onClick, info = { artist: '', title: '', year: '' }, onDetailClick, showDetailsPrompt, setShowDetailsPrompt, tourPopupOpen, video }) {
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    const ref = useRef();
    const borderRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

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

    useEffect(() => {
        if (clicked) {
            const timer = setTimeout(() => {
                setClicked(false);
            }, 5000); // Hide after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [clicked]);

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
            onClick(position, rotation, ref.current, info);
        }
        setClicked(true);
    };

    const handleDetailClick = (e) => {
        e.stopPropagation();
        setClicked(false);
        if (onDetailClick) {
            onDetailClick(imageUrl, info, video);
        }
    };

    useEffect(() => {
        if (tourPopupOpen) {
            setClicked(true);
        }
    }, [tourPopupOpen]);

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
            <mesh ref={ref}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            {(hovered || clicked || tourPopupOpen) && (
                <Html position={[0, -1.2, 0]} center>
                    <div className="picture-info">
                        <div className='picture-info__artist'>{info.artist}</div>
                        <div className='picture-info__disc'>{info.title}, {info.year}</div>
                        {(clicked || tourPopupOpen) && (
                            <button onClick={handleDetailClick} className="details-button">
                                Xem chi tiết
                            </button>
                        )}
                    </div>
                </Html>
            )}
        </group>
    );
}

export default PictureFrame;