import Component from "./Component";

export default class Page extends Component {

    static get defaults () {
        return {
            id: Date.now(),
            index: 1,
            components: null
        };
    }

    constructor(options) {
        options = Object.assign({}, Page.defaults, options);
        super(options);

        this.el = this.createEl(this.createTemplate());
        this.container = this.el.querySelector('.container');

        // this.bindListeners();
        this.onTransitionEndOpen = this.onTransitionEndOpen.bind(this);
        this.onTransitionEndClose = this.onTransitionEndClose.bind(this);
    }

    createTemplate () {
        return `
            <div class="page">
                <div class="container"></div>
            </div>
        `;
    }

    // bindListeners () {
    //     this.onTransitionEndOpen = this.onTransitionEndOpen.bind(this);
    //     this.onTransitionEndClose = this.onTransitionEndClose.bind(this);
    // }

    open (animate = true) {
        this.render(document.body);
        // console.warn(`${this.constructor.name}:`, animate);
        if (animate) {
            this.el.style.setProperty('--transition', 'all .25s ease-out');
            requestAnimationFrame(
                () => requestAnimationFrame(
                    () => {
                        this.el.addEventListener('transitionend', this.onTransitionEndOpen);
                        this.el.style.setProperty('--opacity', '1');
                        this.el.style.setProperty('--scale-factor', '1');
                    }
                )
            );
        } else {
            this.el.style.setProperty('--opacity', '1');
            this.el.style.setProperty('--scale-factor', '1');
        }
    }

    onTransitionEndOpen() {
        this.el.removeEventListener('transitionend', this.onTransitionEndOpen);
        this.el.style.setProperty('--transition', 'none');
        this.start();
    }

    close (animate = true) {
        if (animate) {
            this.el.style.setProperty('--transition', 'all .25s ease-out');
            requestAnimationFrame(
                () => requestAnimationFrame(
                    () => {
                        this.el.addEventListener('transitionend', this.onTransitionEndClose);
                        this.el.style.setProperty('opacity', '0');
                        this.el.style.setProperty('--scale-factor', '.5');
                    }
                )
            );
        } else {
            this.remove();
        }
    }

    onTransitionEndClose () {
        this.el.removeEventListener('transitionend', this.onTransitionEndClose);
        this.remove();
    }

    start () {
        console.warn(`${this.constructor.name}: start`);
    }

}