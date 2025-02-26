const Filter = ({filter, handleFilterChange}) => {
    return(
        <form>
            <div>
                find country
                <input
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
        </form>
    )
}

export default Filter