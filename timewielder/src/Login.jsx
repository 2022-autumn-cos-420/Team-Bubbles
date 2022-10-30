import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import CalendarPage from "./Calendar";
import database from './store.js';

function LoginForm() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const errors = {
    uname: "invalid username",
    pass: "invalid password"
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

    // JSX code for login form
    const renderForm = (
        <div className="form">
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
            {!isSubmitted && <div className="title">Sign In (right now can only log in with "user1 and pass1")</div>}
            {isSubmitted ? <CalendarPage /> : renderForm}
      </div>
    )
}

export default LoginForm