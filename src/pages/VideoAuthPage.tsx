import React, { useState } from "react";
import { FaceID } from "../FaceID";
import { container } from "../state";
import * as faceapi from "face-api.js";
import * as canvas from "canvas";

let loadStartTime = new Date();
(async function () {
    const MODEL_URL = "./weights";
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
})().then(() => {
    console.log(
        "Loaded Tools in " +
            (new Date().getSeconds() - loadStartTime.getSeconds()) +
            "s"
    );
});
const VideoAuthPage = () => {
    const getDesc = async () => {
        const tempImage = await canvas.loadImage(con.webCamPhoto || "");
        const details = await faceapi
            //@ts-ignore
            .detectSingleFace(tempImage)
            .withFaceLandmarks()
            .withFaceDescriptor();
        if (!details) {
            return null;
        } else {
            return details.descriptor;
        }
    };

    const con = container.useContainer();

    if (con.takingPhoto) {
        return (
            <div className="flex h-screen">
                <div className="m-auto">
                    <FaceID />
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex h-screen">
                <div className="m-auto flex-col">
                    <img src={con.webCamPhoto} className="rounded-lg"/>

                    <button
                        onClick={() => {
                            const faceStart = new Date();
                            getDesc().then(data => {
                                console.log(
                                    "Face Analyzed in " +
                                        (new Date().getSeconds() -
                                            faceStart.getSeconds()) +
                                        "s"
                                );
                                if (!data) {
                                    alert("Face not found!");
                                    con.setTakingPhoto(true);
                                    con.setWebCamPhoto("");
                                } else {
                                    con.setFaceDesc(data);
                                }
                            });
                            //How do I switch routes
                        }}
                        className={'rounded-lg p-1 bg-yellow-300 font-mono'}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }
};

export default VideoAuthPage;
