import Component from './base/Component';
import Constants from "./base/Constants";

export default class Answers extends Component {

    constructor(options) {
        options = Object.assign({}, Answers.defaults, options);
        super(options);
        this.el = this.createEl(this.createTemplate());
        this.state = [];
        this.buttons = Array.from(this.el.querySelectorAll('.answer-button'));
        this.bindListeners();
        this.updateState();
    }

    update () {
        this.resetCheck();
        this.updateState();
        this.setValues();
    }

    updateState () {
        this.state = [];
        for (let button of this.buttons) {
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
        this.onClick = this.onClick.bind(this);
        this.el.addEventListener('click', this.onClick);
    }

    onClick (e) {
        if (this.data.status === Constants.STATE_LIST.NEXT) {
            return;
        }
        const button = e.composedPath().find(el => el.tagName === 'BUTTON');
        if (!button) {
            return;
        }
        const answer = this.state[button.dataset.index];
        answer.checked = !answer.checked;
        // console.log(answer.index, answer.checked);
        if (answer.checked) {
            button.classList.add('checked');
        } else {
            button.classList.remove('checked');
        }
    }

    createTemplate () {
        let answers = [];
        for (let i = 0; i < this.data.allAnswers; i++) {
            answers.push(`
                <button class="answer-button" data-index="${i}">
                    <snap class="answers-text">${this.data.answers[i].number}</snap>
                </button>  
            `.trim());
        }

        return `
            <div class="answers-container">
                ${answers.join('')}                     
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