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

        this.state = {
            status: 0,
            answers: [],
            answersCount: 4,
            questionCount: 0,
            stateList: {
                TICKING: 0,
                NEXT: 1,
                COMPLETE: 2
            }
        };

        this.updateState();

        this.children = {
            counter:         new Counter({counter: 5}),
            questionCounter: new QuestionCounter({countAll: 45, data: this.state}),
            question:        new Question({data: this.state}),
            answers:         new Answers({data: this.state}),
            button:          new Button({data: this.state})
        };

        this.appendComponent(this.children.counter, this.container);
        this.appendComponent(this.children.questionCounter, this.container);
        this.appendComponent(this.children.question, this.container);
        this.appendComponent(this.children.answers, this.container);
        this.appendComponent(this.children.button, this.container);

        this.onCounterStopped = this.onCounterStopped.bind(this);

        this.children.button.addEventListener('Button.EVENT_CLICK', () => {
            if (this.state.status === this.state.stateList.TICKING) {
                this.children.counter.stopCount();
            } else if (this.state.status === this.state.stateList.NEXT) {
                // @todo delegate to the page manager
                this.setNewQuestion();
            }
        });

        this.children.counter.addEventListener('Counter.EVENT_STOP_COUNT', this.onCounterStopped);
    }

    updateState () {
        const usedIndexes = [];
        this.state.status = this.state.stateList.TICKING;
        this.state.questionCount++;
        this.state.answers = [];
        for (let i = 0; i < this.state.answersCount; i++) {

            let index = null;
            do {
                index = this.randomInt(0, this.data.length - 1);
            } while (usedIndexes.indexOf(index) !== -1);
            usedIndexes.push(index);

            const entry = this.data[index];
            this.state.answers.push({
                region: entry.region,
                isAnswer: false,
                number: entry.numbers[this.randomInt(0, entry.numbers.length - 1)]
            });
        }
        const index = this.randomInt(0, this.state.answers.length - 1);
        this.state.answers[index].isAnswer = true;
    }

    setNewQuestion () {
        this.children.counter.resetCount();
        this.updateState();
        this.children.button.update();
        this.children.questionCounter.update();
        this.children.question.update();
        this.children.answers.update();
        this.children.counter.startCount();
    }

    start () {
        super.start();
        this.children.counter.startCount();
    }

    checkAnswers () {
        this.children.answers.checkAnswers();
    }

    onCounterStopped () {
        this.state.status = this.state.stateList.NEXT;
        this.children.button.dispatchEvent(new CustomEvent('statusChanged', {detail: {status: this.state.status}}));
        this.checkAnswers();
    }


    /**
     * Util function
     * @param {number} start
     * @param {number} stop
     * @return {number}
     */
    randomInt (start, stop) {
        return Math.floor(Math.random() * ((stop + 1) - start) + start);
    }

}