import { usePlane } from '@react-three/cannon';

const Ground = () => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    position: [0, 0, 0], // Đặt mặt đất tại y = 0
    rotation: [-Math.PI / 2, 0, 0], // Xoay để mặt phẳng nằm ngang
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

export default Ground;
