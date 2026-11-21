import axios from "axios";

const AUTH_API_URL = "http://localhost:8080/api/auth";

const AuthService = {

    // generateOTP: async (phoneNumber) => {
    //     return await axios.post(
    //         `${AUTH_API_URL}/send-otp`,
    //         {
    //             phoneNumber: `+91${phoneNumber}`
    //         }
    //     );
    // },
    registerUser: async (userData) => {
    const response = await axios.post(
        `${AUTH_API_URL}/register`,
        userData
    );

    return response.data;
  },
   loginUser: async (loginData) => {
        const response = await axios.post(
            `${AUTH_API_URL}/login`,
            loginData
        );

        return response.data;
    },
   checkPhoneNumber: async (phoneNumber) => {
    const response = await axios.post(
        `${AUTH_API_URL}/check-phone`,
        { phoneNumber }
    );

    return response.data;
    },
     
    verifyRegistration: async (verificationData) => {
    const response = await axios.post(
        `${AUTH_API_URL}/verify-registration`,
        verificationData
    );

       return response.data;
    },

    // verifyOTP: async (phoneNumber, otp) => {
    //     return await axios.post(
    //         `${AUTH_API_URL}/verify-otp`,
    //         {
    //             phoneNumber: `+91${phoneNumber}`,
    //             otp
    //         }
    //     );
    // }
};

export default AuthService;