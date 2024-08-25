import toast from "react-hot-toast";
import { Axios } from "./axios";
import { errorToastOptions } from "../helpers/toastHelpers";

const ADMIN_URL = "admin";
const END_POINT = {
    sendInvite: `${ADMIN_URL}/send-invite`,
}

const sendInviteApi = async ({ email, role }: any) => {

    try {
        const data = await Axios.post(END_POINT.sendInvite, { email, role });
        if (data) {
            const dataObj = data?.data?.data
            return dataObj
        }
    } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message, errorToastOptions)
    }
}



export {
    sendInviteApi,
}