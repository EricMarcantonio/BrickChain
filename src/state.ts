import { useState } from "react";
import { createContainer } from "unstated-next";

export const container = createContainer(() => {
    const [exampleState, setExampleState] = useState(false);
    const [webCamPhoto, setWebCamPhoto] = useState(null);
    return {
        exampleState,
        setExampleState,
        webCamPhoto,
        setWebCamPhoto
    };
});
