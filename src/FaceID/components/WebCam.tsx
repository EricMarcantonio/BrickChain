import React from "react";
import Webcam from "react-webcam";
import { container } from "../../state";

interface WebCamProps {
    photo: any;
    setPhoto: any;
    facingMode?: string;
    width?: number;
    className?: string;
}

export const WebCam = ({
    photo,
    setPhoto,
    facingMode,
    width,
    className,
}: WebCamProps) => {
    const con = container.useContainer();
    const webcamRef = React.useRef(null);
    if (!width) width = 200;
    if (!facingMode) facingMode = "user";
    const videoConstraints = {
        width: 1920,
        height: 1080,
        facingMode,
    };

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat={"image/png"}
                width={320}
                videoConstraints={videoConstraints}
                className={className}
                screenshotQuality={100}
            />
            <button
                onClick={() => {
                    //@ts-ignore
                    con.setWebCamPhoto(webcamRef.current.getScreenshot());
                }}
            >
                Click me fam
            </button>
        </>
    );
};
