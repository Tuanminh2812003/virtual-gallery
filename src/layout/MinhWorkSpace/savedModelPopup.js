// src/components/ModelPopup.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ModelPopup = ({ open, onClose, model }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Thông tin</DialogTitle>
            <DialogContent>
                <Canvas style={{ height: '400px' }}>
                <ambientLight intensity={1}/>
                <primitive object={model} scale='2'/>
                <OrbitControls />
                </Canvas>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelPopup;