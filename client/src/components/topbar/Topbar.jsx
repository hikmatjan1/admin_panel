import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { setLogOut } from "../../store/action";
import './topbar.css';

const Topbar = () => {
    const navigate = useNavigate();

    const exit = () => {
        setLogOut();
        navigate("/login");
    }

    return (
        <div className="topbar">
            <div className="container">
                <div className="topbar_wrapper">
                    <h5>Admin Dashboard</h5>
                    <span onClick={exit}>Exit <FaSignOutAlt /></span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Topbar);