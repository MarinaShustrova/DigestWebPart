import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'NewsDigestWebPartStrings';
import NewsDigest from './components/NewsDigest';
import { INewsDigestProps } from './components/INewsDigestProps';

export interface INewsDigestWebPartProps {
  description: string;
  newsCount: number;
  AuthorToggle: string;
  DateToggle: string;
  sortByCreated: boolean;
}

export default class NewsDigestWebPart extends BaseClientSideWebPart<INewsDigestWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewsDigestProps > = React.createElement(
      NewsDigest,
      {
        description: this.properties.description,
        newsCount: this.properties.newsCount || 5,
        AuthorToggle: this.properties.AuthorToggle,
        DateToggle: this.properties.DateToggle,
        sortByCreated: this.properties.sortByCreated,
      }
    );
    console.log('properties.newsCount in react web part', this.properties.newsCount);
    ReactDom.render(element, this.domElement);


  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.properties.newsCount = this.properties.newsCount || 5; // Устанавливаем значение по умолчанию
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
