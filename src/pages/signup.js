
import { useState } from 'react';
import Cookies from "js-cookie";
import { onAddUser } from '../api/user_api';
import './signup.scss';
import { setLocal } from '../component/data_local';



function Signup(){

    const [username, setName] = useState('');
    const [password, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');

    // set alert
    const [alert, setAlert] = useState('disable');

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            gender: gender,
            password: password,
        }
        console.log(data);
        await onAddUser(data).then(
           (res) => {
               if (res.data !== null && res.data !== ""){
                   Cookies.set("user", res.data);
                   setLocal(res.data);
                   window.location.href = "/";
               }
               else{
                   setAlert("alert");
                   setTimeout(() => {
                       setAlert("disable");
                   }, 2000);
               }
           }
        )
    }

    return(
        <div className="signup">
            <form className="signup--form" onSubmit={(e) => handleSignup(e)}>
                <label>Username:</label><br />
                <input type="text" onChange={(e) => setName(e.target.value)} /><br />
                <label>Email:</label><br />
                <input type="email" onChange={(e) => setEmail(e.target.value)} /><br />
                <label>Gender:</label><br />
                <select onChange={(e) => setGender(e.target.value)}>
                    <option value="male" selected>Male</option>
                    <option value="female">Female</option>
                </select><br />
                <label>Password:</label><br />
                <input type="password" onChange={(e) => setPass(e.target.value)} /><br />
                <label>Confirm:</label><br />
                <input type="password" /><br />
                <button>Signup</button>
                <p>Bạn đã có tài khoản? <span onClick={() => {window.location.href = "/login"}}>Đăng nhập</span></p>
            </form>
            <div className={alert}>Tên người dùng hoặc email đã được sử dụng</div>
        </div>
    )
}

export default Signup;