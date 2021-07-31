
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
    }

    attemptUpload() {
        var targetPath = (document.querySelector('#post-path') as HTMLInputElement).value;
        var headline = (document.querySelector('#post-headline') as HTMLInputElement).value;
        var description = (document.querySelector('#post-description') as HTMLInputElement).value;

        //Fetch the input file as text
        var file_input = document.querySelector('#post-content') as HTMLInputElement;
        if (file_input.files !== null && file_input.files.length > 0) {
            var file = file_input.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                var header = `---
headline: ${headline}  
description: ${description}  
---
`
                var content: string = header + e.target?.result;
                var fetchPromise = API.Instance.tryFetchPost(targetPath + '.md');
                var sha: string | undefined = undefined;
                fetchPromise.then((response) => {
                    sha = response.data['sha' as keyof typeof response.data];
                });
                fetchPromise.finally(() => {
                    var uploadPromise = API.Instance.uploadPost(targetPath + '.md', content, sha);
                    uploadPromise.then(() => {
                        this.container.classList.add('animated-reverse');
                        setTimeout(() => {
                            AdminPortal.Instance.currentScreen = new HomeScreen(status='Post Uploaded!');
                        }, 500);
                    }, (error) => {
                        this.container.classList.add('animated-reverse');
                        setTimeout(() => {
                            AdminPortal.Instance.currentScreen = new HomeScreen(status='Post Not Uploaded!');
                        }, 500);
                    });
                });
            };
            reader.readAsText(file);
        } else {

        }

    }
}
export { UploadScreen };