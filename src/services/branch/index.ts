import { authClient, client } from "../index";

export const getAllBranches = async () => {
    return await client.get("/branch/all");
};

export const getConservations = async () => {
    return await client.get("/branch/conservations");
};

export const getBranchCommits = async (branchSlug:string) => {
    return await authClient.get(`/branch/${branchSlug}/commits`)
}

export const getBranch = async (branchSlug:string) => {
    return await authClient.get(`/branch/${branchSlug}`)
}

export const createBranch = async (branchNote:string,commitNote:string,features:Array<{geometry:string,attributes:any}>,conservationSlug:string) =>{
    return await authClient.post("/branch/create",{
        branchNote:branchNote,
        commitNote:commitNote,
        features:features,
        conservationSlug:conservationSlug
    })
}

export const commitToBranch = async (branchSlug:string,commitNote:string,features:Array<{geometry:string,attributes:any}>)=>{
    return await authClient.post("/branch/commit",{
        branchSlug:branchSlug,
        commitNote:commitNote,
        features:features,
    })
}

export const deleteBranch = async (branchSlug:string) => {
    return await authClient.delete(`/branch/${branchSlug}`)
}

export const revertCommits = async (commitSlug:string) => {
    return await authClient.delete(`/branch/commit/${commitSlug}`)
}