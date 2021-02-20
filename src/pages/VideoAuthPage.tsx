import React, { useState } from "react";
import { FaceID } from "../FaceID";
import { container } from "../state";
import * as faceapi from "face-api.js";
import * as canvas from "canvas";

const VideoAuthPage = () => {
    (async function () {
        const MODEL_URL = "../assets/weights";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    })();

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
                <div className="m-auto">
                    <img src={con.webCamPhoto} />
                    <button
                        onClick={() => {
                            con.setTakingPhoto(false);
                            con.setWebCamPhoto("");
                        }}
                    >
                        Retake
                    </button>
                    <button
                        onClick={() => {
                            getDesc().then(data => {
                                if (!data) {
                                    alert("Face not found!");
                                    con.setTakingPhoto(true);
                                    con.setWebCamPhoto("");
                                } else {
                                    con.setFaceDesc(data);
                                    console.log(data);
                                }
                            });
                            //How do I switch routes
                        }}
                    >
                        Looks good!
                    </button>
                </div>
            </div>
        );
    }
};

export default VideoAuthPage;
