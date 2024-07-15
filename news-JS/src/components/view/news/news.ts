import './news.css'
import { ArticleData } from '../../../types/index.js'

class News {
    draw(data: ArticleData[]) {
        const news: ArticleData[] = data.length >= 10 ? data.filter((_item: ArticleData, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');


        if (newsItemTemp) {
            news.forEach((item: ArticleData, idx: number) => {
                const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

                if (idx % 2) {
                    const newItem: Element | null = newsClone.querySelector('.news__item');
                    if (newItem) {
                        newItem.classList.add('alt');
                    }
                }
                const newPhoto: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-photo');
                if (newPhoto) {
                    newPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }


                const textAuthor: Element | null = newsClone.querySelector('.news__meta-author');
                if (textAuthor) {
                    textAuthor.textContent = item.author || item.name;
                }

                const publishe: Element | null = newsClone.querySelector('.news__meta-date');
                if (publishe) {
                    publishe.textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');
                }

                const textTtile: Element | null = newsClone.querySelector('.news__description-title');
                if (textTtile) {
                    textTtile.textContent = item.title;
                }

                const textName: Element | null = newsClone.querySelector('.news__description-source');
                if (textName) {
                    textName.textContent = item.name;
                }

                const textDescription: Element | null = newsClone.querySelector('.news__description-content');
                if (textDescription) {
                    textDescription.textContent = item.description;
                }

                const textUrl: HTMLAnchorElement | null = newsClone.querySelector('.news__read-more a');
                if (textUrl) {
                    textUrl.setAttribute('href', item.url);
                }
                fragment.append(newsClone);
            });

            const docx: Element | null = document.querySelector('.news');
            if (docx) {
                docx.innerHTML = '';
            }

            const appendFragment: Element | null = document.querySelector('.news');
            if (appendFragment) {
                appendFragment.appendChild(fragment);
            }
        }

    }
}

export default News;
