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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './NewsDigest.module.scss';
import SPServices from './Service/SPServices';
import NewsItem from './NewsItem';
var NewsDigest = (function (_super) {
    __extends(NewsDigest, _super);
    function NewsDigest(props) {
        var _this = _super.call(this, props) || this;
        _this.spService = new SPServices(_this.props.context);
        _this.toggleSortByCreated = function () {
            _this.setState(function (prevState) { return ({
                sortByCreated: !prevState.sortByCreated,
            }); });
        };
        _this.openModal = function () {
            _this.setState({ isModalOpen: true });
        };
        _this.closeModal = function () {
            _this.setState({ isModalOpen: false, selectedNews: [] });
        };
        _this.handleCheckboxChange = function (newsId) {
            var selectedNews = _this.state.selectedNews;
            var isSelected = selectedNews.indexOf(newsId) !== -1;
            if (isSelected) {
                // Если новость уже выбрана, уберите ее из списка выбранных
                var updatedSelectedNews = selectedNews.filter(function (id) { return id !== newsId; });
                _this.setState({
                    selectedNews: updatedSelectedNews,
                });
            }
            else {
                // Если новость не выбрана, добавьте ее в список выбранных
                _this.setState({
                    selectedNews: selectedNews.concat([newsId]),
                });
            }
        };
        _this.generateHTML = function (selectedNews) {
            var html = '<html><head><title>Рассылка с новостями</title></head><body>';
            // Добавьте заголовок и стили CSS по вашему усмотрению
            selectedNews.forEach(function (news) {
                html += '<article class="news-item">';
                html += "<img src=\"" + news.BannerImageUrl + "\" alt=\"\u0424\u043E\u0442\u043E \u043D\u043E\u0432\u043E\u0441\u0442\u0438\" />";
                html += '<div class="news-content">';
                html += "<h2><a href=\"" + news.Url + "\">" + news.Title + "</a></h2>";
                html += "<p>" + news.Description + "</p>";
                html += "<p>" + news.Created + "</p>";
                html += "<p>" + news.Author + "</p>";
                html += "<p>" + news.Url + "</p>";
                html += '</div></article>';
            });
            // Добавьте футер и закройте HTML-документ
            html += '</body></html>';
            return html;
        };
        _this.handleSubmit = function () {
            var selectedNews = _this.state.selectedNews;
            if (selectedNews.length === 0) {
                alert('выберите хотя бы одну новость!');
                return;
            }
            var html = _this.generateHTML(selectedNews);
            alert('дайджест успешно сформирован!');
            console.log('html', html);
            // URL сервера SharePoint, куда будет отправлен HTML-код
            var sharePointUrl = 'https://ваш_сайт_sharepoint/_api/web/lists/getbytitle(\'Ваш_список\')/items';
            // Заголовки для запроса
            var headers = new Headers({
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
            });
            // Данные для запроса
            var data = {
                '__metadata': { 'type': 'SP.Data.Ваш_тип_спискаItem' },
                'HTMLContent': html,
            };
            // Опции запроса
            var options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data),
                credentials: 'same-origin',
            };
            // Выполнение POST-запроса
            fetch(sharePointUrl)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log('HTML-код успешно отправлен на сервер SharePoint', data);
                // Дополнительные действия после успешной отправки
            })
                .catch(function (error) {
                console.error('Ошибка при отправке HTML-кода на сервер SharePoint', error);
                // Обработка ошибки
            });
            _this.closeModal();
        };
        _this.state = {
            newsData: new SPServices(_this.props.context).getMockData(),
            isModalOpen: false,
            selectedNews: [],
            SPGuid: '',
            sortByCreated: false,
        };
        console.log('props in NewsDigest', props);
        return _this;
    }
    NewsDigest.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allNewsData, compareDatesAsc, compareDatesDesc, sortMethod, expandedNewsData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.spService.getInfo('ваш_сайт_sharepoint')];
                    case 1:
                        allNewsData = _a.sent();
                        compareDatesAsc = function (a, b) {
                            var dateA = a.Created ? new Date(a.Created) : null;
                            var dateB = b.Created ? new Date(b.Created) : null;
                            if (dateA && dateB) {
                                return dateA.getTime() - dateB.getTime();
                            }
                            else if (dateA) {
                                return -1;
                            }
                            else if (dateB) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        };
                        compareDatesDesc = function (a, b) {
                            var dateA = a.Created ? new Date(a.Created) : null;
                            var dateB = b.Created ? new Date(b.Created) : null;
                            if (dateA && dateB) {
                                return dateB.getTime() - dateA.getTime();
                            }
                            else if (dateA) {
                                return 1;
                            }
                            else if (dateB) {
                                return -1;
                            }
                            else {
                                return 0;
                            }
                        };
                        sortMethod = this.props.sortByCreated ? compareDatesDesc : compareDatesAsc;
                        // Сортируем новости с использованием выбранного метода
                        allNewsData.sort(sortMethod);
                        expandedNewsData = allNewsData.map(function (news) { return ({
                            Id: news.Id,
                            Title: news.Title,
                            Description: news.Description,
                            BannerImageUrl: news.BannerImageUrl,
                            Created: news.Created,
                            Author: news.Author,
                            Url: news.Url,
                        }); });
                        // Обновите состояние компонента с распакованными данными
                        this.setState({ newsData: expandedNewsData });
                        return [2 /*return*/];
                }
            });
        });
    };
    NewsDigest.prototype.render = function () {
        var _this = this;
        var _a = this.state, isModalOpen = _a.isModalOpen, selectedNews = _a.selectedNews, newsData = _a.newsData;
        var _b = this.props, description = _b.description, newsCount = _b.newsCount;
        return (React.createElement("div", { className: styles.newsDigest },
            React.createElement("div", { className: styles.SingleStyle },
                React.createElement("div", { className: styles.SingleStyleContainer }, isModalOpen ? (React.createElement("div", { className: styles.modal },
                    React.createElement("div", { className: styles['modal-content'] },
                        React.createElement("div", { className: styles.title }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 "),
                        newsData.slice(0, newsCount).map(function (news) { return (React.createElement(NewsItem, { key: news.Id, news: news, selectedNews: selectedNews, onCheckboxChange: _this.handleCheckboxChange, AuthorToggle: _this.props.AuthorToggle, DateToggle: _this.props.DateToggle })); })),
                    React.createElement("div", { className: styles.buttonContainer },
                        React.createElement("button", { className: styles['button-submit'], onClick: this.handleSubmit }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"),
                        React.createElement("button", { className: styles['button-exit'], onClick: this.closeModal }, "\u0417\u0430\u043A\u0440\u044B\u0442\u044C")))) : (React.createElement("button", { className: styles['button-modal'], onClick: this.openModal }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443"))))));
    };
    return NewsDigest;
}(React.Component));
export default NewsDigest;

//# sourceMappingURL=NewsDigest.js.map
