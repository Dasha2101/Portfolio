export type SearchDataType = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  status: string;
  type: string;
};

export type InfoType = {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
};

export type SearchDataResponse = {
  info: InfoType;
  results: SearchDataType[];
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: 'https://rickandmortyapi.com/api/location/1';
  };
  location: {
    name: 'Earth';
    url: 'https://rickandmortyapi.com/api/location/20';
  };
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg';
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ];
  url: 'https://rickandmortyapi.com/api/character/2';
  created: '2017-11-04T18:50:21.651Z';
};
