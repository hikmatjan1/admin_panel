import React, { useCallback, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config";
import { setLogOut } from "../../../store/action";

const DeleteUser = ({ currentUser, user, setUsers }) => {
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });

    // delete user
    const deleteHandler = useCallback(async (userItem) => {
        try {
            const res = await axiosInstance.delete(`users/${userItem._id}/${currentUser._id}`);
            if (res.data) {
                if (res.data === "noData") {
                    setLogOut();
                    localStorage.removeItem('user');
                    navigate("/login");
                } else {
                    if (res.data._id === currentUser._id) {
                        setLogOut();
                        navigate("/login");
                    } else {
                        setDeleteModal({ open: false, obj: {} });
                        setUsers(prev => {
                            return prev.filter(item => item._id !== userItem._id);
                        })
                    }
                }
            } else {
                navigate("/blocked");
            }
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id, setUsers]);

    return (
        <>
            <AiOutlineDelete className="deleteIcon" onClick={() => setDeleteModal({ open: true, obj: user })} />

            {deleteModal.open && (
                <div className="delete_user_modal_container">
                    <div className="delete_user_modal_wrapper">
                        <span>Are you sure you want to delete this user?</span>
                        <div className="delete_user_btns">
                            <button type="button" onClick={() => setDeleteModal({ open: false, obj: {} })}>Cancel</button>
                            <button type="button" onClick={() => deleteHandler(deleteModal.obj)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default React.memo(DeleteUser);