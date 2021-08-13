import { client, authClient } from "../index";
import * as globalVars from "../../globalVars"

export const startVirtualAudit = (branchSlug: string, userId: string) => {
    window.location.assign(`${globalVars.api}/audit/${branchSlug}/${userId}`);
};

export const auditImageUpload = async (branchSlug:string,imageBase64:string)=>{
    return await authClient.post(`/audit/image/${branchSlug}`,{
        imageBase64:imageBase64
    })
}

export const updateAuditStatus = (branchSlug: string) => {
    window.location.assign(`${globalVars.api}/audit/status/${branchSlug}`);
};