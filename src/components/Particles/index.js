import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Particles({ texturePath, position, scale, rotation }) {
    const particlesRef = useRef();
    const particleCount = 1000;
    const particlePositions = new Float32Array(particleCount * 3);

    // Load the texture from the provided path
    const particleTexture = useLoader(TextureLoader, texturePath);

    // Generate random positions for particles
    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = ((Math.random() - 0.5) * 10) ; // Scale X
        particlePositions[i * 3 + 1] = ((Math.random() - 0.5) * 10) ; // Scale Y
        particlePositions[i * 3 + 2] = ((Math.random() - 0.5) * 10)  // Scale Z
    }

    // Rotate particles on each frame for dynamic effect
    useFrame(() => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.002;
        }
    });

    return (
        <points
            ref={particlesRef}
            position={position}
            rotation={rotation}
        >
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particlePositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                map={particleTexture} // Texture của particle
                size={scale} // Kích thước của particle
                transparent={true} // Bật tính năng trong suốt
                alphaTest={0.5} // Giúp loại bỏ các vùng trong suốt có giá trị alpha thấp
                depthWrite={false} // Ngăn chặn vấn đề với xếp chồng particle
            />
        </points>
    );
}
