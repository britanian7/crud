import React, { useEffect, useState } from "react";
import "./App.css";
import useCrud from "./hooks/useCrud";
import UserCard from "../components/UserCard";
import FormUser from "../components/FormUser";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

function App() {
  const [users, getUsers, postUser, deleteUser, updateUser] =
    useCrud("/users/");
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div>
      <div className="header">
        <h1 className="title-header">CRUD de Usuarios</h1>
      </div>
      <div className="container">
        <div className="user-list">
          {users && users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                setEditingUser={setEditingUser}
                setShowForm={setShowForm}
              />
            ))
          ) : (
            <p className="message-init">No hay usuarios disponibles.</p>
          )}
        </div>
      </div>

      <button className="floating-button" onClick={handleShowForm}>
        +
      </button>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseForm}>
              &times;
            </button>
            <FormUser
              postUser={postUser}
              updateUser={updateUser}
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              handleCloseForm={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
