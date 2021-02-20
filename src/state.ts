import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {
    const [isAuthenticated, setIsAutheticated] = useState(true);
    const [webCamPhoto, setWebCamPhoto] = useState("");
    const [takingPhoto, setTakingPhoto] = useState(true);
    const [faceDesc, setFaceDesc] = useState(new Float32Array());
    return {
        isAuthenticated,
        setIsAutheticated,
        webCamPhoto,
        setWebCamPhoto,
        takingPhoto,
        setTakingPhoto,
        faceDesc,
        setFaceDesc
    };
});
