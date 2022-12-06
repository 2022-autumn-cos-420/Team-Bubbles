import React, { useState } from "react";
import {auth, db} from "./firebase-config.tsx";
import { addDoc, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Button } from "react-bootstrap";

function TaskForm(user) {
    let IsCreatingTasks = false;
    const [ isCreatingTask, setIsCreatingTask ] = useState(IsCreatingTasks);
    
    function flipIsCreatingTasks() {
        setIsCreatingTask(!isCreatingTask);
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        var { taskName, taskDescription, dueDate } = document.forms[0];
        const taskData = new Object((taskName.Value, taskDescription.value, dueDate.value));
        console.log(taskName.Value, taskDescription.value, dueDate.value);
        addDoc(collection(db, "task-collection"), {
            userId: user.user.displayName,
            information: taskData
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
                    <label>Due Date</label>
                    <input type="date" name="dueDate" required />
                </div>
                <div className="input-container">
                    <label>Task Description</label>
                    <input type="text" name="taskDescription" required />
                </div>
                <div className="button-container">
                    <input type="submit" onClick={flipIsCreatingTasks} />
                </div>
            </form>
        </div></>
    );

    return (
        <div className="register-form">
            <div className="title">
                <Button onClick={flipIsCreatingTasks}>Create Task</Button>
                {isCreatingTask ? renderTaskForm : null}
            </div>
        </div>
    );
}

export default TaskForm;