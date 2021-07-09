import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    padding: 0,
    fontWeight: "normal",
    float: "left",
  },
  progress: {
    padding: theme.spacing(1),
    color: "white",
    fontWeight: "normal",
  },
}));

function Progress(props) {
  const classes = useStyles();
  const { bgcolor, completed, labels } = props;

  return (
    <div>
      {props.completed.map((value, index) => {
        return (
          <div key={index} style={getFillerStyles(completed[index], bgcolor)}>
            <span className={classes.label}>{labels[index]}</span>
            {/* <span className={classes.progress}>{`${completed[index]}%`}</span> */}
            <span className={classes.progress}></span>
          </div>
        );
      })}
    </div>
  );
}

function getFillerStyles(completed, bgcolor) {
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: `${completed === 100 ? "#119933" : bgcolor}`,
    borderRadius: "inherit",
    textAlign: "right",
  };
  return fillerStyles;
}

export default Progress;
