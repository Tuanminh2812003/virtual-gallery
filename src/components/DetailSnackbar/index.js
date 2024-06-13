// src/components/DetailSnackbar.js
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const DetailSnackbar = ({ open, onClose, onClick }) => {
    return (
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert onClick={onClick} severity="info" sx={{ cursor: 'pointer' }}>
                Ấn để xem chi tiết bức tranh
            </Alert>
        </Snackbar>
    );
};

export default DetailSnackbar;
