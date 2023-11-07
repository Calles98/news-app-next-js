import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews =async (
    category?: Category | string, 
    keywords?: string, 
    isDynamic?: boolean

) => {

    // GrapqQL query 
    const query = gql`
        query myQuery(
            $access_key: String!
            $categories: String!
            $keywords: String

        ) {
            myQuery(
               access_key: $access_key
               categories: $categories
               countries: "gb"
               sort: "published_desc"
               keywords: $keywords 
            ) {
            data {
                author
                category
                country
                description
                image
                language
                published_at
                source
                title
                url
            }
            pagination {
                count
                limit
                offset
                total
            }
        }
      }
    `;
      
    // fetch function
    const res = await fetch("https://pindaremirim.stepzen.net/api/mouthy-liger/__graphql", {
        method: "POST", 
        cache: isDynamic ? "no-cache" : "default",
        next: isDynamic ? { revalidate: 0 } : { revalidate: 20 }, 
        headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`, 
        },
        body: JSON.stringify({
            query, 
            variables: {
                access_key: process.env.MEDIASTACK_API_KEY, 
                categories: category, 
                keywords: keywords, 
            },
        }),
    }); 

    console.log("LOADING NEW DATA FROM API for category >>> ", category, keywords);
    

    // sort function 

    const NewsResponse = await res.json();

    const news = sortNewsByImage(NewsResponse.data.myQuery); 

    return news; 


    
}

export default fetchNews; 

