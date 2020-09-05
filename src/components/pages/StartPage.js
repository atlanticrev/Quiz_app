import Page from '../base/Page';
import Button from '../Button';
import Constants from "../base/Constants";

export default class StartPage extends Page {

    constructor(options) {
        super(options);

        this.state = {
            status: Constants.STATE_LIST.START,
            needCounter: true,
            allQuestions: 15,
            questionTime: 20
        };

        this.components = {
            button: new Button({role: 'start', text: 'start', data: this.state})
        };

        this.appendComponents();

        this.onClick = this.onClick.bind(this);
        this.components.button.addEventListener('Button.EVENT_CLICK', this.onClick);
    }

    start () {}

    onClick () {
        this.dispatchEvent('StartPage.EVENT_START_QUIZ', this.state);
    }

}