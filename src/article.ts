export class Article {
    author: string;
    category: string[];
    content: string;
    content_encoded: string;
    created: number;
    enclosures: string[];
    id: string;
    link: string;
    published: number;
    url:string;
    title: string;

    constructor(json: any) {
        this.author = json.author;
        this.category = json.category;
        this.content = json.content;
        this.content_encoded = json.content_encoded;
        this.created = json.created;
        this.enclosures = json.enclosures;
        this.id = json.id;
        this.link = json.link;
        this.published = json.published;
        this.url = json.url;
        this.title = json.title;
    }

    createArticleMarkup():HTMLElement {
        let liElem: HTMLElement = document.createElement('li');
        let anchorElem: HTMLAnchorElement = document.createElement('a');

        anchorElem.href = this.link;
        anchorElem.title = this.title;
        anchorElem.setAttribute('target', '_blank');
        anchorElem.innerHTML = this.title;

        liElem.appendChild(anchorElem);

        return liElem;
    }
}