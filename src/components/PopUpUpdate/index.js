import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, Typography } from '@mui/material';

const PopUpUpdate = ({ open, onClose}) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '40%', // Start higher than center
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: {
                        xs: '90%', // 90% width on extra small screens
                        sm: '50%', // 50% width on small screens
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
                <Typography variant="h6" gutterBottom>Chức năng đang trong thời gian phát triển</Typography>
                <Button
                    variant="contained"
                    onClick={onClose}
                    sx={{
                        mt: 2,
                        bgcolor: '#1976d2',
                        '&:hover': {
                            bgcolor: '#115293'
                        },
                        fontSize: "14px"
                    }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    );
};

export default PopUpUpdate;