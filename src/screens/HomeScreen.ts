import template from './HomeScreen.html';

class HomeScreen {
    container: HTMLDivElement;
    constructor(){
        document.querySelector("#mount")!.innerHTML = template;
        this.container = document.querySelector('#home-screen-container') as HTMLDivElement;
    }
}
export { HomeScreen };