export class Article {
    title: string;
    link: string;
    publishDate: string;

    constructor(_title: string, _link: string, _publishDate: string) {
        this.title = _title;
        this.link = _link
        this.publishDate = _publishDate;
    }
}