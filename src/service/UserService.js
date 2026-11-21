import axios from "axios";

const USER_API_URL = "http://localhost:8080/api/users";

const UserService = {

    // Create User
    createUser: async (userData) => {
        return await axios.post(
            `${USER_API_URL}/createUser`,
            userData
        );
    },
    getUser: async (userId) => {
         const token = localStorage.getItem("token");
        return await axios.get(
            `${USER_API_URL}/getUser`,
            
            {
                params:{userId: userId},
                headers: {
                Authorization: `Bearer ${token}`
               }
            }
        );
    },

    // Update User
    updateUser: async (userId, userData) => {
        return await axios.put(
            `${USER_API_URL}/createUser`,
            userData,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        );
    },

    // Upload Profile Picture
    uploadPicture: async (userId, file) => {

        const formData = new FormData();

        formData.append("file", file);

        return await axios.post(
            `${USER_API_URL}/${userId}/picture`,
            formData
        );
    },

    // Load Profile Picture
    loadPicture: async (userId) => {
        return await axios.get(
            `${USER_API_URL}/${userId}/picture`,
            {
                responseType: "blob"
            }
        );
    }

};

export default UserService;