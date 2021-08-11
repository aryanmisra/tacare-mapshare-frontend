import { atom, selector } from "recoil";
import { verifyToken } from "../services/auth";
import { getData, logout } from "../helpers/persistence";
import User from "../interfaces/User";
import Conservation from "../interfaces/Conservation";

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

export const conservationState = atom({
    key: "conservationState",
    default: {
        _id: "6114150dec61e71564684b3a",
        slug: "schweinfurthii",
        name: "The Eastern Chimpanzee",
        description:
            "The eastern chimpanzee is a subspecies of the common chimpanzee and classified as endangered and of global conservation concern, indicating that it has a very high risk of extinction in the wild in the near future. The eastern chimpanzee range covers the Central African Republic, South Sudan, the Democratic Republic of the Congo, Uganda, Rwanda, Burundi, and Tanzania.",
        mapUrl: "https://services3.arcgis.com/LyHBUBQ7sNYDeUPl/arcgis/rest/services/redlist_species_data_schweinfurthii/FeatureServer/0",
        coverImage: "https://i.ibb.co/F5GDpBL/image-16.png",
        created: new Date("2021-08-11T18:21:01.718+00:00"),
        lastUpdated: new Date("2021-08-11T18:21:01.718+00:00"),
    } as Conservation,
});
