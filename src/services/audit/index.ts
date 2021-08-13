import { client, authClient } from "../index";

export const startVirtualAudit = (branchSlug: string, userId: string) => {
    window.location.assign(`http://localhost:5000/audit/${branchSlug}/${userId}`);
};

export const auditImageUpload = async (branchSlug:string,imageBase64:string)=>{
    return await authClient.post(`/audit/image/${branchSlug}`,{
        imageBase64:imageBase64
    })
}