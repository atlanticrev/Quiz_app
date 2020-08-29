import Component from './base/Component';

export default class Answers extends Component {

    static get defaults () {
        return {
            data: null
        }
    }

    constructor(options) {
        options = Object.assign({}, Answers.defaults, options);
        super(options);

        this.bindListeners();

        /*
            data: [
                {
                    regionName: '...',
                    number: '...'
                },
                {
                     regionName: '...',
                     number: '...'
                }
            ]
        */

        this.el = this.createEl(this.createTemplate());
        this.state = [];
        const buttons = Array.from(this.el.querySelectorAll('.answer-button'));
        for (let button of buttons) {
            // @todo delegate?
            button.addEventListener('click', this.onLick);
            this.state.push(
                {
                    index: button.dataset.index,
                    button,
                    textEl: button.querySelector('.answers-text'),
                    checked: false
                }
            );
        }
    }

    bindListeners () {
        this.onLick = this.onLick.bind(this);
    }

    onLick (e) {
        const answer = this.state.find(answer => answer.index === e.target.dataset.index);
        answer.checked = !answer.checked;
        console.log(answer.index, answer.checked);
        if (answer.checked) {
            e.target.classList.add('checked');
        } else {
            e.target.classList.remove('checked');
        }
    }

    createTemplate () {
        return `
            <div class="answers-container">
                <div class="answer-button" data-index="1">
                    <snap class="answers-text">163</snap>
                </div>                        
                <div class="answer-button" data-index="2">
                    <snap class="answers-text">178</snap>
                </div>                        
                <div class="answer-button" data-index="3">
                    <snap class="answers-text">01</snap>
                </div>                        
                <div class="answer-button" data-index="4">
                    <snap class="answers-text">763</snap>
                </div>                        
            </div>
        `;
    }

    setValues () {
        for (let i = 0; i < this.data.length; i++) {
            this.state[i].textEl.textContent = this.data[i].number;
        }
    }

}