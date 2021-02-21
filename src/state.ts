import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {
    const [isAuthenticated, setIsAutheticated] = useState(true);
    const [webCamPhoto, setWebCamPhoto] = useState("");
    const [takingPhoto, setTakingPhoto] = useState(true);
    const [faceDesc, setFaceDesc] = useState(new Float32Array());
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    return {
        isAuthenticated,
        setIsAutheticated,
        webCamPhoto,
        setWebCamPhoto,
        takingPhoto,
        setTakingPhoto,
        faceDesc,
        setFaceDesc,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
    };
});
