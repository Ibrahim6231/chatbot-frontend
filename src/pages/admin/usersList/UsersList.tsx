import React, { useEffect, useState } from 'react'
import MuiCustomizedTables from '../../../components/common/MuiTable/MuiTable'
import { deleteUserApi, getUsersByPagination, updateUserApi } from '../../../api/user';
import toast from 'react-hot-toast';

const columns = {
    "name": "Name",
    "role": "User Role",
    "email": "Email Id",
    "status": "Status"
};
const UsersList = () => {

    const [usersList, setUsersList] = useState<any[]>([]);

    const updateUserState = async () => {
        const respUsers = await getUsersByPagination({});
        if (respUsers?.length) {
            respUsers.forEach(ele => {
                ele.name = ele.name.first + (ele.name.last || "");
                ele.status = ele.isDeleted ? "Deleted" : "Active"
            })
            setUsersList(respUsers);
        }
    }
    useEffect(() => {
        updateUserState();
    }, [])

    const handleUserUpdate = async (user) => {
        const newRole = user.role === "User" ? "Admin" : "User";
        const isConfirm = window.confirm(`Are you sure to change ${user.name} role from 
            ${user.role} to -> ${newRole}
        `)
        if (isConfirm) {
            const updatedUser = await updateUserApi(user?._id, {role: newRole});
            if (updatedUser) {
                await updateUserState();
                toast.success("User updated!");
            }
        }
    }
    const handleUserDelete = async (user) => {
        const isConfirm = window.confirm(`Are you sure to delete ${user.name}, ${user.email} ?`)
        if (isConfirm) {
            const deletedUser = await deleteUserApi(user?._id);
            if (deletedUser) {
                await updateUserState();
                toast.success("User deleted!");
            }
        }
    }

    const handleClickAction = (user, actionCase) => {
        switch (actionCase) {
            case "update": {
                handleUserUpdate(user);
                break;
            }
            case "delete": {
                handleUserDelete(user);
                break;
            }
        }

    }
    return (
        <div>
            <MuiCustomizedTables columns={columns} rows={usersList} handleClickAction={handleClickAction} />
        </div>
    )
}

export default UsersList