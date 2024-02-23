export interface ArticleData {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  // source: string;
  name: string;
}

export interface SourceData {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Source {
  id: string;
  name: string;
}
