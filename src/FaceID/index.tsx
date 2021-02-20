import React from "react";
import { WebCam } from "./components/WebCam";
import { container } from "../state";
import * as faceapi from "face-api.js";
import * as canvas from "canvas";

(async function () {
    const MODEL_URL = "./weights";
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
})()
    .then(res => {
        console.log("Loaded");
    })
    .catch(err => {
        console.log(err);
    });

export const FaceID = () => {
    const getDesc = async () => {
        console.log("Getting some stuff");
        const tempImage = await canvas.loadImage(con.webCamPhoto || "");
        const details = await faceapi
            //@ts-ignore
            .detectSingleFace(tempImage)
            .withFaceLandmarks()
            .withFaceDescriptor();
        console.log(details?.descriptor);
    };

    const con = container.useContainer();
    return (
        <>
            <WebCam photo={con.webCamPhoto} setPhoto={con.setWebCamPhoto} />

            <img src={con.webCamPhoto || ""} />
            <button onClick={() => getDesc()}>Get Desc</button>
        </>
    );
};
