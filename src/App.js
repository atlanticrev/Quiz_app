import PageManager from "./components/base/PageManager";

import StartPage from "./components/pages/StartPage";
import QuizPage from "./components/pages/QuizPage";

export default class App {

    constructor () {
        this.pageManager = new PageManager();
    }

    start () {
        const startPage = new StartPage({name: 'start'});
        startPage.addEventListener('StartPage.EVENT_START', (options) => {
            this.pageManager.addPage(new QuizPage({name: 'quiz', data: options}));
            this.pageManager.openPage('quiz', true)
        });
        this.pageManager.addPage(startPage);

        this.pageManager.openPage('start', false);
    }

    stop () {
        this.pageManager.flushPages();
    }

}