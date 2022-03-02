import axios from "axios";
import { useState } from "react";
import { onAddPost } from "../api/post_api";
import Menu from "../component/menu";
import "./post.scss";

function Post(){
     // set file
     const [file, setFile] = useState('');
     const [fix_avatar, setFix] = useState(null);
     // change file
     const [changeFile, setChange] = useState('disable');
     const [upload_img, setUpload] = useState('disable');
 
 
     const uploadAvatar = () => {
         var x = document.getElementById("upload--file");
         x.click();
     }
 
     const uploadImg = async (file) => {
         const form = new FormData();
         form.append("file", file);
         form.append("upload_preset", "dlqrxovd");
         await axios.post("https://api.cloudinary.com/v1_1/diw0u2vl1/image/upload", form).then(
           (response) => {
               // console.log(response);
               setFix(response.data.url);
           }
         )
     }

     // set discription
     const [dis, setDis] = useState();

     const update = async () => {
         const data = {
             user_id: localStorage.getItem("id"),
             content: dis,
             img: fix_avatar,
         }
         await onAddPost(data).then(
             res => {
                 console.log(res);
                 window.location.href = "/";
             }
         )
     }

    return (
        <div className="post">
           <Menu />
           <div className="post--main">
              <div className="post--child">
                  <h1>Hãy chia sẻ những cảm xúc của bạn!</h1>
                  <textarea placeholder="Hãy viết gì đó ..." onChange={(e) => setDis(e.target.value)}></textarea>
                   <div className="post--content" onClick={() => uploadAvatar()}>
                        <p>
                            Chọn ảnh từ thiết bị của bạn(PNG, WEBP, JPEG)
                        </p>
                        <input type="file" hidden id="upload--file" 
                                accept="image/png, image/jpeg, image/webp, image/jpg" 
                                onChange={(e) => {
                                    setFile(e.target.files[0].name);
                                    uploadImg(e.target.files[0]);
                                    setChange('change--file');
                                    setUpload('img--upload');
                                }} />
                        <button className='setting--btn--upload'>Choosen a file</button>
                        <div className={changeFile}>
                            <h2 className='file--name'>{file}</h2>
                            <h2 className='change'>Thay đổi avatar</h2>
                        </div>
                        <img className={upload_img} src={fix_avatar} alt="" />
                   </div>
                   <div className="post--submit--clear">
                       <button>Hủy</button>
                       <button onClick={() => update()}>Đăng</button>
                   </div>
              </div>
           </div>
        </div>
    );
}

export default Post;