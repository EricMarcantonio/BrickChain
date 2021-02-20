import React from "react";
import { WebCam } from "./components/WebCam";
import { container } from "../state";
import faceapi from 'face-api.js';
import * as canvas from 'canvas';



export const FaceID = () => {

    (async function () {
        const MODEL_URL = './weights';
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
    })();

    const con = container.useContainer();
    const webcamRef = React.createRef();
    return (
        <>
            <WebCam
                photo={con.webCamPhoto}
                setPhoto={con.setWebCamPhoto}
            />

            <img src={con.webCamPhoto || ""} />
            <button>Get Desc</button>
        </>
    );
};
