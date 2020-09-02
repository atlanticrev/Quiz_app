import Page from '../base/Page';
import Button from '../Button';

export default class StartPage extends Page {

    constructor(options) {
        options = Object.assign({}, StartPage.defaults, options);
        super(options);

        this.state = {
            needCounter: false,
            questionsCount: 10,

        };

        this.updateState();

        this.children = {
            button:          new Button({data: this.state})
        };

        this.appendComponent(this.children.button, this.container);

        this.onClick = this.onClick.bind(this);
        this.children.button.addEventListener('Button.EVENT_CLICK', this.onClick);
    }

}