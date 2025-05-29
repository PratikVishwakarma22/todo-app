import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState("all");

  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const newTask = [...tasks];
    newTask[index].completed = !newTask[index].completed;
    setTasks(newTask);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const startEditing = (index, text) => {
    setEditIndex(index);
    setEditedText(text);
  };

  const handleSaveEdit = (index) => {
    const updated = [...tasks];
    updated[index].text = editedText;
    setTasks(updated);
    setEditIndex(null);
    setEditedText("");
  };

  return (
    <div>
      <header>
        <h1>My To-Do List</h1>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>

        <div>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        <ul>
          {tasks
            .filter((t, index) => {
              if (filter === "all") return true;
              if (filter === "completed") return t.completed;
              if (filter === "completed") return !t.completed;
            })
            .map((t, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <span
                      onClick={() => toggleTask(index)}
                      style={{
                        textDecoration: t.completed ? "line-through" : "none",
                        cursor: "pointer",
                      }}
                    >
                      {t.text}
                    </span>
                    <button onClick={() => startEditing(index, t.text)}>
                      Edit
                    </button>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                  </>
                )}
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
