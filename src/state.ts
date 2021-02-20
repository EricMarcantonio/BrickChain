import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {

    const [isAuthenticated, setIsAutheticated]  = useState(false)   
    const [webCamPhoto, setWebCamPhoto] = useState(null);

    return {
        isAuthenticated,
        setIsAutheticated,
        
        webCamPhoto,
        setWebCamPhoto
    };
});
