function Progress(props) {
  const { bgcolor, completed, labels } = props;

  const labelStyles = {
    padding: 0,
    fontWeight: 'normal',
    float: 'left'
  }

  const progressStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'normal'
  }

  return (
    <div>
      {props.completed.map((value, index) => {
        return (
          <div key={index} style={getFillerStyles(completed[index], bgcolor)}>
                <span style={labelStyles}>{labels[index]}</span>
                {/* <span style={progressStyles}>{`${completed[index]}%`}</span> */}
                <span style={progressStyles}></span>
          </div>
        )
      })}
    </div>
  );
};

function getFillerStyles(completed, bgcolor) {
  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: `${completed === 100 ? '#119933' : bgcolor}`,
    borderRadius: 'inherit',
    textAlign: 'right'
  }
  return fillerStyles;
}

export default Progress 