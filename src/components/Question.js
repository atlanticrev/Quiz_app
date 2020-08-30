import Component from './base/Component';

export default class Question extends Component {

    static get defaults () {
        return {
            text: 'Какой код у этого региона?',
            region: 'Не установлено'
        };
    }

    constructor(options) {
        options = Object.assign({}, Question.defaults, options);
        super(options);

        this.el = this.createEl(this.createTemplate());
        this.textEl = this.el.querySelector('.question-text');
        this.regionEl = this.el.querySelector('.question-region');

        this.update();
    }

    createTemplate () {
        return `
            <div class="question-container">
                <p class="question-text">${this.text}</p>
                <span class="question-region">${this.region}</span>                          
            </div>
        `;
    }

    update () {
        const currAnswer = this.data.answers.find(answer => answer.isAnswer === true);
        this.regionEl.textContent = currAnswer.region;
    }

}