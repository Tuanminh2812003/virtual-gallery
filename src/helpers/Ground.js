import React from 'react';
import { usePlane } from '@react-three/cannon';

const Ground = ({ position, rotation, color, opacity, args, mass = 0 }) => {
    const [ref] = usePlane(() => ({
        position,
        rotation,
        mass, // Mass for the ground, even though it's usually static
        type: mass > 0 ? 'Dynamic' : 'Static', // Set type based on mass
    }));

    return (
        <mesh ref={ref} castShadow receiveShadow>
            <planeGeometry args={args} />
            <meshStandardMaterial color={color} opacity={opacity} transparent />
        </mesh>
    );
};

export default Ground;
