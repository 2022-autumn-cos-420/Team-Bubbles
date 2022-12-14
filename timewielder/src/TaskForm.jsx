import React, { useState } from "react";
import {auth, db} from "./firebase-config.tsx";
import { addDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "react-bootstrap";

function TaskForm({user, date}) {

    const handleSubmit = (event) => {
        event.preventDefault();

        var { taskName, taskDescription } = document.forms[0];
        console.log(taskName.value, taskDescription.value);
        addDoc(collection(db, "tasks"), {
            user: user.user.displayName,
            body: taskDescription.value,
            date: date.toDateString(),
            title: taskName.value,
            done: "not done"
        })
    };

    const renderTaskForm = (
        <><h2>Task Information Form</h2><div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Task Name</label>
                    <input type="text" name="taskName" required />
                </div>
                <div className="input-container">
                    <label>Task Description</label>
                    <input type="text" name="taskDescription" required />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div></>
    );

    return (
        <div className="register-form">
            <div className="title">
                {renderTaskForm}
            </div>
        </div>
    );
}

export default TaskForm;