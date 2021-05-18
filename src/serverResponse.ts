import { Article } from "./article";

export class ServerResponse {
    message: {
        category: string[];
        description: string;
        items: Article[];
        image: string;
        link: string;
        title: string;
    };
}