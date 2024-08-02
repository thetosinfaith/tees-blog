import client from "@sanity/client";

const sanityClient = client({
    projectId: "dr3oba85", 
    dataset: "production", 
    useCdn: true, 
    apiVersion: "2024-08-01" 
});

export default sanityClient;
