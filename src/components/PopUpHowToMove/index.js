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
                        md: '50%',  //
                    },
                    maxHeight: '90%',
                    overflow: 'auto',
                    borderRadius: '10px',
                    p: 4,
                    textAlign: 'center',
                    opacity: 0,
                    animation: 'slideDown 0.5s forwards, fadeIn 0.5s forwards',
                    color: 'white'
                }}
            >
                <h2 style={{ marginBottom: '40px' }}>Hướng dẫn sử dụng</h2>
                <div className='popUpMove__content' style={{ marginBottom: '40px' }}>
                    <img src='/NTST/HDSD.png' className='popUpMove__content__content__inner__img'/>
                </div>
                <Button 
                    onClick={() => handleClose('update')} 
                    className='button1'
                >
                    GUIDE TOUR
                </Button>
                <Button 
                    onClick={() => handleClose('free')} 
                    className='button2'
                >
                    BẮT ĐẦU TRẢI NGHIỆM
                </Button>
            </Box>
        </Modal>
    );
};

export default PopUpHowToMove;
