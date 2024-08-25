import { toast } from "react-hot-toast";
import { Axios } from "./axios";

const GROUP_URL = "group";
const END_POINT = {
    create: `${GROUP_URL}/create`,
    getList: `${GROUP_URL}/list`,
     
}
const createGroupApi = async (name: string, usersId: Array<string>,) => {
    try {
        const data = await Axios.post(END_POINT.create, { name, usersId });
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Failed to fetch user details: " + err?.response?.data?.message || err.message);
    }
}

const getGroupListApi = async () => {
    try {
        const data = await Axios.get(END_POINT.getList);   //no need to pass user id, as user token will provide that
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Failed to fetch user details: " + err?.response?.data?.message || err.message);
    }
}

export {
    createGroupApi,
    getGroupListApi
}