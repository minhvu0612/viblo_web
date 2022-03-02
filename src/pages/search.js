import { useEffect, useState } from "react";
import { searchPost, searchUser } from "../api/search_api";
import Menu from "../component/menu";
import PostHome from "../component/post_home";
import Sidebar from "../component/sidebar";

import "../pages/search.scss";

function Search(){

    const [s_account, setSAccount] = useState([]);
    const [s_post, setSPost] = useState([]);
    const [s_p1, setSP1] = useState("s--p1");
    const [s_p, setSP] = useState("s--p");
    const [s_acc, setSAcc] = useState("s--acc");
    const [s_pst, setSPST] = useState("disable");

    useEffect(() => {
        async function fetchSA(){
            await searchUser(localStorage.getItem("s_value")).then(
                res => {
                    console.log(res.data);
                    setSAccount(res.data);
                }
            )
        }
        async function fetchSP(){
            await searchPost(localStorage.getItem("s_value")).then(
                res => {
                    console.log(res.data);
                    setSPost(res.data);
                }
            )
        }
        fetchSA();
        fetchSP();
    },[]);

    const Div = (val) => {
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
    }

    return (
        <div className="search">
            <Menu />
            <div className="search--container">
                <Sidebar />
                <div className="search--main">
                    <div className="search--main--child">
                        <p className={s_p} id="p1" onClick={() => {
                            document.getElementById("p1").className = "s--p";
                            document.getElementById("p2").className = "s--p1";
                            setSAcc("s--acc");
                            setSPST("disable");
                        }}>Account</p>
                        <p className={s_p1} id="p2" onClick={() => {
                            document.getElementById("p2").className = "s--p";
                            document.getElementById("p1").className = "s--p1";
                            setSAcc("disable");
                            setSPST("s--pst");
                        }}>Post</p>
                    </div>
                    <div className={s_acc}>
                        {
                        s_account?(
                            s_account.map((val,key) => Div(val))
                        ):null
                        }
                    </div>
                    <div className={s_pst}>
                        {
                            s_post?(
                                s_post.map((val,key) => {
                                    return <PostHome p = {val} />
                                })
                            ):null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;