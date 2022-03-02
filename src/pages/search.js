import { useEffect, useState } from "react";
import Menu from "../component/menu";
import Sidebar from "../component/sidebar";

import "../pages/search.scss";

function Search(){

    const [s_value, setSValue] = useState("");
    const [s_account, setSAccount] = useState([]);
    const [s_post, setSPost] = useState([]);

    useEffect(() => {
        setSValue(localStorage.getItem("s_value"));
        async function fetchSA(){
            
        }
        async function fetchSP(){

        }
    },[]);

    return (
        <div className="search">
            <Menu />
            <div className="search--container">
                <Sidebar />
                <div className="search--main">
                    <div className="search--main--child">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;