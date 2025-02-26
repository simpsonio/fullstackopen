const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='notificationDiv'>
            {message}
        </div>
    )
}

export default Notification