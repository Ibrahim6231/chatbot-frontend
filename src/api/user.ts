import { toast } from "react-hot-toast";
import { Axios } from "./axios";

const USER_URL = "user";
const END_POINT = {
    getAll: `${USER_URL}/all-names`,
}
const getAllUsersApi = async () => {
    try {
        const data = await Axios.get(END_POINT.getAll);
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Failed to fetch user details: " + err?.response?.data?.message || err.message);

    }
}

interface iGetUsersByPagination {
    page?: number,
    limit?: number,
    searchValue?: string,
    sort?: string
}
const getUsersByPagination = async ({ page, limit, sort, searchValue }: iGetUsersByPagination) => {
    try {
        const data = await Axios.get(`/admin/all`, {
            params: {
                page,
                limit,
                searchValue,
                sort
            }
        })
        return data?.data?.data?.[0]?.data;
    } catch (err: any) {
        toast.error("Failed to fetch user details: " + err?.response?.data?.message || err.message);

    }
}


const updateUserApi = async (id: string, updateFields: { [key: string]: string }) => {
    try {
        const data = await Axios.put(`/admin/user/${id}`, updateFields);
        return data?.data?.data;
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message);

    }
}
const deleteUserApi = async (id: string) => {
    try {
        const data = await Axios.delete(`/admin/user/${id}`);
        return data?.data?.data;
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message);

    }
}

export {
    getAllUsersApi,
    getUsersByPagination,
    deleteUserApi,
    updateUserApi
}