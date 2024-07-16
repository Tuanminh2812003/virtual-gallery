import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import PictureFrame from '../../components/PictureFrame';
import "./ModelPopUp.css";

const ModelPopup = ({ open, onClose, imageUrl, info, model, video }) => {
    // const autoplayVideo = video ? `${video}&autoplay=1` : null;
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
                {/* {autoplayVideo && (
                    <div className="iframe-container">
                        <iframe
                            width="560"
                            height="315"
                            src={autoplayVideo}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                )} */}

                {video && (
                    <audio controls src={video}></audio>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModelPopup;