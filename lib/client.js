import sanityclient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";


{/*  
npm install -g @sanity/client
npm install --save @sanity/image-url
*/}
export const client = sanityclient ({
    projectId : "4zg5o1kz",
    dataset : "production",
    apiVersion: '2022-07-26',
    token: 'skXM0Xkyg2FVx9Lpylorqbqm5XoQ6j31Y4AEeF9PI5gFa0X0J9gKqIYqwr2OCfqOwBSm3aJk14m2UkBuG9vpku2xSHTZN9zLBtKlgVMvXsNS5vCbvFCL5UFfCjZOnEIQcKvjbrnh8KlyAwBgMDjlvT4o3hoV7MjgkeeKNaDHLqJ8e1Uk05wD',
    useCdn: true
});

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);