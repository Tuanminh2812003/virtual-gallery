// src/components/ResizeHandler.js
import { useEffect } from 'react';

const ResizeHandler = ({ setScaleFactor }) => {
    useEffect(() => {
        const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        

        //if else respondsive các màn hình
        if (width < 600) {
            setScaleFactor(1);
        } else {
            setScaleFactor(2);
        }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); //bắt sự kiện thay đổi màn hình thì chạy vào hàm resize

        return () => window.removeEventListener('resize', handleResize);
    }, [setScaleFactor]);

    return null;
};

export default ResizeHandler;
