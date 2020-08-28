import Component from './base/Component';

export default class QuestionCounter extends Component {

    static get defaults () {
        return {
            countAll: 10,
            countCurr: 1
        };
    }

    constructor(options) {
        super(options);
        options = Object.assign({}, QuestionCounter.defaults, options);
        this.countAll = options.countAll;
        this.countCurr = options.countCurr;

        this.el = this.createEl(this.createTemplate());
        this.render(document.querySelector('.container'));

        this.countCurrEl = this.el.querySelector('.question-counter-current');
        this.countAllEl = this.el.querySelector('.question-counter-all');
    }

    createTemplate () {
        return `
            <div class="question-counter-container">
                <span class="question-counter-current">Вопрос ${this.countCurr}</span>
                <span class="question-counter-separator">/</span>                            
                <span class="question-counter-all">${this.countAll}</span>                            
            </div>
        `;
    }

}