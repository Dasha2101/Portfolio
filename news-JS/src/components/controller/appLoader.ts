import Loader from './loader';

const enum AppData {
    url = 'https://newsapi.org/v2/',
    keyAPI = 'b211ceefd3ce40429e1d1939eec094c9',
}

class AppLoader extends Loader {
    constructor() {
        super(AppData.url, {
            apiKey: AppData.keyAPI,
        });
    }
}

export default AppLoader;
