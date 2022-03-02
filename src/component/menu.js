import { Link } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "./../assets/img/logo_viblo.svg";


// import style file
import './menu.scss';
import { useEffect, useState } from "react";
import { removeLocal } from "./data_local";

function Menu(){

    const [user_div, setDiv] = useState("disable");
    const [search_value, setSValue] = useState("");


    const handleLogout = (e) => {
        Cookies.remove("user");
        removeLocal();
        window.location.href = "/";
    }

    useEffect(() => {
        //console.log(Cookies.get("user").username);
        //console.log(Cookies.get("user"));
        console.log(localStorage);
    }, []);

    return(
        <div className="menu">
            <img src={logo} alt="logo" />
            <div className="menu--render--pages">
                {
                    (window.location.pathname === "/") ? (
                        <Link to="/" className="menu--link" style={{color: "black"}}>Home</Link>
                    ):(
                        <Link to="/" className="menu--link">Home</Link>
                    )
                }
                {
                    (window.location.pathname === "/post") ? (
                        <Link to="/post" className="menu--link" style={{color: "black"}}>Post</Link>
                    ):(
                        <Link to="/post" className="menu--link">Post</Link>
                    )
                }
            </div>
            <div className="menu--search">
                <input type="search" placeholder="Tìm kiếm trên Viblo" 
                value={search_value} 
                onChange={(e) => {setSValue(e.target.value); localStorage.setItem("s_value", e.target.value)}} />
                <button onClick={() => {window.location.href = "/search"}}>SE</button>
            </div>
            {
                (Cookies.get("user"))?(
                    <div className="menu--div--user">
                        {
                            (localStorage.getItem("avatar"))?(
                            <>
                            <img src={localStorage.getItem("avatar")} 
                             alt="avatar"
                             onClick={() => {
                                 if (user_div === "disable"){
                                     setDiv("menu--user");
                                 }
                                 else{
                                     setDiv("disable");
                                 }
                             }
                             } />
                            <div className={user_div}>
                                <div>
                                    <img src={localStorage.getItem("avatar")} alt="avatar" />
                                    <p>{localStorage.getItem("username")}</p>
                                </div>
                                <p style={{cursor: "pointer"}} onClick={() => {
                                    window.location.href = "/user/" + localStorage.getItem("id");
                                    //window.location.reload();
                                    }
                                    } className="user--menu--link">Personal</p>
                                <Link to="/setting" className="user--menu--link">Setting</Link>
                                <p onClick={(e) => handleLogout(e)} className="user--menu--link">Logout</p>
                            </div>
                            </>
                            ):(
                            <>
                            <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg" 
                             alt="avatar"
                             onClick={() => setDiv("menu--user")} />
                            <div className={user_div}>
                                <div>
                                    <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg" alt="avatar" />
                                    <p>{localStorage.getItem("username")}</p>
                                </div>
                                <p style={{cursor: "pointer"}} onClick={() => {
                                    window.location.href = "/user/" + localStorage.getItem("id");
                                    //window.location.reload();
                                    }
                                    } className="user--menu--link">Personal</p>
                                <Link to="/setting" className="user--menu--link">Setting</Link>
                                <p onClick={(e) => handleLogout(e)} className="user--menu--link">Logout</p>
                            </div>
                            </>
                            )
                        }
                    </div>
                ):(
                    <div className="menu--div--user">
                        <button onClick={() => {window.location.href = "/login"}}>Login</button>
                    </div>
                )
            }
        </div>
    )
}

export default Menu;