import Page from '../base/Page';
import Counter from '../Counter';
import QuestionCounter from '../QuestionCounter';
import Question from '../Question';
import Answers from '../Answers';
import Button from '../Button';

export default class QuizPage extends Page {

    constructor(options) {
        options = Object.assign({}, Counter.defaults, options);
        super(options);

        this.children = {
            counter:         new Counter(),
            questionCounter: new QuestionCounter({countAll: 45}),
            question:        new Question(),
            answers:         new Answers(),
            button:          new Button()
        };

        this.appendComponent(this.children.counter, this.container);
        this.appendComponent(this.children.questionCounter, this.container);
        this.appendComponent(this.children.question, this.container);
        this.appendComponent(this.children.answers, this.container);
        this.appendComponent(this.children.button, this.container);

        // @todo delegate to the page manager
        this.children.button.addEventListener('Button.EVENT_CLICK', () => this.close());
    }

}