import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import "./PopUpHowToMove.css";

const PopUpHowToMove = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={() => handleClose('free')}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '40%', // Start higher than center
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '90%', // 90% width on extra small screens
                        sm: '80%', // 80% width on small screens
                        md: '40%',  // 400px width on medium screens and up
                    },
                    maxHeight: '80%',
                    overflow: 'auto',
                    bgcolor: 'white',
                    borderRadius: '10px',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                    opacity: 0,
                    animation: 'slideDown 0.5s forwards, fadeIn 0.5s forwards',
                    color: '#191919'
                }}
            >
                <h2 style={{ marginBottom: '16px' }}>How to move?</h2>
                <div className='popUpMove__content'>
                    <div className='popUpMove__content__content__inner'>
                        <div className='popUpMove__content__content__inner__text'>
                            <b>Click and drag</b> to rotate the camera
                        </div>
                        <img src='/assets/HowToMove/how1.png' className='popUpMove__content__content__inner__img'/>
                    </div>
                    <div className='popUpMove__content__content__inner'>
                        <div className='popUpMove__content__content__inner__text'>
                            Use your <b>"UP" and "W" keys</b> to move foward, <b>"DOWN" and "S" keys</b> to move back, <b>"LEFT" and "A"</b> to move left, <b>"RIGHT" and "D"</b> to move right
                        </div>
                        <img src='/assets/HowToMove/how2.png' className='popUpMove__content__content__inner__img'/>
                    </div>
                    <div className='popUpMove__content__content__inner'>
                        <div className='popUpMove__content__content__inner__text'>
                            <b>Click on artworks</b> to see details of the artworks
                        </div>
                        <img src='/assets/HowToMove/how3.png' className='popUpMove__content__content__inner__img'/>
                    </div>
                    <div className='popUpMove__content__content__inner'>
                        <div className='popUpMove__content__content__inner__text'>
                            Click on the <b>menu icon</b> to acces the guided tour, catalog, exhibition infomation and more
                        </div>
                        <img src='/assets/HowToMove/how4.png' className='popUpMove__content__content__inner__img'/>
                    </div>
                </div>
                <Button 
                    variant="contained" 
                    onClick={() => handleClose('free')} 
                    sx={{ 
                        m: 2, 
                        bgcolor: '#1976d2', 
                        '&:hover': { 
                            bgcolor: '#115293' 
                        } ,
                        fontSize: "14px"
                    }}
                    className='move_button'
                >
                    Free Exploration
                </Button>
                <Button 
                    variant="contained" 
                    onClick={() => handleClose('tour')} 
                    sx={{ 
                        m: 2, 
                        bgcolor: '#1976d2', 
                        '&:hover': { 
                            bgcolor: '#115293' 
                        } ,
                        fontSize: "14px"
                    }}
                    className='move_button'
                >
                    Guided Tour
                </Button>
            </Box>
        </Modal>
    );
};

export default PopUpHowToMove;
