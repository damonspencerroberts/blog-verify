import axios from "axios";

const instance = axios.create({
    baseURL: "https://blog-me-567ca-default-rtdb.europe-west1.firebasedatabase.app/"
});

export default instance;
