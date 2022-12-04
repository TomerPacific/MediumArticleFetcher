export class UserProfile {
    profileLink: string;
    profileImg: string;


    constructor(link: string, image: string) {
        this.profileLink = link;
        this.profileImg = image;
    }
}