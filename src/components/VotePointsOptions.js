import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { container } from "../state";

import { useState } from 'react' ;


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
        border: '1px solid grey',
        borderRadius: "5px",
        padding: "5px 15px"
    }
  }),
);

export default function VotePointsOptions({ choices, setChoices, setVote, vote, index }) {
  const classes = useStyles();

  const handleChange = (e) => {
    setChoices([...choices, e.target.value])

    if (e.target.value === 1) {
        setVote({...vote, first: index })
    } 
    else if (e.target.value === 2) {
        setVote({...vote, second: index })
    }
    else if (e.target.value === 3) {
        setVote({...vote, third: index })
    }
  };


    console.log(choices)
    console.log(vote)


  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select defaultValue={null} onChange={handleChange} className={classes.select} id="grouped-select">
            <MenuItem disabled={choices.includes(1)} value={1}>1st</MenuItem>
            <MenuItem disabled={choices.includes(2)} value={2}>2nd</MenuItem>
            <MenuItem disabled={choices.includes(3)} value={3}>3rd</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}