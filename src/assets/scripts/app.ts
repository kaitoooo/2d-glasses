export default class App {
    constructor() {
        window.addEventListener(
            'DOMContentLoaded',
            () => {
                this.init();
            },
            false
        );
        window.addEventListener('scroll', () => {});
    }
    init() {
        // console.log('test');
    }
}
new App();
