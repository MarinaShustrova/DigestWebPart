import * as React from 'react';
import styles from './NewsDigest.module.scss';

// Этот код определяет класс NewsItem, который представляет собой компонент для отображения одной новости в списке новостей.
// Класс принимает входящие свойства (props) с определенными интерфейсами.
// Входящие свойства включают:
// news: Объект, представляющий информацию о новости.
// selectedNews: Массив, содержащий идентификаторы выбранных новостей.
// onCheckboxChange: Функция обратного вызова, вызываемая при изменении состояния флажка (чекбокса).
// AuthorToggle: Флаг, указывающий, должно ли отображаться имя автора.
// DateToggle: Флаг, указывающий, должна ли отображаться дата.
// В методе render происходит отрисовка компонента. Он возвращает HTML-разметку, отображающую информацию о новости.

export interface NewsItemProps {
  news: any;
  selectedNews: number[];
  onCheckboxChange: (newsId: number) => void;
  AuthorToggle: string;
  DateToggle: string;
}

export default class NewsItem extends React.Component<NewsItemProps> {
  render() {
    const { news, selectedNews, onCheckboxChange, AuthorToggle, DateToggle } = this.props;

    return (
      // Внешний контейнер с классом NewsContainer и определенным стилем для создания эффекта тени.
      // Чекбокс (input type="checkbox") для выбора новости. Его состояние зависит от того, выбрана ли новость (проверка наличия news.Id в selectedNews).
      <div className={styles.NewsContainer} style={{ boxShadow: 'rgb(0 0 0 / 16%) 0px 1px 4px, rgb(0 0 0 / 10%) 0px 0px 1px' }}>
        <div>
          <input
            type="checkbox"
            id={`news_${news.Id}`}
            checked={selectedNews.indexOf(news.Id) !== -1}
            onChange={() => onCheckboxChange(news.Id)}
          />
          <div className={styles.ImgContainer}>
            <img src={news.BannerImageUrl} className={styles.Img} alt="Фото новости" />
          </div>
          <div className={styles.newsBody}>
            <div className={styles.TitleContainer}>
              <a className={styles.TitleStyling} href={news.Url}>
                {news.Title}
              </a>
            </div>
            <div className={styles.DescriptionContainer}>{news.Description}</div>
            <div className={styles.AuthorContainer}>
              {!AuthorToggle && <div>{news.Author}</div>}
              {!DateToggle && (
                <div>
                  {news.Created}
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



// Контейнер с изображением (img) новости, отображаемым с классом Img.
// Контейнер с информацией о новости, включая заголовок (TitleStyling) и описание (DescriptionContainer).
// Контейнер, в котором отображаются автор и дата новости. Отображение зависит от значений AuthorToggle и DateToggle.
// Внутри компонента используются стили из модуля NewsDigest.module.scss, чтобы стилизовать разметку.

// Компонент реагирует на изменения состояния чекбокса, вызывая функцию onCheckboxChange, которая передает идентификатор новости.
// В итоге, этот компонент представляет собой отдельный элемент для отображения информации о новости и управления выбором этой новости.
//initia
