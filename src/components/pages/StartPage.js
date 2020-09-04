import Page from '../base/Page';
import Button from '../Button';
import Constants from "../base/Constants";

export default class StartPage extends Page {

    static get defaults () {}

    constructor(options) {
        options = Object.assign({}, StartPage.defaults, options);
        super(options);

        this.state = {
            status: Constants.STATE_LIST.START,
            needCounter: false,
            questionsCount: 10,
            timeOnAnswer: 10
        };

        this.components = {
            button: new Button({role: 'start', text: 'start', data: this.state})
        };

        for (let key of Object.keys(this.components)) {
            this.appendComponent(this.components[key], this.container);
        }

        this.onClick = this.onClick.bind(this);
        this.components.button.addEventListener('Button.EVENT_CLICK', this.onClick);
    }

    start () {}

    onClick () {
        console.warn('HERE', this);
        this.dispatchEvent('StartPage.EVENT_START_QUIZ', this.state);
    }

}