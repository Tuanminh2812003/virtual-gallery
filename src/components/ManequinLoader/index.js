import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3 } from "three";

const ManequinLoader = ({ modelPath, position = [0, 0, 0], rotation = [0, 0, 0], onModelClick }) => {
  const model = useLoader(GLTFLoader, modelPath);

  useEffect(() => {
    if (model) {
      const boundingBox = new Box3().setFromObject(model.scene);
      const center = new Vector3();
      boundingBox.getCenter(center);

      // Reset model về gốc tọa độ (0, 0, 0)
      model.scene.position.sub(center);

      // Đặt model sát mặt đất
      const size = new Vector3();
      boundingBox.getSize(size);
      model.scene.position.y -= size.y / 2;
    }
  }, [model]);

  return (
    <group
      onClick={onModelClick}
      position={position} // Đặt vị trí theo props
      rotation={rotation.map((angle) => (angle * Math.PI) / 180)} // Chuyển độ sang radian
    >
      {model && <primitive object={model.scene} />}
    </group>
  );
};

export default ManequinLoader;
