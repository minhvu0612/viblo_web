import { useEffect, useState } from "react";
import { onLoadPostByUserId } from "../api/post_api";
import Menu from "../component/menu";
import PostHome from "../component/post_home";
import Sidebar from "../component/sidebar";


import "./home.scss";

function User(props){

    const [user, setUser] = useState(props.u);
    const [user_post, setUPost] = useState([]);

    useEffect(() => {
        async function fetchUPost(){
            await onLoadPostByUserId(user.id).then(
                res => {
                    res.data.forEach(val => {
                        val.username = user.username;
                        val.avatar   = user.avatar;
                    });
                    setUPost(res.data);
                }
            )
        }
        fetchUPost();
    }, []);

    return(
        <div className="home">
            <Menu />
            <div className="home--container">
                <Sidebar />
                <div className="home--main">
                    <div className="current--user">
                        {
                            (user.avatar !== null && user.avatar !== "")?(
                                <img src={user.avatar} alt="avatar" />
                            ):(
                                <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg"
                                alt="avatar" />
                            )
                        }
                        <h1>{user.username}</h1>
                    </div>
                    <div className="home--main--child">
                    {
                        user_post ? (
                            user_post.map((val,key) => {
                                return <PostHome p = {val} />
                            })
                        ):null
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;