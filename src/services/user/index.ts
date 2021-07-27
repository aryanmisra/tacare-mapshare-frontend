import { authClient } from "../index";

export const getUserData = async () => {
    return await authClient.get("/user/data");
};
