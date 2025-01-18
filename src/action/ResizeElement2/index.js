import { useEffect } from 'react';
import throttle from 'lodash.throttle';

const ResizeHandler = ({ updateItemsForScreenSize }) => {
    useEffect(() => {
        const handleResize = throttle(() => {
            const width = window.innerWidth;
            let newItems = [];

            if (width > 0) {
                newItems = [
                    {
                        id: 1,
                        position: [6, 0, -22],
                        rotation: [0, 8, 0],
                        scale: 12,
                        imageUrl: "/NTST/Object/Chair 1_1.png",
                        info: { artist: 'NoInfo', title: 'chair', year: 2025 },
                        // video: "https://www.youtube.com/embed/ayLxUY9Jsh0?si=9KfHPhR6XZRtK7g4"
                        video: "/assets/Audio/voice1.mp3"
                    },
                    {
                        id: 2,
                        position: [-62, 10, 0],
                        rotation: [0, 90, 0],
                        scale: 8,
                        imageUrl: "https://res.cloudinary.com/dqlelya6o/image/upload/v1733040773/x24rsgb40s2cctuyjfcy.png",
                        info: { artist: 'PhươngThePoem', title: 'Tết Nguyên Đán', year: 2025 },
                        video: "/assets/Audio/voice2.mp3"
                    },
                    {
                        id: 3,
                        position: [62, 12, 0],
                        rotation: [0, -90, 0],
                        scale: 12,
                        imageUrl: "/assets/Picture/art_2.jpg",
                        info: { artist: 'Kobit', title: 'Kobit', year: 2024 },
                        video: "/assets/Audio/voice3.mp3"
                    },
                    {
                        id: 4,
                        position: [-10, 12, -27],
                        rotation: [0, 0, 0],
                        scale: 12,
                        imageUrl: "/assets/Picture/art_3.jpg",
                        info: { artist: 'Kobit', title: 'Kobit', year: 2024 },
                        video: "/assets/Audio/voice1.mp3"
                    },
                ];
            }

            // Check if newItems is different from current items
            updateItemsForScreenSize((prevItems) => {
                if (JSON.stringify(prevItems) !== JSON.stringify(newItems)) {
                    return newItems;
                }
                return prevItems;
            });
        }, 200); // Throttle resize events to every 200ms

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to handleResize to set initial items

        return () => window.removeEventListener('resize', handleResize);
    }, [updateItemsForScreenSize]);

    return null;
};

export default ResizeHandler;
