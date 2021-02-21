import React, { useState, useEffect } from "react";
import { FaceID } from "../FaceID";
import { container } from "../state";
import * as faceapi from "face-api.js";
import * as canvas from "canvas";

import { useHistory } from "react-router-dom";

import { GetFaceDesc } from "../backend";

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
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    const [face1, setFace1] = useState("");
    const [face2, setFace2] = useState("");
    const [status, setStatus] = useState(false);
    const con = container.useContainer();
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

    useEffect(() => {
        con.setTakingPhoto(true);
        GetFaceDesc(con.userId).then(data => {
            setFace1(data.data.userface1);
            setFace2(data.data.userface2);
            setStatus(Boolean(data.data.status));
        });
    }, []);

    const compareDescriptor = (pic1: Float32Array, pic2: Float32Array) => {
        return faceapi.euclideanDistance(pic1, pic2);
    };

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
                    <img src={con.webCamPhoto} className="rounded-lg" />

                    <button
                        disabled={loading}
                        onClick={() => {
                            setLoading(true);
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
                                    if (
                                        compareDescriptor(
                                            data,
                                            new Float32Array(
                                                face1.split(",").map(Number)
                                            )
                                        ) < 0.55
                                    ) {
                                        con.setFaceDesc(data);
                                        setLoading(false);
                                        history.push("/vote");
                                    } else if (
                                        compareDescriptor(
                                            data,
                                            new Float32Array(
                                                face2.split(",").map(Number)
                                            )
                                        ) < 0.55
                                    ) {
                                        con.setFaceDesc(data);
                                        setLoading(false);
                                        history.push("/vote");
                                    } else {
                                        alert("Face not recognized");
                                    }
                                }
                            });
                            //How do I switch routes
                        }}
                        className={"rounded-lg p-1 bg-yellow-300 font-mono"}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }
};

export default VideoAuthPage;
