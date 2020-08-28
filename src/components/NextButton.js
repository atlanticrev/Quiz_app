import Component from './base/Component';

export default class NextButton extends Component {

    static get defaults () {
        return {
            text: 'Дальше',
        };
    }

    constructor(options) {
        super(options);
        options = Object.assign({}, NextButton.defaults, options);

        this.text = options.text;

        this.el = this.createEl(this.createTemplate());
        this.render(document.querySelector('.container'));
    }

    createTemplate () {
        return `
            <button class="next-button">${this.text}</button>  
        `;
    }

}