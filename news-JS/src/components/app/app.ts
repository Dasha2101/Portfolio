import { NewsData } from '../../types/index';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e) => this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data)));
            this.controller.getSources((data: NewsData) => this.view.drawSources(data));
        }
    }
}

export default App;
