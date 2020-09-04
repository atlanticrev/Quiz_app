import Events from './Events';

export default class PageManager extends Events {

    constructor() {
        super();
        this.pages = [];
        this.currPage = null;
    }

    addPage (page) {
        this.pages.push(page);
    }

    openPage (name, animate = true) {
        // console.warn(`${this.constructor.name}:`, animate);
        if (this.currPage) {
            this.closePage(false);
        }
        const page = this.pages.find(page => page.name === name);
        if (page) {
            this.currPage = page;
            page.open(animate);
        } else {
            throw new Error('There is no such page');
        }
    }

    closePage (animate = true) {
        if (!this.currPage) {
            throw new Error('There is no opened pages');
        }
        this.currPage.close(animate);
    }

    flush () {
        this.pages = [];
    }

}