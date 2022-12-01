import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import LoginForm from  "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";
import CalendarPage from "./Calendar.jsx";

import {auth, db} from "./firebase-config.tsx";
import {addDoc, collection} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';
import {useSignInWithGoogle} from "react-firebase-hooks/auth";

function App() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registered, setRegister] = useState(false);

  return (
    <div className="app">
      <div className="LoginArea">
        {user ? (
          <div>
            {user.user.displayName}
            <CalendarPage user={user}></CalendarPage>
          </div>
        ) : (
          <div>
            Not Logged In
            <button onClick={() => signInWithGoogle()}>Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;