import { ApiRequestPlate, Fetcher, Resolve } from "../../helpers/API";
const endPoint = "https://tmsph-sdi-challenges.pages.dev/challenges/";
export const storageEndPoint = "http://localhost:8000/storage/"


export function ApiGetNews(){
    const api = new ApiRequestPlate(endPoint);
    const apiRequest = api.url('news.json').get().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}

export function ApiGetAuthors(){
    const api = new ApiRequestPlate(endPoint);
    const apiRequest = api.url('authors.json').get().request();
    const resolver = new Resolve(apiRequest);
    return resolver;
}




//THIS IS JUST A FALLBACK IF CORS FAILED COMPLETELY
export const newsFallbackData = [
    {
        "id": 1,
        "author_id": 1,
        "title": "Toyota Mobility Solutions PH empowers seafood wholesaler Mida Food with digital logistics platform",
        "body": "Logistics Platform addresses limitations in Mida Food's delivery operations",
        "image_url": "tmsph-ls-midafood.jpeg",
        "created_at": "2023-01-13 12:30:00"
    },
    {
        "id": 2,
        "author_id": 2,
        "title": "TMSPH launches Toyota Rent&#x3B1;Car",
        "body": "Toyota Mobility Solutions Philippines, Inc. (TMSPH) marked another milestone in its first year of operations with the introduction of its new and exciting car rental service, the Toyota Rent&#x3B1;Car. This service provides affordable and secure transportation through its convenient and flexible car rental options – both for short-term and long-term use.",
        "image_url": "tmsph-launches-toyota-rentacar.webp",
        "created_at": "2023-05-17 22:29:10"
    },
    {
        "id": 3,
        "author_id": 1,
        "title": "Toyota Motor Philippines partners with Lalamove Automotive",
        "body": "Leading mobility company Toyota Motor Philippines (TMP) has partnered with leading logistics provider Lalamove through its auto brand, Lalamove Automotive, with the introduction of the commercial vehicle Toyota Lite Ace as a transport partner. Aspiring and existing Lalamove operators are now able to purchase the Lite Ace Panel Van variant through this partnership, under Lalamove Automotive's Vehicle Ownership Program.",
        "image_url": "tmp-lalamove-partnership.webp",
        "created_at": "2023-07-05 02:15:01"
    }
];
export const authorFallbackData = [
    {
        "id": 1,
        "name": "Darwin Tumaneng",
        "role": "Logistics Digitalization Services Unit Representative",
        "place": "Metro Manila, Philippine",
        "avatar_url": "tmsph-logo.jpg"
    },
    {
        "id": 2,
        "name": "Miguel Tianzon",
        "role": "Car Rental Business Representative",
        "place": "Metro Manila, Philippine",
        "avatar_url": "tmsph-logo.jpg"
    }
]