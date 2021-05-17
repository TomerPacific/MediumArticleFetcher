class Article {
    title: string;
    link: string;
    publishDate: string;
    imgSrc: string;

    constructor(_title: string, _link: string, _publishDate: string, _imgSrc: string) {
        this.title = _title;
        this.link = _link
        this.publishDate = _publishDate;
        this.imgSrc = _imgSrc;
    }
}