import Component from './base/Component';

export default class Counter extends Component {

    constructor(options) {
        super(options);

        this.currValue = this.data.questionTime;
        this.startValue = this.data.questionTime;

        this.currProgress = 0;

        this.el = this.createEl(this.createTemplate());
        this.indicator = this.el.querySelector('.counter-number');

        this.tick = this.tick.bind(this);
    }

    createTemplate () {
        return `
            <div class="counter-container">
                <span class="counter-number">${this.data.questionTime}</span>                            
            </div>
        `;
    }

    start () {
        this._interval = setInterval(this.tick, 1000);
        this.el.style.setProperty('animation', '1s ease-in-out scale-up');
        this.dispatchEvent('Counter.EVENT_START_COUNT');
    }

    tick () {
        if (this.currValue === 0) {
            this.stop();
            return;
        }
        this.currValue--;
        this.indicator.textContent = this.currValue.toString();
        this.currProgress = 1 - this.currValue / this.startValue;
        this.el.style.setProperty('--progress', `${this.currProgress * 100}%`);
    }

    stop () {
        clearInterval(this._interval);
        this.el.style.setProperty('animation', '');
        this.dispatchEvent('Counter.EVENT_STOP_COUNT');
    }

    reset () {
        this.currValue = this.startValue;
        this.currProgress = 0;
        this.indicator.textContent = this.currValue.toString();
        this.el.style.setProperty('--progress', `${this.currProgress * 100}%`);
        this.dispatchEvent('Counter.EVENT_RESET_COUNT');
    }

}