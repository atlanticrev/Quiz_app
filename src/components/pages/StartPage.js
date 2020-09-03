import Page from '../base/Page';
import Button from '../Button';

export default class StartPage extends Page {

    static get defaults () {}

    constructor(options) {
        options = Object.assign({}, StartPage.defaults, options);
        super(options);

        this.state = {
            needCounter: false,
            questionsCount: 10,
            timeOnAnswer: 10
        };

        this.children = {
            button: new Button({data: this.state})
        };

        this.appendComponent(this.children.button, this.container);

        this.onClick = this.onClick.bind(this);
        this.children.button.addEventListener('Button.EVENT_CLICK', this.onClick);
    }

    createTemplate () {
        return `
            <div class="questions-count">
                <label class="questions-count__label" for="">
                    <input class="questions-count__input" type="number">
                </label>
            </div>
            <div class="time-on-answer">
                <label class="time-on-answer__label" for="">
                    <input class="time-on-answer__input" type="number">
                </label>
            </div>
            <button class="start-questions">Начать</button>
        `;
    }

}