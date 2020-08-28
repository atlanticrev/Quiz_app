import Component from './base/Component';

export default class Answers extends Component {

    static get defaults () {
        return {
            text: 'Не установлено',
            regionNumber: 'Не установлено'
        };
    }

    constructor(options) {
        super(options);
        options = Object.assign({}, Answers.defaults, options);

        this.text = options.text;
        this.regionNumber = options.regionNumber;

        this.el = this.createEl(this.createTemplate());
        this.render(document.querySelector('.container'));

        this.textEl = this.el.querySelector('.question-text');
        this.regionNumberEl = this.el.querySelector('.question-region-number');
    }

    createTemplate () {
        return `
            <div class="answers-container">
                <div class="answer-button">
                    <snap class="answers-text">163</snap>
                </div>                        
                <div class="answer-button">
                    <snap class="answers-text">178</snap>
                </div>                        
                <div class="answer-button">
                    <snap class="answers-text">01</snap>
                </div>                        
                <div class="answer-button">
                    <snap class="answers-text">763</snap>
                </div>                        
            </div>
        `;
    }

}