function Progress(props) {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }


  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      {props.completed.map((value, index) => {
        return (
          <div key={index} style={getFillerStyles(completed[index], bgcolor)}>
                <span style={labelStyles}>{`${completed[index]}%`}</span>
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
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }
  return fillerStyles;
}

export default Progress 