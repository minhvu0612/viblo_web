import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./post.scss";
import { useEffect, useState } from 'react';
import { onAddCmt, onLoadCmt } from '../api/cmt_api';
import Cmt from './cmt';

function PostHome(props){

    const [like, setLike] = useState("like");
    const [liked, setLiked] = useState("disable");
    const [all_cmt, setAllCmt] = useState([]);
    const [cmt, setCmt] = useState("");
    const [state, setState] = useState("true");

    useEffect(() => {
        async function fetchCmt(){
            await onLoadCmt().then(
                res => {
                    setAllCmt(res.data);
                    console.log(res.data);
                }
            )
        }
        if (state === "true"){
            fetchCmt();
        }
        setState("false");
    });

    const handleCmt = async () => {
        const data = {
            user_id: localStorage.getItem("id"),
            post_id: props.p.id,
            content: cmt,
            time: null,
        }

        await onAddCmt(data).then(
            res => {
                console.log("successfully!");
            }
        )
        setState("true");
        setCmt("");
    }

    return (
        <div className="post--home">
            <div className="post--user--infor">
                {
                    (props.p.avatar !== null && props.p.avatar !== "")?(
                        <img src={props.p.avatar} alt="avatar" className="post--avatar" />
                    ):(
                        <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg" 
                        alt="avatar" className="post--avatar" />
                    )
                }
                <h1 onClick={() => {
                    window.location.href = "/user/" + props.p.userId;
                }}>{props.p.username}</h1>
            </div>
            <div className="post--content">
                <p>{props.p.content}</p>
                <div className="post--div--img">
                    <img src={props.p.img} alt="image" className="post--img" />
                </div>
                <hr />
                <div className="post--like">
                    <button onClick={() => {setLike("disable"); setLiked("liked")}} className={like}><ThumbUpOutlinedIcon />  Like</button>
                    <button onClick={() => {setLiked("disable"); setLike("like")}} className={liked}><ThumbUpIcon />  Like</button>
                    <button><ChatBubbleOutlineIcon />  Comment</button>
                </div>
                <div className="post--comment">
                    {
                        (localStorage.getItem("avatar") !== null && localStorage.getItem("avatar") !== "")?(
                            <img src={localStorage.getItem("avatar")} alt="avatar" className='post--cur--avatar' />
                        ):(
                            <img src="https://res.cloudinary.com/diw0u2vl1/image/upload/v1641639419/default_avatar/mnuue0txf2qv1zhpsbno.jpg"
                            alt="avatar" className='post--cur--avatar' />
                        )
                    }
                    <textarea className="post--comment--input" placeholder="Viết bình luận ..." value={cmt}
                     onChange={(e) => setCmt(e.target.value)}></textarea>
                    {
                        (cmt === "")?(
                            <button className='post--btn1' disabled>Đăng</button>
                        ):(
                            <button className='post--btn' onClick={() => handleCmt()}>Đăng</button>
                        )
                    }
                </div>
                <div className="post--show--cmt">
                    {
                        all_cmt ? (
                            all_cmt.map((val, key) => {
                                if (val.postId == props.p.id){
                                    return <Cmt val = {val} />
                                }
                            })
                        ):null
                    }
                </div>
            </div>
        </div>
    );
}

export default PostHome;