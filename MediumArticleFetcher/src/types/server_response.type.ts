import type { Article } from "./article.type";

export type ServerResponse = {
    message: {
        category: string[];
        description: string;
        items: Article[];
        image: string;
        link: string;
        title: string;
    };
}