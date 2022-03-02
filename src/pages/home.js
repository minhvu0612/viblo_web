import { useEffect, useState } from "react";
import { onLoadAllPost } from "../api/post_api";
import { onGetUser } from "../api/user_api";
import Menu from "../component/menu";
import PostHome from "../component/post_home";
import Sidebar from "../component/sidebar";


import './home.scss';

function Home(){

    const [all_post, setAllPost] = useState([]);

    useEffect(() => {
        async function fetchAllPost(){
            await onLoadAllPost().then(
                res => {
                    res.data.forEach(async (val) => {
                        await onGetUser(val.userId).then(
                            res1 => {
                                val.username = res1.data.username;
                                val.avatar   = res1.data.avatar;
                            }
                        )
                        //console.log(val);
                    });
                    setAllPost(res.data);
                }
            )
        }
        fetchAllPost();
    },[]);

    return(
        <div className="home">
            <Menu />
            <div className="home--container">
                <Sidebar />
                <div className="home--main">
                    <div className="home--main--child">
                    {
                        all_post ? (
                            all_post.map((val,key) => {
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

export default Home;