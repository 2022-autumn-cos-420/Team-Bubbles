import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./App.css";

import {auth, db} from "./firebase-config.tsx";
import {addDoc, collection} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';
import TaskForm from "./TaskForm";

function AddToDatabase({user}) {
  const [textData, setTextData] = useState(String(""));

  return (
    <div>
      <textarea value = {textData} onChange={e=>setTextData(e.target.value)}></textarea>
      <button onClick={()=>{
        addDoc(collection(db, 'tasks'), {
          userId: user.user.displayName,
          information: textData
        })
      }}>Send to Database</button>
    </div>
  )
}



function CalendarPage({user}) {
  const [value, loading, error] = useCollection(collection(db, 'tasks'));
  const [date, setDate] = useState(new Date());

  const renderForm = (
    <div className="app">
      <h1 className="text-center">{user.user.displayName}'s Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );

  return <div className="calendar-form">{renderForm}
  <div className="tasklist">
    <div className="taskListHeader">Tasks for {date.toDateString().substring(4)}</div>

    <div className="DatabaseInfo">
      {value ? (
        <div>
          {}
          {value.docs.filter((obj) => obj.data().user === user.user.displayName && date.toDateString() == obj.data().date).map((obj) => (
            <div>
              <div>{obj.data().title}</div>
              <div>{obj.data().body}</div>
              <button>{obj.data().done}</button>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Data...</div>
      )}
    </div>
  </div>
  <TaskForm user={user} date={date}/>
  </div>;
}

export default CalendarPage;
