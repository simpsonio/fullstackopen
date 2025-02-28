import Person from './Person'

const Persons = ({filteredPersons, deletePerson}) => {
    return (
        <div>
        {
          filteredPersons.map(person => 
              <Person 
                key={person.name}
                person={person} 
                deletePerson={() => deletePerson(person)}
              />
          )
        }
      </div>
    )
}

export default Persons