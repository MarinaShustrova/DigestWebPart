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
import styles from './NewsDigest.module.scss';
var NewsItem = (function (_super) {
    __extends(NewsItem, _super);
    function NewsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsItem.prototype.render = function () {
        var _a = this.props, news = _a.news, selectedNews = _a.selectedNews, onCheckboxChange = _a.onCheckboxChange, AuthorToggle = _a.AuthorToggle, DateToggle = _a.DateToggle;
        return (
        // Внешний контейнер с классом NewsContainer и определенным стилем для создания эффекта тени.
        // Чекбокс (input type="checkbox") для выбора новости. Его состояние зависит от того, выбрана ли новость (проверка наличия news.Id в selectedNews).
        React.createElement("div", { className: styles.NewsContainer, style: { boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 4px, rgb(0 0 0 / 10%) 0px 0px 1px' } },
            React.createElement("div", null,
                React.createElement("input", { type: "checkbox", id: "news_" + news.Id, checked: selectedNews.indexOf(news.Id) !== -1, onChange: function () { return onCheckboxChange(news.Id); } }),
                React.createElement("div", { className: styles.ImgContainer },
                    React.createElement("img", { src: news.BannerImageUrl, className: styles.Img, alt: "Фото новости" })),
                React.createElement("div", { className: styles.newsBody },
                    React.createElement("div", { className: styles.TitleContainer },
                        React.createElement("a", { className: styles.TitleStyling, href: news.Url }, news.Title)),
                    React.createElement("div", { className: styles.DescriptionContainer }, news.Description),
                    React.createElement("div", { className: styles.AuthorContainer },
                        !AuthorToggle && React.createElement("div", null, news.Author),
                        !DateToggle && (React.createElement("div", null,
                            news.Created,
                            React.createElement("br", null))))))));
    };
    return NewsItem;
}(React.Component));
export default NewsItem;
// Контейнер с изображением (img) новости, отображаемым с классом Img.
// Контейнер с информацией о новости, включая заголовок (TitleStyling) и описание (DescriptionContainer).
// Контейнер, в котором отображаются автор и дата новости. Отображение зависит от значений AuthorToggle и DateToggle.
// Внутри компонента используются стили из модуля NewsDigest.module.scss, чтобы стилизовать разметку.
// Компонент реагирует на изменения состояния чекбокса, вызывая функцию onCheckboxChange, которая передает идентификатор новости.
// В итоге, этот компонент представляет собой отдельный элемент для отображения информации о новости и управления выбором этой новости. 

//# sourceMappingURL=NewsItem.js.map
