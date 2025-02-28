const Error = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='errorDiv'>
            {message}
        </div>
    )
}

export default Error