import { client, authClient } from "../index";
import { saveData } from "../../helpers/persistence";

export const verifyToken = async () => {
    try {
        const response = await authClient.get("/auth/verifytoken");
        return response.status === 204;
    } catch (e) {
        return false;
    }
};

export const login = async (email: string, password: string) => {
    return await client.post("/auth/login", {
        email: email,
        password: password,
    });
};

export const register = async (firstName: string, lastName: string, userType: string, email: string, password: string) => {
    return await client.put("/auth/register", {
        firstName: firstName,
        lastName: lastName,
        userType: userType,
        email: email,
        password: password,
    });
};
