import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface INewsDigestProps {
    description: string;
    context: WebPartContext;
    newsData: any[];
    AuthorToggle: string;
    DateToggle: string;
    newsCount: number;
    sortByCreated: boolean;
}
