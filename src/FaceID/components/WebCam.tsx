import React from "react";
import Webcam from "react-webcam";
import { container } from "../../state";

interface WebCamProps {
    photo: any;
    setPhoto: any;
    facingMode?: string;
    width?: number;
    className?: string;
    callback?: () => void;
}

export const WebCam = ({
    photo,
    setPhoto,
    facingMode,
    width,
    className,
    callback,
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
        <div className="flex flex-col">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat={"image/png"}
                width={640}
                videoConstraints={videoConstraints}
                className={className}
                screenshotQuality={100}
            />
            <button
                onClick={() => {
                    //@ts-ignore
                    con.setWebCamPhoto(webcamRef.current.getScreenshot());
                    con.setTakingPhoto(false);
                    if (callback) {
                        callback();
                    }
                }}
                className={"rounded-lg p-1 bg-black font-mono text-white"}
            >
                Take Photo
            </button>
        </div>
    );
};
