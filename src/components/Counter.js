import Component from './base/Component';

export default class Counter extends Component {

    static get defaults () {
        return {
            counter: 20,
        };
    }

    constructor(options) {
        options = Object.assign({}, Counter.defaults, options);
        super(options);

        this.initialCount = this.counter;
        this.countAll = this.counter;
        this.currProgress = 1 - this.counter / this.countAll;

        this.el = this.createEl(this.createTemplate());
        this.indicator = this.el.querySelector('.counter-number');

        this.intervalTick = this.intervalTick.bind(this);
    }

    createTemplate () {
        return `
            <div class="counter-container">
                <span class="counter-number">${this.countAll}</span>                            
            </div>
        `;
    }

    startCount () {
        this._interval = setInterval(this.intervalTick, 1000);
        this.el.style.setProperty('animation', '1s ease-in-out scale-up');
        this.dispatchEvent('Counter.EVENT_START_COUNT');
    }

    intervalTick () {
        if (this.counter === 0) {
            this.stopCount();
            return;
        }
        this.counter--;
        this.indicator.textContent = this.counter.toString();
        this.currProgress = 1 - this.counter / this.countAll;
        this.el.style.setProperty('--progress', `${this.currProgress * 100}%`);
    }

    stopCount () {
        clearInterval(this._interval);
        this.el.style.setProperty('animation', '');
        this.dispatchEvent('Counter.EVENT_STOP_COUNT');
    }

    resetCount () {
        this.counter = this.initialCount;
        this.indicator.textContent = this.counter.toString();
        this.currProgress = 1 - this.counter / this.countAll;
        this.el.style.setProperty('--progress', `${this.currProgress * 100}%`);
        this.dispatchEvent('Counter.EVENT_RESET_COUNT');
    }

}