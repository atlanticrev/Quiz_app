import Component from './base/Component';

export default class Counter extends Component {

    constructor() {
        super();

        this.counterNumber = 10;

        this.el = this.createEl(this.createTemplate());
        this.render(document.querySelector('.container'));

        this.counterNumberEl = this.el.querySelector('.counter-number');
    }

    createTemplate () {
        return `
            <div class="counter-container">
                <span class="counter-number">${this.counterNumber}</span>                            
            </div>
        `;
    }

}