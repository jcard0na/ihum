import Progress from './Progress.js';

function Timer(props) {
    return <div>
            <Progress labels={''} completed={[props.remaining]} bgcolor="#ffaa33" />
        </div>
}

export default Timer;