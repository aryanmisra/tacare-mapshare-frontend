export default interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    userType: string;
    created: Date;
    password: string;
    conservationGroups?: string[];
}
