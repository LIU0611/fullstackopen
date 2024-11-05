import { useState, useEffect } from "react";
import personService from "./services/personService";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]); // Start with an empty array
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

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
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
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

            setNotification(`Updated ${updatedPerson.name}'s phone number`);
            setNotificationType("success");
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              setNotification(
                `The information for ${existingPerson.name} has already been removed from the server.`
              );
              setNotificationType("error");
              setPersons(persons.filter((person) => person.id !== id));
            } else {
              setNotification(`Error updating ${existingPerson.name}`);
              setNotificationType("error");
            }
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            // alert(
            //   `The information for ${existingPerson.name} has already been removed from the server.`
            // );
            // setPersons(persons.filter((person) => person.id !== id)); // Update the state in case of error
          });
      }
      console.log("Person Updated to server");
      console.log(personObject);
    } else {
      personService.create(personObject).then((NewPerson) => {
        setPersons(persons.concat(NewPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${NewPerson.name}`);
        setNotificationType("success");
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
          setNotification(
            `Information of ${name} has already removed from the server.`
          );
          setNotificationType("success");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch((error) => {
          setNotification(`Error deleting ${name}`);
          setNotificationType("error");
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          // alert(`The person ${name} was already deleted from the server.`);
          // setPersons(persons.filter((person) => person.id !== id)); // Update the state in case of error
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
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new person</h2>
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
