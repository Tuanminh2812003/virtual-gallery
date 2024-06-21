import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';

const PopUpAboutTheExhibition = ({ open, handleClose }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box 
                sx={{
                    position: 'absolute',
                    top: '40%', // Start higher than center
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '90%', // 90% width on extra small screens
                        sm: '50%', // 80% width on small screens
                        md: 400,  // 400px width on medium screens and up
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
                <img src='/assets/Picture/art_1.jpg' />
                <h2 style={{ marginBottom: '16px' }}>AZZOLINO GALLERY</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloremque dolore quia omnis maxime corporis deserunt neque voluptatum.</p>
                <Button 
                    variant="contained" 
                    onClick={handleClose} 
                    sx={{ 
                        mt: 2, 
                        bgcolor: '#1976d2', 
                        '&:hover': { 
                            bgcolor: '#115293' 
                        } ,
                        fontSize: "14px"
                    }}
                >
                    Got it!
                </Button>
            </Box>
        </Modal>
    );
};

export default PopUpAboutTheExhibition;
