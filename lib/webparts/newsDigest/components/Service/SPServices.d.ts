import { WebPartContext } from "@microsoft/sp-webpart-base";
export default class spservices {
    private context;
    constructor(context: WebPartContext);
    private onInit();
    getInfo(site: any): Promise<any[]>;
    getMockData(): {
        Id: number;
        Title: string;
        Description: string;
        BannerImageUrl: string;
        Created: string;
        Author: string;
        Url: string;
    }[];
}
