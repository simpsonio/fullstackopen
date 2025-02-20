const Total = ({parts}) => {
    return (
        <b>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</b>
    )
}

export default Total