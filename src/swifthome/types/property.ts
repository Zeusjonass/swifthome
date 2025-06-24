export type Property = {
    pk: string;
    sk: string;
    address: string;
    availabilityDate: string;
    bathrooms: string;
    bedrooms: string;
    hitch: string;
    image: string;
    link: string;
    location: string;
    lotSize: string;
    monthlyPayment: string;
    price: string;
    propertyId: string;
    slug: string;
    status: string;
    tags: string[];
    title: string;
    type: string;
    dateConstruction: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}
