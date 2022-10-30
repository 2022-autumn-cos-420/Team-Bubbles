import React, { useState } from "react";
import ReactDOM from "react-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import "./App.css";

function CalendarPage() {

    const [date, setDate] = useState(new Date());
    
    const renderForm = (
        <div className='app'>
        <h1 className='text-center'>Calendar</h1>
        <div className='calendar-container'>
          <Calendar
            onChange={setDate}
            value={date}
            selectRange={true}
          />
        </div>
        {date.length > 0 ? (
          <p className='text-center'>
            <span className='bold'>Start:</span>{' '}
            {date[0].toDateString()}
            &nbsp;|&nbsp;
            <span className='bold'>End:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className='text-center'>
            <span className='bold'>Default selected date:</span>{' '}
            {date.toDateString()}
          </p>
        )}
      </div>
    );

    return (
        <div className="calendar-form">
            { renderForm }
      </div>
    )
}

export default CalendarPage