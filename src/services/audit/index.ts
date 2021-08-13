import { client, authClient } from "../index";

export const startVirtualAudit = (branchSlug: string, userId: string) => {
    window.location.assign(`http://localhost:5000/audit/${branchSlug}/${userId}`);
};
