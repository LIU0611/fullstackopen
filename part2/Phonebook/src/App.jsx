import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './Notification';
import personsService from '../services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            setNotification({ message: `Updated ${newName}`, type: 'success' });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          })
          .catch(error => {
            setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' });
            setPersons(persons.filter(person => person.id !== existingPerson.id));
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          });
      }
    } else {
      personsService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotification({ message: `Added ${newName}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch(error => {
        setNotification({ message: `Failed to add ${newName}`, type: 'error' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setNotification({ message: `Deleted ${name}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      })
      .catch(error => {
        setNotification({ message: `Failed to delete ${name}`, type: 'error' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
