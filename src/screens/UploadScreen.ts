
import { AdminPortal } from '..';
import { API } from '../api';
import { HomeScreen } from './HomeScreen';
import template from './UploadScreen.html';

var ICON_FOLDER_OPEN = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
<path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
</svg>`;
var ICON_FOLDER_CLOSED = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16">
<path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
</svg>`;
var ICON_FILE = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file" viewBox="0 0 16 16">
<path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
<path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
</svg>`;

class UploadScreen {
    container: HTMLDivElement;
    tree: any[] = [];
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
            response.data.tree.forEach((file: any) => {
                this.tree.push(file);
                this.renderTree();
            });
        });
    }
    
    renderTree(){
        var root: HTMLDivElement = document.querySelector('#tree-root') as HTMLDivElement;
        root.innerHTML = '';
        this.tree.forEach((file: any) => {
            var isFolder: boolean = file.type === 'tree';
            var filePath: string = file.path;
            var parent:string = filePath.substring(0, filePath.lastIndexOf('/'));
            var fileName:string = filePath.substring(filePath.lastIndexOf('/') + 1);
            var element: string = `<li id="${filePath}" class="${isFolder ? 'folder' : 'file'}">${isFolder?`${ICON_FOLDER_OPEN} ${fileName}<ul></ul>`:`${ICON_FILE} ${fileName}`}</li>`;
            if (isFolder) {
                
            }
            if(parent === ''){
                root.innerHTML += element;
            }else{
                var parentElement = document.querySelector(`#${parent.replace('/','\\/')}>ul`) as HTMLDivElement;
                parentElement.innerHTML += element;
            }
        });
        document.querySelectorAll('li.file, li.folder').forEach((li) => {
            console.log(li);
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                (document.querySelector('#target-path') as HTMLInputElement)!.value = li.id;
            });
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
                var sha: string | undefined = undefined;
                this.tree.forEach((file: any) => {
                    if (file.path === targetPath) {
                        sha = file.sha;
                    }
                });
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
            fileReader.readAsDataURL(file);
        }
    }
}
export { UploadScreen };