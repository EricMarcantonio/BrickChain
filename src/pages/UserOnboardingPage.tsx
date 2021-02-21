import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { container } from "../state";

import { FaceID } from "../FaceID";
import * as canvas from "canvas";
import * as faceapi from "face-api.js";

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
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    function getSteps() {
        return [
            "Sign Up",
            "Add a picture of your face",
            "Add a second, just to be sure",
        ];
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <UserForm />;
            case 1:
                return <AddFace />;
            case 2:
                return <AddFace />;
            default:
                return "Unknown step";
        }
    }

    const UserForm = () => {
        return (
            <form className="flex flex-col space-y-2">
                <div>
                    Email
                    <input
                        type="text"
                        onChange={e => con.setUserEmail(e.target.value)}
                        className="rounded-sm bg-yellow-200"
                        value={con.userEmail}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        onChange={e => con.setUserPassword(e.target.value)}
                        value={con.userPassword}
                    />
                </div>
                <button onClick={handleNext}>Next</button>
            </form>
        );
    };

    const AddFace = () => {
        con.setTakingPhoto(true);
        con.setWebCamPhoto("");
        return (
            <div>
                {con.takingPhoto ? (
                    <FaceID callback={() => handleNext()} />
                ) : (
                    <>
                        <img src={con.webCamPhoto} />
                        <div>
                            <button onClick={() => {
                                handleNext();
                                getDesc(con.webCamPhoto).then((res) => {
                                    if (res){
                                        //send to db
                                    }
                                })
                            }}>Continue</button>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className={"container flex"}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}
