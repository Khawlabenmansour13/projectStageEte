
import axios from "axios";


export const apiNotification = {
    async getNotification(id) {
        const { data } = await axios.get(`http://localhost:8000/notification/${id}`);

        return data;
    },
    async addNotification(notif) {
            const { data } = await axios.post(`http://localhost:8000/notification/add`,notif);
            console.log("DATATATA=="+JSON.stringify(data));
            return data;


    },

    async putNotification(id) {
    const { data } = await axios.put(`http://localhost:8000/notification/update/${id}`);
    return data;
},
async deleteNotification(id) {
    const { data } = await axios.delete(`http://localhost:8000/notification/delete/${id}`);
    return data;
},
    async getAdminNotification(id) {
        const { data } = await axios.get(`http://localhost:8000/notification/notificationsAdmin/${id}`);

        return data;    }
};
