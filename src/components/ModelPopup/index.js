import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PictureFrame from '../../components/PictureFrame';

const ModelPopup = ({ open, onClose, imageUrl, model }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Infomation of model</DialogTitle>
            <DialogContent>
                {imageUrl ? (
                    <Canvas style={{ height: '400px' }}>
                        <ambientLight intensity={1} />
                        <PictureFrame
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={3} // Adjust scale as needed
                            imageUrl={imageUrl}
                            onClick={() => {}}
                        />
                        <OrbitControls />
                    </Canvas>
                ) : model ? (
                    <Canvas style={{ height: '400px' }}>
                        <ambientLight intensity={1} />
                        <primitive object={model} scale={[2, 2, 2]} />
                        <OrbitControls />
                    </Canvas>
                ) : (
                    <div>Không có thông tin để hiển thị</div>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelPopup;
