import a from "axios";

const axios = a.create({
    baseURL:
        "https://us-central1-aiot-fit-xlab.cloudfunctions.net/brickchainfunctions",
});

export const SendFaceDesc = (desc: Float32Array, userid: string) => {
    return axios.post("/storeuserface", {
        userid,
        desc,
    });
};

export const GetFaceDesc = (userid: string) => {
    return axios.post("/getuserface", {
        userid,
    });
};
