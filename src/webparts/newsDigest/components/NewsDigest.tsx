import * as React from 'react';
import styles from './NewsDigest.module.scss';
import { INewsDigestProps } from './INewsDigestProps';
import { INewsDigestState } from './INewsDigestState';
import SPServices from './Service/SPServices';
import NewsItem from './NewsItem';

export default class NewsDigest extends React.Component<INewsDigestProps, INewsDigestState> {
  spService = new SPServices(this.props.context);

  constructor(props) {
    super(props);
    this.state = {
      newsData: new SPServices(this.props.context).getMockData(),
      isModalOpen: false,
      selectedNews: [],
      SPGuid: '',
      sortByCreated: false,
    };
    console.log('props in NewsDigest', props);
  }

   public toggleSortByCreated = () => {
    this.setState((prevState) => ({
      sortByCreated: !prevState.sortByCreated,
    }));
  };

  public async componentDidMount() {
    // Вызовите метод getInfo, чтобы получить новости из SharePoint
    const allNewsData = await this.spService.getInfo('ваш_сайт_sharepoint');

    // Функция для сравнения дат в порядке возрастания
    const compareDatesAsc = (a, b) => {
      const dateA: Date | null = a.Created ? new Date(a.Created) : null;
      const dateB: Date | null = b.Created ? new Date(b.Created) : null;

      if (dateA && dateB) {
        return dateA.getTime() - dateB.getTime();
      } else if (dateA) {
        return -1;
      } else if (dateB) {
        return 1;
      } else {
        return 0;
      }
    };

    // Функция для сравнения дат в порядке убывания (обратной сортировки)
    const compareDatesDesc = (a, b) => {
      const dateA: Date | null = a.Created ? new Date(a.Created) : null;
      const dateB: Date | null = b.Created ? new Date(b.Created) : null;

      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      } else if (dateA) {
        return 1;
      } else if (dateB) {
        return -1;
      } else {
        return 0;
      }
    };

    // Выбирайте соответствующий метод сортировки в зависимости от выбранного порядка
    const sortMethod = this.props.sortByCreated ? compareDatesDesc : compareDatesAsc;

    // Сортируем новости с использованием выбранного метода
    allNewsData.sort(sortMethod);

    // Распаковка и обработка полученных данных
    const expandedNewsData = allNewsData.map((news) => ({
      Id: news.Id,
      Title: news.Title,
      Description: news.Description,
      BannerImageUrl: news.BannerImageUrl,
      Created: news.Created,
      Author: news.Author,
      Url: news.Url,
      // Добавьте другие поля, которые вам нужны
    }));

    // Обновите состояние компонента с распакованными данными
    this.setState({ newsData: expandedNewsData });
  }


 public openModal = () => {
    this.setState({ isModalOpen: true });
  };

public closeModal = () => {
    this.setState({ isModalOpen: false, selectedNews: [] });
  };

  public handleCheckboxChange = (newsId) => {
    const { selectedNews } = this.state;
    const isSelected = selectedNews.indexOf(newsId) !== -1;
    if (isSelected) {
      // Если новость уже выбрана, уберите ее из списка выбранных
      const updatedSelectedNews = selectedNews.filter((id) => id !== newsId);
      this.setState({
        selectedNews: updatedSelectedNews,
      });
    } else {
      // Если новость не выбрана, добавьте ее в список выбранных
      this.setState({
        selectedNews: [...selectedNews, newsId],
      });
    }
  };

 public  generateHTML = (selectedNews) => {
    let html = '<html><head><title>Рассылка с новостями</title></head><body>';

    // Добавьте заголовок и стили CSS по вашему усмотрению

    selectedNews.forEach((news) => {
      html += '<article class="news-item">';
      html += `<img src="${news.BannerImageUrl}" alt="Фото новости" />`;
      html += '<div class="news-content">';
      html += `<h2><a href="${news.Url}">${news.Title}</a></h2>`;
      html += `<p>${news.Description}</p>`;
      html += `<p>${news.Created}</p>`;
      html += `<p>${news.Author}</p>`;
      html += `<p>${news.Url}</p>`;
      html += '</div></article>';
    });

    // Добавьте футер и закройте HTML-документ

    html += '</body></html>';
    return html;
  };

  handleSubmit = () => {
    const { selectedNews } = this.state;
    if (selectedNews.length === 0) {
      alert('выберите хотя бы одну новость!');
      return;
    }

    const html = this.generateHTML(selectedNews);
    alert('дайджест успешно сформирован!');
    console.log('html', html);

    // URL сервера SharePoint, куда будет отправлен HTML-код
    const sharePointUrl = 'https://ваш_сайт_sharepoint/_api/web/lists/getbytitle(\'Ваш_список\')/items';

    // Заголовки для запроса
    const headers = new Headers({
      'Accept': 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
    });

    // Данные для запроса
    const data = {
      '__metadata': { 'type': 'SP.Data.Ваш_тип_спискаItem' }, // Укажите тип вашего элемента списка
      'HTMLContent': html, // Поле, в котором хранится HTML-код
      // Другие поля, если необходимо
    };

    // Опции запроса
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      credentials: 'same-origin',
    };

    // Выполнение POST-запроса
    fetch(sharePointUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('HTML-код успешно отправлен на сервер SharePoint', data);
        // Дополнительные действия после успешной отправки
      })
      .catch((error) => {
        console.error('Ошибка при отправке HTML-кода на сервер SharePoint', error);
        // Обработка ошибки
      });
    this.closeModal();
  };

  render() {
    const { isModalOpen, selectedNews, newsData } = this.state;
    const { description, newsCount } = this.props;

    return (
      <div className={styles.newsDigest}>
        <div className={styles.SingleStyle}>
          <div className={styles.SingleStyleContainer}>
            {isModalOpen ? (
              <div className={styles.modal}>
                <div className={styles['modal-content']}>
                  <div className={styles.title}>Выберите новости </div>
                  {newsData.slice(0, newsCount).map((news) => (
                    <NewsItem
                      key={news.Id}
                      news={news}
                      selectedNews={selectedNews}
                      onCheckboxChange={this.handleCheckboxChange}
                      AuthorToggle={this.props.AuthorToggle}
                      DateToggle={this.props.DateToggle}
                    />
                  ))}
                </div>
                <div className={styles.buttonContainer}>
                  <button className={styles['button-submit']} onClick={this.handleSubmit}>
                    Создать
                  </button>
                  <button className={styles['button-exit']} onClick={this.closeModal}>
                    Закрыть
                  </button>
                </div>
              </div>
            ) : (
              <button className={styles['button-modal']} onClick={this.openModal}>
                Создать рассылку
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
