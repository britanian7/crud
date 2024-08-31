import axios from "axios";
import { useState } from "react";

const useCrud = (path) => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://users-crud.academlo.tech";

  const getData = () => {
    const url = `${BASE_URL}${path}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data);
        setError(null);
      })
      .catch((err) => {
        setError("Error fetching data.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const postData = (data) => {
    const url = `${BASE_URL}${path}`;
    axios
      .post(url, data)
      .then((res) => {
        setResponse((prev) => [...prev, res.data]);
        setError(null);
      })
      .catch((err) => {
        setError("Error posting data.");
        console.error(err);
      });
  };

  const deleteData = (id) => {
    const url = `${BASE_URL}${path}${id}/`;
    axios
      .delete(url)
      .then(() => {
        setResponse((prev) => prev.filter((item) => item.id !== id));
        setError(null);
      })
      .catch((err) => {
        setError("Error deleting data.");
        console.error(err);
      });
  };

  const updateData = (id, data) => {
    const url = `${BASE_URL}${path}${id}/`;
    axios
      .put(url, data)
      .then((res) => {
        setResponse((prev) =>
          prev.map((item) => (item.id === id ? res.data : item))
        );
        setError(null);
      })
      .catch((err) => {
        setError("Error updating data.");
        console.error(err);
      });
  };

  return [response, getData, postData, deleteData, updateData, loading, error];
};

export default useCrud;
