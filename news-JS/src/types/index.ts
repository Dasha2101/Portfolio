export interface ArticleData {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  name: string;
}

export interface Source {
  id: string;
  name: string;
}

export interface NewsData {
  articles: ArticleData[];
  sources: Source[];
}

export interface Options {
  id?: string;
  [key: string]: string | undefined;
}

export interface NewsData {
  articles: ArticleData[];
  source: string;
}

