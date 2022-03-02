import { useState } from "react";
import Menu from "../component/menu";
import axios from "axios";

import "./setting.scss";
import { onUpdateData } from "../api/user_api";
import { setLocal } from "../component/data_local";


function Setting(){

    //set file
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
            //console.log(response);
            setFix(response.data.url);
          }
        )
    }


    // set infor
    const [username, setName] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [gender, setGender] = useState(localStorage.getItem("gender"));

    const update = async () => {
        const data = {
            username: username,
            email: email,
            gender: gender,
            avatar: fix_avatar,
        }
        await onUpdateData(data).then(
            (res) => {
                setLocal(res.data);
                window.location.href = "/";
            }
        )
    }

    return (
        <div className="setting">
           <Menu />
           <div className="setting--main">
               <div className="setting--child">
                   <div className="setting--avatar" onClick={() => uploadAvatar()}>
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
                   <div className="setting--infor">
                        <label>Username</label><br />
                        <input type="text" defaultValue={localStorage.getItem("username")} onChange={(e) => setName(e.target.value)} /><br />
                        <label>Email</label><br />
                        <input type="text" defaultValue={localStorage.getItem("email")} onChange={(e) => setEmail(e.target.value)} /><br />
                        <label>Gender</label><br />
                        <select defaultValue={localStorage.getItem("gender")} onChange={(e) => setGender(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                   </div>
               </div>
           </div>
           <div className="submit--clear">
                <button>Hủy</button>
                <button onClick={() => update()}>Chỉnh sửa</button>
            </div>
        </div>
    );
}

export default Setting;