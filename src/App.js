export default class App {

    constructor () {
        this.el = null;
    }

    log () {
        console.log('from App');
    }

    activate () {
        this.el = document.createElement('div');
        this.el.classList.add('block');
        document.body.appendChild(this.el);
    }

}