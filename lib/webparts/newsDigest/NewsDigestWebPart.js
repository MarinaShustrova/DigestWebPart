var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import NewsDigest from './components/NewsDigest';
var NewsDigestWebPart = (function (_super) {
    __extends(NewsDigestWebPart, _super);
    function NewsDigestWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsDigestWebPart.prototype.render = function () {
        var element = React.createElement(NewsDigest, {
            description: this.properties.description,
            newsCount: this.properties.newsCount || 5,
            AuthorToggle: this.properties.AuthorToggle,
            DateToggle: this.properties.DateToggle,
            sortByCreated: this.properties.sortByCreated,
        });
        console.log('properties.newsCount in react web part', this.properties.newsCount);
        ReactDom.render(element, this.domElement);
    };
    NewsDigestWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    NewsDigestWebPart.prototype.onPropertyPaneConfigurationStart = function () {
        this.properties.newsCount = this.properties.newsCount || 5; // Устанавливаем значение по умолчанию
    };
    // protected get dataVersion(): Version {
    //   return Version.parse('1.0');
    // }
    NewsDigestWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: 'Общие настройки',
                    },
                    groups: [
                        {
                            groupName: 'Настроить перед формированием рассылки',
                            groupFields: [
                                PropertyPaneTextField("newsCount", {
                                    label: "Количество новостей для отображения",
                                }),
                                PropertyPaneToggle('AuthorToggle', {
                                    onText: 'Убрать',
                                    offText: 'Показать',
                                    label: 'Настройка отображения имени автора'
                                }),
                                PropertyPaneToggle('DateToggle', {
                                    onText: 'Убрать',
                                    offText: 'Показать',
                                    label: 'Настройка отображения даты'
                                }),
                                PropertyPaneToggle('sortByCreated', {
                                    onText: 'Сначала новые',
                                    offText: 'Сначала старые',
                                    label: 'Сортировать новости по новизне',
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return NewsDigestWebPart;
}(BaseClientSideWebPart));
export default NewsDigestWebPart;

//# sourceMappingURL=NewsDigestWebPart.js.map
