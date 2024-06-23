import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

const MinimapScene = ({ target, onMinimapClick, locations }) => {
    const cameraRef = useRef();
    const [hoveredLocation, setHoveredLocation] = useState(null);

    useFrame(() => {
        if (cameraRef.current && target.current) {
            cameraRef.current.position.set(target.current.position.x, 50, target.current.position.z);
            cameraRef.current.lookAt(target.current.position);
            cameraRef.current.updateProjectionMatrix();
        }
    });

    const handlePointerMove = (event) => {
        const [x, , z] = event.point.toArray();
        const hovered = locations.find(location => 
            Math.abs(location.position[0] - x) < 5 && Math.abs(location.position[2] - z) < 5
        );
        setHoveredLocation(hovered || null);
    };

    const handlePointerDown = (event) => {
        if (hoveredLocation) {
            onMinimapClick(hoveredLocation.position, hoveredLocation.rotation);
        }
    };

    return (
        <>
            <OrthographicCamera
                ref={cameraRef}
                makeDefault
                position={[0, 50, 0]}
                zoom={0.1}
            />
            {locations.map((location, index) => (
                <group key={index} position={location.position} onPointerMove={handlePointerMove} onPointerDown={handlePointerDown}>
                    <mesh>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                    {hoveredLocation && hoveredLocation.name === location.name && (
                        <Html>
                            <div className="minimap-tooltip">
                                {location.name}
                            </div>
                        </Html>
                    )}
                </group>
            ))}
        </>
    );
};

const Minimap = ({ target, onMinimapClick, locations }) => {
    return (
        <Canvas className="minimap">
            <MinimapScene target={target} onMinimapClick={onMinimapClick} locations={locations} />
        </Canvas>
    );
};

export default Minimap;
