import axios from "axios";

export const searchUser = (data) => axios.get("http://localhost:8080/users/search/" + data);
export const searchPost = (data) => axios.get("http://localhost:8080/posts/search/" + data);