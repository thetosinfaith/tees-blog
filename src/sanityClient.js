import { createClient } from '@sanity/client';

const sanityClient = createClient({
    projectId: "dr3oba85", 
    dataset: "production", 
    useCdn: true, 
    apiVersion: "v2022-03-07",
    token: import.meta.env.VITE_SANITY_API_TOKEN,
});

export default sanityClient;

