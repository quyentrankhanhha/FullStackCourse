import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Result from "./components/Result";
import Notification from "./components/Notification";
import phoneService from "./services/phoneNumber";

export default function App() {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [search, setSearch] = useState("");
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  // get all data
  useEffect(() => {
    phoneService
      .getAll()
      .then((res) => {
        setPersons(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // search function
  const filtered = search.length
    ? persons.filter((person) => {
        return person.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      })
    : [];

  const searchOnChange = (event) => {
    setSearch(event.target.value);
  };

  const nameHandleOnChange = (event) => {
    setNewName(event.target.value);
  };

  const phoneHandleOnChange = (event) => {
    setNewPhone(event.target.value);
  };

  // add new contact
  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).indexOf(newName) >= 0) {
      window.confirm(
        newName +
          " is already added to phonebook, replace the old number with a new one?"
      );
      const contact = persons.find((person) => person.name === newName);
      const changeContact = { ...contact, number: newPhone };
      phoneService
        .update(contact.id, changeContact)
        .then((response) => {
          console.log(response);
          setPersons(
            persons.map((person) =>
              person.id !== contact.id ? person : response.data
            )
          );
          setMessage("Changed " + contact.name);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setColor("green");
        })
        .catch((err) => {
          setMessage(
            "Information of " + newName + " has already removed from the server"
          );
          setColor("red");
        });
    } else {
      const phoneNumberObject = {
        name: newName,
        number: newPhone,
        id: Math.random() * 10
      };
      phoneService.create(phoneNumberObject).then((res) => {
        setPersons(persons.concat(res.data));
        setMessage("Add " + newName);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
        setColor("green");
      });
    }
  };

  // delete a contact
  const remove = (event) => {
    var confirmation = window.confirm(`Delete ${event.target.value}?`);
    console.log(event.target);
    if (confirmation === true) {
      phoneService
        .del(event.target.id)
        .then((res) => console.log(res))
        .catch((err) => {
          alert(`Delete ${event.target.value}?`);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message !== "" ? (
        <Notification color={color} message={message}></Notification>
      ) : (
        <></>
      )}

      <Filter searchOnChange={searchOnChange}></Filter>
      {filtered.length === persons.length ? (
        <></>
      ) : (
        <Result filtered={filtered}></Result>
      )}
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        handleSubmit={handleSubmit}
        nameHandleOnChange={nameHandleOnChange}
        phoneHandleOnChange={phoneHandleOnChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons remove={remove} persons={persons}></Persons>
    </div>
  );
}
