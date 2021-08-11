export default interface Conservation {
    _id: string;
    slug: string;
    name: string;
    description: string;
    mapUrl: string;
    coverImage: string;
    created: Date;
    lastUpdated: Date;
    stakeholders: string[];
}
