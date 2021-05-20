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