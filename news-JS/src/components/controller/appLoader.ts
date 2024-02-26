import Loader from './loader';

enum AppData {
    url = 'https://newsapi.org/v2/',
    keyAPI = 'b211ceefd3ce40429e1d1939eec094c9',
}

class AppLoader extends Loader {
    constructor() {
        if (process.env.API_URL === undefined) {
            throw new Error('API_URL is not defined');
        }
        super(AppData.url, {
            apiKey: AppData.keyAPI,
        });
    }
}

export default AppLoader;
