import React from "react";
import "./styles/UserCard.css";
import Swal from "sweetalert2";

const UserCard = ({ user, deleteUser, setEditingUser, setShowForm }) => {
  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este usuario?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.id);
        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Cancelado",
          text: "¡El usuario no se eliminó!",
          icon: "info",
        });
      }
    });
  };

  const handleEdit = () => {
    setEditingUser(user);
    setShowForm(true);
  };

  return (
    <div className="user-item">
      {user.image_url && (
        <img
          src={user.image_url}
          alt={`${user.first_name} ${user.last_name}`}
          className="user-image"
        />
      )}
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>Correo: {user.email}</p>
      <p>Fecha de Nacimiento: {user.birthday}</p>
      <div className="button-container">
        <button className="buttonEdit" onClick={handleEdit}>
          <i className="bx bxs-edit"></i>
        </button>
        <button onClick={handleDelete} className="delete">
          <i className="bx bx-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default UserCard;
