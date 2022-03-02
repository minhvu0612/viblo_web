import { useEffect, useState } from "react";
import { onGetAll } from "../api/user_api";

import './sidebar.scss';

function Sidebar(){
    const [all_user, setAllUser] = useState([]);

    useEffect(() => {
        async function fetchAllUser(){
            await onGetAll().then(
                res => {
                    console.log(res.data);
                    setAllUser(res.data);
                }
            )
        }
        fetchAllUser();
    },[]);

    return(
        <div className="sidebar">
            <h1>Bạn có thể biết?</h1>
            {
                all_user?(
                   all_user.map((val,key) => {
                       if (val.id != localStorage.getItem("id")){
                        if (val.avatar !== null && val.avatar !== ""){
                            return(
                                <div className="sidebar--user" onClick={() => {window.location.href = "/user/"+val.id}}>
                                    <div className="sidebar--user--infor">
                                        <img src={val.avatar}
                                        alt="avatar" className="sidebar--avatar" />
                                        <p>{val.username}</p>
                                    </div>
                                </div>
                            );
                        }
                        else{
                            return(
                                <div className="sidebar--user" onClick={() => {window.location.href = "/user/"+val.id}}>
                                    <div className="sidebar--user--infor">
                                        <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg" 
                                        alt="avatar" className="sidebar--avatar" />
                                        <p>{val.username}</p>
                                    </div>
                                </div>
                            );
                        }
                        }  
                   })
                ):null
            }
        </div>
    );
}

export default Sidebar;