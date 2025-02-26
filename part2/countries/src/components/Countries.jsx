const Countries = ({filter, filteredCountries}) => {
    if (filter.length === 0) return null

    else if(filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    else if(filteredCountries.length === 1) {
        const country = filteredCountries[0]
        const languages = []
        Object.keys(country.languages).forEach((language) => languages.push(country.languages[language]))

        return (
            <div>
                <h1>{country.name.common}</h1>
                Capital: {country.capital}<br />
                Area: {country.area} km2<br />
                <h2>Languages</h2>
                {languages.map(language => <li key = {language}>{language}</li>)}
                <br />
                <img src={country.flags.png}/>
            </div>
        )
    }
    return (
        <div>
            {
                filteredCountries.map(country =>
                    <div key={country.name.common}> {country.name.common}</div>
                )
            }
        </div>
    )
}

export default Countries