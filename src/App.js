import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Setting from './pages/setting';
import Post from './pages/post';
import { useEffect, useState } from 'react';
import { onGetAll } from './api/user_api';
import User from './pages/personal';
import Search from './pages/search';

function App() {

  const [all_user, setAllUser] = useState([]);

  useEffect(() => {
      async function fetchAllUser(){
          await onGetAll().then(
              res => {
                  //console.log(res.data);
                  setAllUser(res.data);
              }
          )
      }
      fetchAllUser();
  },[]);

  return (
    <div className="App">
     <Router>
       <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         <Route exact path="/setting" element={<Setting />} />
         <Route exact path="/post" element={<Post />} />
         {
           all_user ? (
             all_user.map((val,key) => {
               return <Route exact path={"/user/" + val.id} element={<User u = {val} />} />
             })
           ):null
         }
         <Route exact path="/search" element={<Search />} />
       </Routes>
     </Router>
    </div>
  );
}

export default App;
