import axios from 'axios';

export const onAddUser = (data) => axios.post("http://localhost:8080/users/add", data);
export const onGetUserLogin = (data) => axios.post("http://localhost:8080/users/get", data);
export const onGetAll = () => axios.get("http://localhost:8080/users/load_all");
export const onUpdateData = (data) => axios.post("http://localhost:8080/users/update", data);
export const onGetUser = (id) => axios.get("http://localhost:8080/users/get/" + id);