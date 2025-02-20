import Content from './Content'
import Total from './Total'

const Course = ({name, parts}) => {
    return(
        <div>
            <h1>{name}</h1>
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course