import React from "react";
import { WebCam } from "./components/WebCam";
import { container } from "../state";

export const FaceID = (props?: any) => {
    const con = container.useContainer();
    return (
        <>
            <WebCam
                className="bg-black rounded-lg border-l"
                photo={con.webCamPhoto}
                setPhoto={con.setWebCamPhoto}
                callback={props.callback}
            />
        </>
    );
};
