import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelInspector = ({ path }) => {
    const model = useLoader(GLTFLoader, path);

    useEffect(() => {
        // In ra tất cả các mesh trong model
        model.scene.traverse((child) => {
            if (child.isMesh) {
                console.log('Mesh name:', child.name);
            }
        });
    }, [model]);

    return <primitive object={model.scene} />;
};

export default ModelInspector;
