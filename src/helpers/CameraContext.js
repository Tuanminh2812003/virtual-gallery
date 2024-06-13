import React, { createContext, useState } from 'react';

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
    const [yaw, setYaw] = useState(0);
    const [pitch, setPitch] = useState(0);

    return (
        <CameraContext.Provider value={{ yaw, setYaw, pitch, setPitch }}>
            {children}
        </CameraContext.Provider>
    );
};

export default CameraContext;
