import Component from './base/Component';

export default class Question extends Component {

    static get defaults () {
        return {
            text: 'Какой код у этого региона?',
            regionNumber: 'Республика Адыгея'
        };
    }

    constructor(options) {
        options = Object.assign({}, Question.defaults, options);
        super(options);

        this.el = this.createEl(this.createTemplate());

        this.textEl = this.el.querySelector('.question-text');
        this.regionNumberEl = this.el.querySelector('.question-region-number');
    }

    createTemplate () {
        return `
            <div class="question-container">
                <p class="question-text">${this.text}</p>
                <span class="question-region-number">${this.regionNumber}</span>                          
            </div>
        `;
    }

}