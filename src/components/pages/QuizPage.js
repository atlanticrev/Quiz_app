import Page from '../base/Page';
import Counter from '../Counter';
import QuestionCounter from '../QuestionCounter';
import Question from '../Question';
import Answers from '../Answers';
import Button from '../Button';

import { randomInt } from "../../Utils";

import storage from '../../Storage';

import Constants from "../base/Constants";

export default class QuizPage extends Page {

    constructor(options) {
        super(options);

        this.storage = storage;

        this.state = {
            status: Constants.STATE_LIST.TICKING,
            answers: [],
            allAnswers: 4,
            questionCount: 0,
            allQuestions: this.data.allQuestions || 10,
            needCounter: this.data.needCounter || true,
            questionTime: this.data.needCounter
                ? this.data.questionTime || 5
                : null
        };

        this.updateState();

        this.components = {
            counter:         this.data.needCounter ? new Counter({data: this.state}) : null,
            questionCounter: new QuestionCounter({data: this.state}),
            question:        new Question({data: this.state}),
            answers:         new Answers({data: this.state}),
            button:          new Button({data: this.state})
        };

        this.appendComponents();

        this.onAnswerSelected = this.onAnswerSelected.bind(this);
        this.onClick = this.onClick.bind(this);

        this.components.button.addEventListener('Button.EVENT_CLICK', this.onClick);
        this.components.counter && this.components.counter.addEventListener('Counter.EVENT_STOP_COUNT', this.onAnswerSelected);
    }

    updateState () {
        this.state.status = Constants.STATE_LIST.TICKING;

        this.state.questionCount++;

        // Form a new array of answers
        this.state.answers = [];
        const usedIndexes = [];
        for (let i = 0; i < this.state.allAnswers; i++) {
            // Choose random region from a storage
            let index = null;
            do {
                index = randomInt(0, this.storage.length - 1);
            } while (usedIndexes.indexOf(index) !== -1);
            usedIndexes.push(index);

            // Take this question from a storage
            const entry = this.storage[index];
            this.state.answers.push({
                region: entry.region,
                number: entry.numbers[randomInt(0, entry.numbers.length - 1)],
                isAnswer: false
            });
        }
        // Set random answer to true answer
        const index = randomInt(0, this.state.answers.length - 1);
        this.state.answers[index].isAnswer = true;
    }

    setNewQuestion () {
        this.components.counter && this.components.counter.reset();
        this.updateState();
        this.components.button.update();
        this.components.questionCounter.update();
        this.components.question.update();
        this.components.answers.update();
        this.components.counter && this.components.counter.start();
    }

    start () {
        super.start();
        this.components.counter && this.components.counter.start();
    }

    checkAnswers () {
        this.components.answers.checkAnswers();
    }

    onAnswerSelected () {
        this.state.status = Constants.STATE_LIST.NEXT;
        this.components.button.dispatchEvent('statusChanged', {detail: {status: this.state.status}});
        this.checkAnswers();
    }

    onClick () {
        if (this.state.status === Constants.STATE_LIST.TICKING) {
            if (this.components.counter) {
                this.components.counter.stop();
            } else {
                this.onAnswerSelected();
            }
        } else if (this.state.status === Constants.STATE_LIST.NEXT) {
            this.setNewQuestion();
        }
    }

}