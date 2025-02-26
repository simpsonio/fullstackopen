import { useState, useEffect } from 'react'

import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  if (!countries) return null


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = filter ?
    countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())) 
    : countries







  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <Countries filter={filter} filteredCountries={filteredCountries} setFilter={setFilter}/>
    </div> 
  )
}

export default App
