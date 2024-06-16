import React from 'react';
import { useBox } from '@react-three/cannon';

const Box = ({ mass, position, color, opacity, args }) => {
    const [ref] = useBox(() => ({ mass, position, args }));
    return (
        <mesh ref={ref} castShadow receiveShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} opacity={opacity} transparent />
        </mesh>
    );
};

export default Box;
