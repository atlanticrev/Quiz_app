import Component from "./Component";

export default class Page extends Component {

    constructor(options) {
        super(options);

        this.el = this.createEl(this.createTemplate());
        this.container = this.el.querySelector('.container');

        this.onOpened = this.onOpened.bind(this);
        this.onClosed = this.onClosed.bind(this);
    }

    createTemplate () {
        return `
            <div class="page">
                <div class="container"></div>
            </div>
        `;
    }

    open (animate = true) {
        // console.warn(`${this.constructor.name} isAnimate:`, animate);
        this.render(document.body);
        if (animate) {
            this.el.style.setProperty('--transition', 'all .25s ease-out');
            requestAnimationFrame(
                () => requestAnimationFrame(
                    () => {
                        this.el.addEventListener('transitionend', this.onOpened);
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

    onOpened() {
        this.el.removeEventListener('transitionend', this.onOpened);
        this.el.style.setProperty('--transition', 'none');
        this.start();
    }

    close (animate = true) {
        if (animate) {
            this.el.style.setProperty('--transition', 'all .25s ease-out');
            requestAnimationFrame(
                () => requestAnimationFrame(
                    () => {
                        this.el.addEventListener('transitionend', this.onClosed);
                        this.el.style.setProperty('opacity', '0');
                        this.el.style.setProperty('--scale-factor', '.5');
                    }
                )
            );
        } else {
            this.remove();
        }
    }

    onClosed () {
        this.el.removeEventListener('transitionend', this.onClosed);
        this.remove();
    }

    start () {
        // console.warn(`${this.constructor.name}: start`);
    }

}