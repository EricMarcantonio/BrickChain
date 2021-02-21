import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import BLOCKS  from "../assets/brick.gif"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: "rgba(128, 128, 128, 0.205)",
        textAlight: "center",
        height: "100vh",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem: "center"
    },
    header: {
        fontSize: '40px',
        fontWeight: "500",
        textAlign: "center",
        marginBottom: "30px",
        backgroundColor: "white",
        padding: "50px"
    },
    top: {
        width: "100%",
    },
    div: {
        display: "flex",
        justifyContent: "center",
    },
    img: {
        width: "600px",
        borderRadius: "15px" 
    }
  }),
);

export default function LoadingFace() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <p className={classes.top}></p>
        <div>
            <h1 className={classes.header}>Adding Your Face To Database</h1>
        </div>
        <hr></hr>
        <div className={classes.div}>
            <img className={classes.img} src={BLOCKS}></img>
        </div>
    </div>
  );
}