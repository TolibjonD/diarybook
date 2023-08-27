module.exports = class TextFilters {
    constructor(list) {
        this.list = list
    }
    textTrimmer(end) {
        this.list.forEach(element => {
            if (element.text.length > end) {
                element.text = element.text.slice(0, end) + "..."
            }
        });
        return this.list
    }
}