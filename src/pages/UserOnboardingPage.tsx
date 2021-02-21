import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import { container } from "../state";

import { FaceID } from "../FaceID";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";

import firebase from "../firebase";

import { CreateUser, SendFaceDesc, GetFaceDesc } from "../backend";
import { Add } from "@tensorflow/tfjs";

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
const getDesc = async (photo: string) => {
    const tempImage = await canvas.loadImage(photo || "");
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

export default function UserOnboardingPage() {
    const con = container.useContainer();

    const [currentView, setCurrentView] = useState("login");
    const [view1, setView1] = useState(true);
    const [view2, setView2] = useState(true);

    const UserForm = () => {
        return (
            <div className="flex flex-col space-y-2">
                <div>
                    Email
                    <input
                        type="text"
                        className="rounded-sm bg-yellow-200"
                        id="email123"
                    />
                </div>
                <div>
                    Password
                    <input type="password" id="pass123" />
                </div>
                <button
                    onClick={() => {
                        //@ts-ignore
                        let e = document.getElementById("email123").value;
                        //@ts-ignore
                        let p = document.getElementById("pass123").value;
                        con.setUserEmail(e);
                        con.setUserPassword(p);
                        firebase
                            .auth()
                            .createUserWithEmailAndPassword(e, p)
                            .then(user => {
                                con.setUserId(user.user?.uid || "");
                                setCurrentView("step1");
                            });
                    }}
                >
                    Next
                </button>
            </div>
        );
    };

    const AddFace1 = () => {
        return (
            <div>
                {view2 ? (
                    <FaceID callback={() => setView2(false)} />
                ) : (
                    <>
                        <img src={con.webCamPhoto} />
                        <div>
                            <button
                                onClick={() => {
                                    getDesc(con.webCamPhoto).then(res => {
                                        if (res) {
                                            SendFaceDesc(con.userId, res)
                                                .then(data => {
                                                    console.log(data.data);
                                                })
                                                .catch(data => {
                                                    console.log(data);
                                                });
                                        }
                                    });
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const AddFace = () => {
        return (
            <div>
                {view1 ? (
                    <FaceID callback={() => setView1(false)} />
                ) : (
                    <>
                        <img src={con.webCamPhoto} />
                        <div>
                            <button
                                onClick={() => {
                                    setView1(false);
                                    setCurrentView("lol");
                                    getDesc(con.webCamPhoto).then(res => {
                                        console.log(res);
                                        if (res) {
                                            CreateUser(con.userId, res)
                                                .then(log => {
                                                    console.log(
                                                        "Creating a User"
                                                    );
                                                    GetFaceDesc(
                                                        con.userId
                                                    ).then(data => {
                                                        console.log(data.data);
                                                    });
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                });
                                        }
                                    });
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    };

    useEffect(() => {
        if (con.userId)
            GetFaceDesc(con.userId).then(data => {
                console.log(data.data);
            });
    }, []);

    const Lol = () => {
        if (currentView === "login") {
            return <UserForm />;
        } else if (currentView === "step1") {
            return <AddFace />;
        } else {
            return <AddFace1 />;
        }
    };

    return (
        <div className={"container flex"}>
            <Lol />
        </div>
    );
}
