import axios from 'axios';

export const onAddPost = (data) => axios.post("http://localhost:8080/posts/add", data);
export const onLoadAllPost = () => axios.get("http://localhost:8080/posts/load_all");
export const onLoadPostByUserId = (id) => axios.get("http://localhost:8080/posts/load/users/" + id);