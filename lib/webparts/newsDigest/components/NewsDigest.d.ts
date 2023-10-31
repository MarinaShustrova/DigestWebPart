/// <reference types="react" />
import * as React from 'react';
import { INewsDigestProps } from './INewsDigestProps';
import { INewsDigestState } from './INewsDigestState';
import SPServices from './Service/SPServices';
export default class NewsDigest extends React.Component<INewsDigestProps, INewsDigestState> {
    spService: SPServices;
    constructor(props: any);
    toggleSortByCreated: () => void;
    componentDidMount(): Promise<void>;
    openModal: () => void;
    closeModal: () => void;
    handleCheckboxChange: (newsId: any) => void;
    generateHTML: (selectedNews: any) => string;
    handleSubmit: () => void;
    render(): JSX.Element;
}
