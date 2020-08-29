export default class PageManager extends EventTarget {

    constructor() {
        super();

        this.pages = [];
        this.currPage = null;
    }

    addPage (page) {
        this.pages.push(page);
    }

    openPage () {
        if (!this.pages.length) {
            throw new Error('No pages');
        }
        if (this.pages.length === 1) {
            this.currPage = this.pages[0];
            this.pages[0].open();
        } else {
            let pageWithMaxIndex = this.pages[0];
            for (let page of this.pages) {
                if (page.index > pageWithMaxIndex.index) {
                    pageWithMaxIndex = page;
                }
            }
            this.currPage = pageWithMaxIndex;
            pageWithMaxIndex.open();
        }
    }

    closePage () {
        if (!this.currPage) {
            throw new Error('No opened pages');
        }
        this.currPage.close();
    }

}