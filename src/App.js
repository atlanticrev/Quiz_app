import PageManager from "./components/base/PageManager";

import StartPage from "./components/pages/StartPage";
import QuizPage from "./components/pages/QuizPage";

import storage from './Storage';

export default class App {

    constructor () {
        this.pageManager = new PageManager();
    }

    start () {
        const startPage = new StartPage({name: 'start'});
        startPage.addEventListener('StartPage.EVENT_START_QUIZ', (options) => {
            this.pageManager.addPage(new QuizPage({name: 'quiz', data: Object.assign({}, options, {storage})}));
            this.pageManager.openPage('quiz', true)
        });

        this.pageManager.addPage(startPage);

        this.pageManager.openPage('start', false);
    }

    stop () {
        this.pageManager.flushPages();
    }

}