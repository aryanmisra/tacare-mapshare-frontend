import { atom, selector } from "recoil";
import { verifyToken } from "../services/auth";
import { getData, logout } from "../helpers/persistence";
import { User } from "../interfaces/User";

export const userState = atom({
    key: "userState",
    default: getData("user") ? (getData("user") as User) : null,
});

export const tokenState = atom({
    key: "tokenState",
    default: getData("token") ? (getData("token") as string) : "",
});

export const loggedInState = selector({
    key: "isLoggedIn",
    get: async ({ get }) => {
        const user = get(userState);
        if (user) {
            return await verifyToken();
        } else {
            logout();
            return false;
        }
    },
});
