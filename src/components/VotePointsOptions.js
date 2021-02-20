import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    select: {
        border: '1px solid grey',
        borderRadius: "5px"
    }
  }),
);

export default function VotePointsOptions() {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select className={classes.select} id="grouped-select">
            <MenuItem value={5}>1st</MenuItem>
            <MenuItem value={4}>2nd</MenuItem>
            <MenuItem value={3}>3rd</MenuItem>
            <MenuItem value={2}>4th</MenuItem>
            <MenuItem value={1}>5th</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}