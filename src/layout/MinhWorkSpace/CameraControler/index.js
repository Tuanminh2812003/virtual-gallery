import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';

function CameraController() {
  const { camera } = useThree();
  const speed = 0.5;
  const rotationSpeed = 0.02;
  const moveState = useRef({ forward: false, backward: false, left: false, right: false, rotateLeft: false, rotateRight: false });
  const cameraHeight = 0; // Adjust this value to set the height above the ground

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'w':
        moveState.current.forward = true;
        break;
      case 's':
        moveState.current.backward = true;
        break;
      case 'a':
        moveState.current.rotateLeft = true;
        break;
      case 'd':
        moveState.current.rotateRight = true;
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'w':
        moveState.current.forward = false;
        break;
      case 's':
        moveState.current.backward = false;
        break;
      case 'a':
        moveState.current.rotateLeft = false;
        break;
      case 'd':
        moveState.current.rotateRight = false;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const direction = useMemo(() => new Vector3(), []);
  const right = useMemo(() => new Vector3(), []);

  useFrame(() => {
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    right.crossVectors(camera.up, direction).normalize();

    const newPosition = camera.position.clone();
    const newRotation = new Euler().copy(camera.rotation);

    if (moveState.current.forward) newPosition.addScaledVector(direction, speed);
    if (moveState.current.backward) newPosition.addScaledVector(direction, -speed);
    if (moveState.current.rotateLeft) newRotation.y += rotationSpeed;
    if (moveState.current.rotateRight) newRotation.y -= rotationSpeed;

    // Kiểm tra va chạm với tường và sàn
    if (newPosition.x < -200) newPosition.x = -200;
    if (newPosition.x > 200) newPosition.x = 200;
    if (newPosition.z < -200) newPosition.z = -200;
    if (newPosition.z > 200) newPosition.z = 200;

    // Set the camera height
    newPosition.y = cameraHeight;

    camera.position.copy(newPosition);
    camera.rotation.copy(newRotation);
  });

  return null;
}

export default CameraController;
