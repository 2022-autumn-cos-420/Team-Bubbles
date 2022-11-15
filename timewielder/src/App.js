import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import database from "./store.js";

function LoginForm({errorMessages, setErrorMessages, isSubmitted, setIsSubmitted, registered, setRegister}) {

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const handleRegister = (event) => {
    setRegister(!registered);
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <div className="title">
          Sign In (right now can only log in with "user1 and pass1")
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login-form">
      {renderForm}
      <button onClick={handleRegister}>Don't have an account? Register here.</button>
    </div>
  );
}

function RegisterForm({isSubmitted, setIsSubmitted, registered, setRegister}) {
  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    const userData = new Object((uname.value,pass.value));
    console.log(uname.value, pass.value); 
    database.push(userData);

    setRegister(!registered);
  };

  // JSX code for login form
  const renderForm = (
    <><h2>Enter a username and password to register</h2><div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div></>
  );

  return (
    <div className="register-form">
      {!isSubmitted && (
        <div className="title">
          {renderForm}
        </div>
      )}
    </div>
  );
}

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  const renderForm = (
    <div className="app">
      <h1 className="text-center">Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} selectRange={true} />
      </div>
      {date.length > 0 ? (
        <p className="text-center">
          <span className="bold">Start:</span> {date[0].toDateString()}
          &nbsp;|&nbsp;
          <span className="bold">End:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className="text-center">
          <span className="bold">Default selected date:</span>{" "}
          {date.toDateString()}
        </p>
      )}
    </div>
  );

  return <div className="calendar-form">{renderForm}</div>;
}

function App() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registered, setRegister] = useState(false);

  return (
    <div className="app">
      {!registered && !isSubmitted && <LoginForm errorMessages={errorMessages} setErrorMessages={setErrorMessages} isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} registered={registered} setRegister={setRegister} />}
      {registered && <RegisterForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} registered={registered} setRegister={setRegister}/>}
      {!registered && isSubmitted && <CalendarPage />}
    </div>
  );
}

export default App;