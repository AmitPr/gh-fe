import { AdminPortal } from '..';
import { API } from '../api';
import template from './HomeScreen.html';
import { UploadScreen } from './UploadScreen';
import {Toast} from 'bootstrap';

class HomeScreen {
    container: HTMLDivElement;
    greeting: HTMLHeadingElement;
    constructor(status?:string){
        // Replace {ToastStatus} with status
        document.querySelector("#mount")!.innerHTML = template;
        if (status){
            document.querySelector('#status')!.innerHTML=status;
            document.querySelector('#status-bar')!.classList.remove('hidden');
        }
        this.container = document.querySelector('#home-screen-container') as HTMLDivElement;
        this.greeting = document.querySelector("#header-greeting") as HTMLHeadingElement;
        this.greeting.innerHTML = `Welcome back, ${API.Instance.user['name'].split(' ')[0]}`;
        document.querySelector("#upload-button")!.addEventListener("click", () => {
            this.container.classList.add("animated-reverse");
            setTimeout(() => {
                AdminPortal.Instance.currentScreen=new UploadScreen();
            }, 500);
        });
    }
}
export { HomeScreen };