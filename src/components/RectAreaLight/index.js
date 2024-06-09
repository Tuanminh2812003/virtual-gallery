import React, { useRef, useEffect } from 'react';
import { Canvas,useThree, extend, useFrame } from '@react-three/fiber';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import * as THREE from "three";

function RectAreaLightComponent({ position, color }) {
  const { scene } = useThree();

  RectAreaLightUniformsLib.init();

  const rectLight = new THREE.RectAreaLight(color, 20, 4, 8);
  rectLight.position.set(position[0], position[1], position[2]);
  scene.add(rectLight);
  scene.add(new RectAreaLightHelper(rectLight));

  return null;
}

export default RectAreaLightComponent;
