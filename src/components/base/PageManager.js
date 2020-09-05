import Events from './Events';

export default class PageManager extends Events {

    constructor() {
        super();
        this.pages = new Map();
        this.currPage = null;
    }

    /**
     * @param {Page} page
     */
    addPage (page) {
        this.pages.set(page.name, page);
    }

    /**
     * @param {string} name
     */
    deletePage (name) {
        if (this.pages.has(name)) {
            this.pages.delete(name);
        } else {
            throw new Error('There is no such page');
        }
    }

    flushPages () {
        this.pages.clear();
    }

    openPage (name, animate = true) {
        // console.warn(`${this.constructor.name}:`, animate);
        if (this.currPage) {
            this.closePage(false);
        }
        if (this.pages.has(name)) {
            this.currPage = this.pages.get(name);
            this.currPage.open(animate);
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

}