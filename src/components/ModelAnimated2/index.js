import React, { useRef } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useAnimations } from '@react-three/drei';

const ModelAnimated2 = ({ path, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], onClick }) => {
  const model = useLoader(GLTFLoader, path); // Load model từ đường dẫn
  const group = useRef();
  const { animations } = model; // Lấy danh sách animation từ model
  const { actions } = useAnimations(animations, group); // Kết nối animation với model

  React.useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      actions[Object.keys(actions)[0]].play(); // Phát animation đầu tiên
    }
  }, [actions]);

  const { scene } = useThree();

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(); // Gọi callback khi click
      }}
    >
      <primitive object={model.scene} />
    </group>
  );
};

export default ModelAnimated2;
