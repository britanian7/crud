import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./styles/FormUser.css";

const FormUser = ({
  postUser,
  updateUser,
  editingUser,
  setEditingUser,
  handleCloseForm,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (editingUser) {
      Object.keys(editingUser).forEach((key) => {
        setValue(key, editingUser[key]);
      });
    } else {
      reset();
    }
  }, [editingUser, reset, setValue]);

  const submit = (data) => {
    if (
      !data.first_name ||
      !data.last_name ||
      !data.email ||
      !data.password ||
      !data.birthday ||
      !data.image_url
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos antes de enviar.",
        icon: "warning",
      });
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, data);
      setEditingUser(null);
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "Haz actualizado la información del usuario.",
        icon: "success",
      });
    } else {
      postUser(data);
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "Haz añadido un nuevo usuario.",
        icon: "success",
      });
    }
    reset();
    handleCloseForm();
  };

  const handleCancel = () => {
    reset();
    handleCloseForm();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="user-form">
      <div>
        <h2 className="title-form">Formulario</h2>
      </div>
      <input type="text" {...register("first_name")} placeholder="Nombre" />
      <input type="text" {...register("last_name")} placeholder="Apellido" />
      <input
        type="email"
        {...register("email")}
        placeholder="Correo Electrónico"
      />
      <input
        type="password"
        {...register("password")}
        placeholder="Contraseña"
      />
      <input
        type="date"
        {...register("birthday")}
        placeholder="Fecha de Nacimiento"
      />
      <input
        type="text"
        {...register("image_url")}
        placeholder="URL de foto de perfil"
      />
      <button type="submit">
        {editingUser ? "Actualizar Usuario" : "Añadir Usuario"}
      </button>
      {editingUser && (
        <button type="button" onClick={handleCancel}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default FormUser;
