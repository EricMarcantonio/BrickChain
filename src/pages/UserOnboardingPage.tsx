import React, { useEffect, useState } from "react";
import { container } from "../state";

import { FaceID } from "../FaceID";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";

import Lottie from "react-lottie";
import brick from "../assets/animations/brickLogin.json";

import firebase from "../firebase";

import { CreateUser, SendFaceDesc, GetFaceDesc } from "../backend";

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

const options = {
    loop: true,
    autoplay: true,
    animationData: brick,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

export default function UserOnboardingPage() {
    const con = container.useContainer();

    const [currentView, setCurrentView] = useState("login");
    const [view1, setView1] = useState(true);
    const [view2, setView2] = useState(true);

    const UserForm = () => {
        return (
            <div className="flex flex-col space-y-2 h-screen w-screen">
                <div className="flex justify-center text-4xl font-mono mt-10">
                    Let's get you setup.
                </div>
                <div className="absolute w-screen h-screen">
                    <div className="flex h-full w-full ">
                        <div className="m-auto">
                            <div className="bg-black p-4 rounded-lg flex flex-col justify-items-center w-full">
                                <Lottie options={options} />
                                <div className="space-y-2 flex justify-center flex-col">
                                    <div>
                                        <input
                                            type="text"
                                            id="email123"
                                            placeholder="Email"
                                            autoComplete={"off"}
                                            className="rounded-lg p-3 w-full"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            id="pass123"
                                            placeholder="password...ssh"
                                            autoComplete="off"
                                            className="rounded-lg p-3 w-full"
                                        />
                                    </div>
                                    <button
                                        className="bg-white p-2 rounded-lg self-center"
                                        onClick={() => {
                                            //@ts-ignore
                                            let e = document.getElementById(
                                                "email123"
                                            ).value;
                                            //@ts-ignore
                                            let p = document.getElementById(
                                                "pass123"
                                            ).value;
                                            con.setUserEmail(e);
                                            con.setUserPassword(p);
                                            firebase
                                                .auth()
                                                .createUserWithEmailAndPassword(
                                                    e,
                                                    p
                                                )
                                                .then(user => {
                                                    con.setUserId(
                                                        user.user?.uid || ""
                                                    );
                                                    setCurrentView("step1");
                                                });
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const AddFace = () => {
        return (
            <div>
                {view1 ? (
                    <div className="absolute h-screen w-screen">
                        <div className="flex h-full">
                            <div className="m-auto">
                                <FaceID
                                    callback={() => setView1(false)}
                                    className={"container flex"}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="absolute h-screen w-screen">
                            <div className="flex h-full">
                                <div className="m-auto">
                                    <img
                                        src={con.webCamPhoto}
                                        className="rounded-lg"
                                    />
                                    <button
                                        className="bg-black text-white p-3 rounded-lg"
                                        onClick={() => {
                                            setView1(false);
                                            setCurrentView("lol");
                                            getDesc(con.webCamPhoto).then(
                                                res => {
                                                    console.log(res);
                                                    if (res) {
                                                        CreateUser(
                                                            con.userId,
                                                            res
                                                        )
                                                            .then(log => {
                                                                console.log(
                                                                    log
                                                                );
                                                            })
                                                            .catch(err => {
                                                                console.log(
                                                                    err
                                                                );
                                                            });
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    const AddFace1 = () => {
        return (
            <div>
                {view2 ? (
                    <div className="absolute h-screen w-screen">
                        <div className="flex h-full">
                            <div className="m-auto">
                                <FaceID
                                    callback={() => setView2(false)}
                                    className={"container flex"}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="absolute h-screen w-screen">
                            <div className="flex h-full">
                                <div className="m-auto">
                                    <img
                                        src={con.webCamPhoto}
                                        className="rounded-lg"
                                    />
                                    <button
                                        className="bg-black text-white p-3 rounded-lg"
                                        onClick={() => {
                                            getDesc(con.webCamPhoto).then(
                                                res => {
                                                    if (res) {
                                                        SendFaceDesc(
                                                            con.userId,
                                                            res
                                                        )
                                                            .then(data => {
                                                                console.log(
                                                                    data.data
                                                                );
                                                            })
                                                            .catch(data => {
                                                                console.log(
                                                                    data
                                                                );
                                                            });
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    // useEffect(() => {
    //     // if (con.userId)
    //     GetFaceDesc("9JCWshJK9jO5sm8Pc3DaAHTZK053").then(data => {
    //         console.log(data.data.userface1.split(","));
    //     });
    // }, []);

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
        <div>
            <Lol />
        </div>
    );
}
