import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]); // Start with an empty array
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch data from server when the component mounts
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
    console.log("InitialPersons Data fetched from server");
  }, []);

  // Add a new person to the phonebook
  const addPerson = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `The information for ${existingPerson.name} has already been removed from the server.`
            );
            setPersons(persons.filter((person) => person.id !== id)); // Update the state in case of error
          });
      }
      console.log("Person Updated to server");
      console.log(personObject);
    } else {
      personService.create(personObject).then((NewPerson) => {
        setPersons(persons.concat(NewPerson));
        setNewName("");
        setNewNumber("");
      });
      console.log("Person added to server");
      console.log(personObject);
    }
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id) // This should be the correct `id`
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id)); // Update the state
        })
        .catch((error) => {
          alert(`The person ${name} was already deleted from the server.`);
          setPersons(persons.filter((person) => person.id !== id)); // Update the state in case of error
        });
    }
  };

  // Filter the persons to show
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
