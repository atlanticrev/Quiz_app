import PageManager from "./components/base/PageManager";
import QuizPage from './components/pages/QuizPage';

import data from './Storage';

import './sass/index.scss';

const pageManager = new PageManager();
pageManager.addPage(new QuizPage({index: 2, data}));
pageManager.openPage(false);
