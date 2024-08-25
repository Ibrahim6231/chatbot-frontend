import { toast } from "react-hot-toast";
import { Axios } from "./axios";

const MESSAGE_URL = "message";
const END_POINT = {
    create: `${MESSAGE_URL}/create`,
    getList: `${MESSAGE_URL}/group-wise`,
    updateOne: `${MESSAGE_URL}/update`,
    delete: `${MESSAGE_URL}/delete`,

}
const createMessageApi = async ({ content, groupId, msgType }) => {
    //no need to send userId/senderId -> as API will be intercepted by token addition -> Backend ->  then authntication will happen -> then userId will extracted 
    try {
        const data = await Axios.post(END_POINT.create, { content, groupId, msgType });
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Message save failed: " + err?.response?.data?.message || err.message);
    }
}

const getMessagesByGroupApi = async (groupId: string) => {
    try {
        const data = await Axios.get(`${END_POINT.getList}/${groupId}`);   //no need to pass user id, as user token will provide that
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Failed to fetch user details: " + err?.response?.data?.message || err.message);
    }
}

const updateMessageApi = async (messageId: string, updateFields: {[key: string]: any}) => {
    try {
        const data = await Axios.put(`${END_POINT.updateOne}/${messageId}`, updateFields);
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Update failed " + err?.response?.data?.message || err.message);
    }
}

const deleteMessageApi = async (messageId: string, senderId: string) => {
    try {
        const data = await Axios.delete(`${END_POINT.delete}/${messageId}/${senderId}`);
        return data?.data?.data;
    } catch (err: any) {
        toast.error("Delete failed: " + err?.response?.data?.message || err.message);
    }
}

export {
    createMessageApi,
    deleteMessageApi,
    getMessagesByGroupApi,
    updateMessageApi
}