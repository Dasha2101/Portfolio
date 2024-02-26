import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        if (process.env.API_URL === undefined) {
            throw new Error('API_URL is not defined');
        }
        super(process.env.API_URL, {
            apiKey: 'b211ceefd3ce40429e1d1939eec094c9',
        });
    }
}

export default AppLoader;
