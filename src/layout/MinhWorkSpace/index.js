import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import RectAreaLight from '../../components/RectAreaLight';

function LightsWithHelpers() {
    const spotLightRef = useRef();
    const pointLightRef = useRef();
    const { scene } = useThree();

    useEffect(() => {
        if (spotLightRef.current) {
            const spotLightHelper = new THREE.SpotLightHelper(spotLightRef.current);
            scene.add(spotLightHelper);
        }
        if (pointLightRef.current) {
            const pointLightHelper = new THREE.PointLightHelper(pointLightRef.current);
            scene.add(pointLightHelper);
        }
    }, [scene]);

    return (
        <>
            <spotLight ref={spotLightRef} position={[10, 5, 5]} intensity={200} color="yellow" angle={Math.PI / 4} penumbra={1} castShadow/>
            <pointLight ref={pointLightRef} position={[0, 5, 0]} intensity={1000} color="purple" decay={2} castShadow/>
        </>
    );
}

function MinhWorkSpace (){

    return(
        <>
            <div style={{ width: '100vw', height: '100vh' }}>
                <Canvas shadows>

                    <color attach="background" args={['#000']} />
                    {/* Reflective floor */}
                    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                        <planeGeometry args={[20, 20]} />
                        <meshStandardMaterial
                            color="#808080" roughness={0.1} metalness={0}
                        />
                    </mesh>
                    <mesh castShadow position={[0,1,0]}>
                        <boxGeometry />
                        <meshStandardMaterial color={"green"}/>
                    </mesh>

                    {/* đèn môi trường */}
                    {/* <ambientLight intensity={10} /> */}
                    {/* <directionalLight position={[10,5,0]} intensity={80} color={"red"}/> */}
                    {/* <hemisphereLight skyColor={"white"} groundColor={"red"} intensity={10} position={[0, 10, 0]} /> */}
                    {/* đèn môi trường */}

                    {/* nguồn sáng */}
                    <LightsWithHelpers />
                    <RectAreaLight position={[0, 0, 8]} color="red" />
                    <RectAreaLight position={[5, 0, 8]} color="blue" />
                    <RectAreaLight position={[-5, 0, 8]} color="green" />
                    {/* nguồn sáng */}

                    {/* <fog attach="fog" args={['white', 10, 100]} /> */}
                    <OrbitControls />
                </Canvas>
            </div>
        </>
    )
}

export default MinhWorkSpace;