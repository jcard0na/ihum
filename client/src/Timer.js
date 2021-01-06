import Progress from './Progress.js';

function Timer(props) {
    if (props.enabled) {
        return <div>
            <Progress labels={''} completed={[props.remaining]} bgcolor="#ffaa33" />
        </div>
    } else
        return null;
}

export default Timer;