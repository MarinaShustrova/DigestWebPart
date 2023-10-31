/// <reference types="react" />
import * as React from 'react';
export interface NewsItemProps {
    news: any;
    selectedNews: number[];
    onCheckboxChange: (newsId: number) => void;
    AuthorToggle: string;
    DateToggle: string;
}
export default class NewsItem extends React.Component<NewsItemProps> {
    render(): JSX.Element;
}
