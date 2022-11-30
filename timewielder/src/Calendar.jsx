import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

import {auth, db} from "./firebase-config.tsx";
import {addDoc, collection} from "firebase/firestore";
import {useCollection} from 'react-firebase-hooks/firestore';

function AddToDatabase() {
  const [textData, setTextData] = useState(String(""));

  return (
    <div>
      <textarea value = {textData} onChange={e=>setTextData(e.target.value)}></textarea>
      <button onClick={()=>{
        addDoc(collection(db, 'test_collection'), {
          userId: "User1",
          information: textData
        })
      }}>Send to Database</button>
    </div>
  )
}

function DatabaseContainer() {
  const [value, loading, error] = useCollection(collection(db, 'test_collection'));

  return (
    <div className="DatabaseInfo">
      {value ? (
        <div>
          {value.docs.map((obj) => (
            <div>
              <div>User: {obj.data().userId}</div>
              <div>Data: {obj.data().information}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Data...</div>
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

  return <div className="calendar-form">{renderForm}
  <AddToDatabase></AddToDatabase>
  <DatabaseContainer></DatabaseContainer>
  </div>;
}

export default CalendarPage;
