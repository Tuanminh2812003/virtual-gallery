import React, { useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PictureFrame from '../../components/PictureFrame';
import "./ModelPopUp.css";

const ModelPopup = ({ open, onClose, imageUrl, info, model, video, onAudioEnded }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('ended', onAudioEnded);
            return () => {
                audioElement.removeEventListener('ended', onAudioEnded);
            };
        }
    }, [onAudioEnded]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Infomation of model</DialogTitle>
            <DialogContent className='dialogContent'>
                {imageUrl ? (
                    <Canvas style={{ height: '400px' }}>
                        <ambientLight intensity={1} />
                        <PictureFrame
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={3} // Adjust scale as needed
                            imageUrl={imageUrl}
                            info={info} // Pass the info to PictureFrame
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

                {video && (
                    <audio ref={audioRef} controls src={video} autoPlay></audio>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelPopup;
