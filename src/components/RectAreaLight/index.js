import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";


//vị trí, màu sắc, độ sáng, điểm được nhìn vào
function RectAreaLight({ position, color, intensity, lookAt }) {
    const { scene } = useThree();
    const lightRef = useRef();

    useEffect(() => {
        RectAreaLightUniformsLib.init();

        const rectLight = new THREE.RectAreaLight(color, intensity, 4, 8);
        rectLight.position.set(...position);
        rectLight.lookAt(...lookAt);
        scene.add(rectLight);
        scene.add(new RectAreaLightHelper(rectLight));
        lightRef.current = rectLight;

        return () => {
        scene.remove(rectLight);
        };
    }, [color, intensity, position, lookAt, scene]);

    return null;
}

export default RectAreaLight;
