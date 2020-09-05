import Component from './base/Component';

export default class QuestionCounter extends Component {

    constructor(options) {
        super(options);

        this.el = this.createEl(this.createTemplate());
        this.countCurrEl = this.el.querySelector('.question-counter-current');
    }

    createTemplate () {
        return `
            <div class="question-counter-container">
                <span class="question-counter-current">Вопрос ${this.data.questionCount}</span>
                <span class="question-counter-separator">/</span>                            
                <span class="question-counter-all">${this.data.allQuestions}</span>                            
            </div>
        `;
    }

    update () {
        this.countCurrEl.textContent = `Вопрос ${this.data.questionCount}`;
    }

}