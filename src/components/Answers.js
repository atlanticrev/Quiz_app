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

        this.el = this.createEl(this.createTemplate());

        this.state = null;
        this.updateState();
        this.bindListeners();
    }

    update () {
        console.log(this.data);
        this.updateState();
        this.resetCheck();
        this.setValues();
    }

    updateState () {
        const buttons = Array.from(this.el.querySelectorAll('.answer-button'));
        this.state = [];
        for (let button of buttons) {
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

        for (let button of this.state) {
            // @todo delegate?
            button.button.addEventListener('click', this.onLick);
        }
    }

    onLick (e) {
        if (this.data.status === this.data.stateList.NEXT) {
            return;
        }
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
                <div class="answer-button" data-index="0">
                    <snap class="answers-text">${this.data.answers[0].number}</snap>
                </div>                        
                <div class="answer-button" data-index="1">
                    <snap class="answers-text">${this.data.answers[1].number}</snap>
                </div>                        
                <div class="answer-button" data-index="2">
                    <snap class="answers-text">${this.data.answers[2].number}</snap>
                </div>                        
                <div class="answer-button" data-index="3">
                    <snap class="answers-text">${this.data.answers[3].number}</snap>
                </div>                        
            </div>
        `;
    }

    resetCheck () {
        for (let button of this.state) {
            button.button.classList.remove('is-true');
            button.button.classList.remove('is-false');
            button.button.classList.remove('checked');
            button.button.style.setProperty('animation', '');
        }
    }

    checkAnswers () {
        for (let button of this.state) {
            if (this.data.answers[button.index].isAnswer) {
                button.button.classList.add('is-true');
                button.button.style.setProperty('animation', '1s ease-in-out scale-up');
            } else if (button.checked && !this.data.answers[button.index].isAnswer) {
                button.button.classList.add('is-false');
            }
        }
    }

    setValues () {
        for (let i = 0; i < this.data.answers.length; i++) {
            this.state[i].textEl.textContent = this.data.answers[i].number;
        }
    }

}