import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface INewsDigestWebPartProps {
    description: string;
    newsCount: number;
    AuthorToggle: string;
    DateToggle: string;
    sortByCreated: boolean;
}
export default class NewsDigestWebPart extends BaseClientSideWebPart<INewsDigestWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected onPropertyPaneConfigurationStart(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
