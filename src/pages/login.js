import Cookies from 'js-cookie';
import { useState } from 'react';
import { onGetUserLogin } from '../api/user_api';
import { setLocal } from '../component/data_local';

import './login.scss';

function Login(){

    const [username, setName] = useState('');
    const [password, setPass] = useState('')

    // set alert
    const [alert, setAlert] = useState('disable');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
        }
       await onGetUserLogin(data).then(
           (res) => {
                if (res.data !== null && res.data !== ""){
                    //console.log(res.data);
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
        <div className="login">
            <form className="login--form" onSubmit={handleLogin}>
                <label>Username:</label><br />
                <input type="text" onChange={(e) => setName(e.target.value)} /><br />
                <label>Password:</label><br />
                <input type="password" onChange={(e) => setPass(e.target.value)} /><br />
                <button>Login</button>
                <p>Bạn chưa có tài khoản? <span onClick={() => {window.location.href = "/signup"}}>Đăng ký</span></p>
                <div className={alert}>Tên đăng nhập hoặc mật khẩu sai</div>
            </form>
        </div>
    )
}

export default Login;