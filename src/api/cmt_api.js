import axios from "axios";

export const onAddCmt = (data) => axios.post("http://localhost:8080/cmts/add", data);
export const onLoadCmt = () => axios.get("http://localhost:8080/cmts/load/posts");