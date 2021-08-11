import { authClient, client } from "../index";

export const getAllBranches = async () => {
    return await client.get("/branch/all");
};

export const getConservations = async () => {
    return await client.get("/branch/conservations");
};
