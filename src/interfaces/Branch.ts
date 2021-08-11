export default interface Branch {
    _id: string;
    conservationSlug: string;
    slug: string;
    owner: {
        firstName: string;
        lastName: string;
        email: string;
        id: string;
    };
    note: string;
    auditStatus: {
        status: number;
        approvals: number;
        denials: number;
        pending: number;
    };
}
