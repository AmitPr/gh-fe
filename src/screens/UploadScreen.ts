
import { AdminPortal } from '..';
import { API } from '../api';
import { HomeScreen } from './HomeScreen';
import template from './UploadScreen.html';

class UploadScreen {
    container: HTMLDivElement;
    constructor() {
        document.querySelector("#mount")!.innerHTML = template;
        this.container = document.querySelector("#upload-screen-container")!;
        document.querySelector('#back-button')!.addEventListener('click', () => {
            this.container.classList.add('animated-reverse');
            setTimeout(() => {
                AdminPortal.Instance.currentScreen = new HomeScreen();
            }, 500);
        });
        document.querySelector('#upload-button')!.addEventListener('click', this.attemptUpload.bind(this));
        API.Instance.fetchFileTree().then((response) => {
            console.log(response);
        });
    }

    attemptUpload() {
        var targetPath = (document.querySelector('#target-path') as HTMLInputElement).value;

        //Fetch the input file as text
        var fileInput = document.querySelector('#file-input') as HTMLInputElement;
        if (fileInput.files !== null && fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                var encodedFile: string = (fileReader.result as string).split(',')[1];
                var fetchPromise = API.Instance.tryFetchPost(targetPath);
                var sha: string | undefined = undefined;
                fetchPromise.then((response) => {
                    sha = response.data['sha' as keyof typeof response.data];
                });
                fetchPromise.finally(() => {
                    var uploadPromise = API.Instance.uploadPost(targetPath, encodedFile, sha);
                    uploadPromise.then(() => {
                        this.container.classList.add('animated-reverse');
                        setTimeout(() => {
                            AdminPortal.Instance.currentScreen = new HomeScreen(status = 'File Uploaded!');
                        }, 500);
                    }, (error) => {
                        this.container.classList.add('animated-reverse');
                        setTimeout(() => {
                            AdminPortal.Instance.currentScreen = new HomeScreen(status = 'File Not Uploaded!');
                        }, 500);
                    });
                });
            });
            fileReader.readAsDataURL(file);
        }
    }
}
export { UploadScreen };