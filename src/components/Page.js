import Component from './base/Component';
import Counter from './Counter';
import QuestionCounter from './QuestionCounter';
import Question from './Question';
import Answers from './Answers';
import NextButton from './NextButton';

export default class Page extends Component {

    constructor() {
        super();
        this.el = this.createEl(this.createTemplate());
        this.container = this.el.querySelector('.container');
        this.render(document.body);

        this.appendComponent(new Counter(), this.container);
        this.appendComponent(new QuestionCounter(), this.container);
        this.appendComponent(new Question(), this.container);
        this.appendComponent(new Answers(), this.container);
        this.appendComponent(new NextButton(), this.container);

        this.onTransitionEnd = this.onTransitionEnd.bind(this);
    }

    createTemplate () {
        return `
            <div class="page">
                <div class="container"></div>
            </div>
        `;
    }

    setActive () {
        requestAnimationFrame(
            () => requestAnimationFrame(
                () => {
                    this.el.style.setProperty('opacity', '1');
                    this.el.style.setProperty('--scale-factor', '1');
                }
            )
        );
    }

    onTransitionEnd () {
        this.el.removeEventListener('transitionend', this.onTransitionEnd);
        this.el.parentElement.removeChild(this.el);
    }

    setInactive () {
        this.el.addEventListener('transitionend', this.onTransitionEnd);
        this.el.style.setProperty('opacity', '0');
        this.el.style.setProperty('--scale-factor', '.5');
    }

}

Page.LAST_ZINDEX = 0;