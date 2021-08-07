import { Messages } from '../messages';
import { Constants } from '../constants';

import { API } from '../api';
import { AdminPortal } from '..';
import { HomeScreen } from './HomeScreen';

import template from "./TokenValidation.html";
import { UploadScreen } from './UploadScreen';

class TokenValidation {
    input: HTMLInputElement;
    container: HTMLDivElement;
    feedback: HTMLDivElement;
    verifyButton: HTMLButtonElement;

    constructor() {
        document.querySelector("#mount")!.innerHTML = template;
        this.container = document.querySelector('#token-input-container') as HTMLDivElement;
        this.input = document.querySelector('#token-input') as HTMLInputElement;
        this.input.addEventListener('keyup', this.onKeyup.bind(this));
        this.feedback = document.querySelector('#token-feedback') as HTMLDivElement;
        this.verifyButton = document.querySelector('#token-verify') as HTMLButtonElement;
        this.verifyButton.addEventListener('click', this.onVerifyClick.bind(this));
        this.onKeyup(null);
    }

    onVerifyClick(event: MouseEvent) {
        var result: Promise<boolean> = API.Instance.verifyToken(this.input.value);
        result.then((response: boolean) => {
            if (response) {
                this.input.classList.add("is-valid");
                this.input.classList.remove("is-invalid");
                this.container.classList.add("animated");
                setTimeout(() => {
                    this.dispose();
                }, 500);
                this.feedback.innerHTML = Messages.TOKEN_VERIFIED;
            } else {
                this.input.classList.add("is-invalid");
                this.input.classList.remove("is-valid");
                this.feedback.innerHTML = Messages.TOKEN_UNAUTHORIZED;
            }
        });
        result.catch((error: any) => {
            if (error.response.status === 401) {
                this.input.classList.add("is-invalid");
                this.input.classList.remove("is-valid");
                this.feedback.innerHTML = Messages.TOKEN_INVALID;
            }
        });
    }

    onKeyup(event: KeyboardEvent | null) {
        var token: string = this.input.value;
        this.input.classList.remove("is-invalid");
        this.input.classList.remove("is-valid");

        var isValid: boolean = new RegExp(Constants.TOKEN_REGEX).test(token);
        if (token.length > 0 && !isValid) {
            this.input.classList.add("is-invalid");
            if (this.verifyButton.classList.contains("animated")) {
                this.verifyButton.classList.remove("animated");
                this.verifyButton.classList.add("animated-reverse");
            }
            this.feedback.innerHTML = Messages.TOKEN_FORMAT_ERROR;
        } else if (isValid) {
            this.verifyButton.classList.add("animated");
            this.verifyButton.classList.remove("animated-reverse");
        }
    }

    dispose() {
        AdminPortal.Instance.currentScreen = new UploadScreen();
    }
}

export { TokenValidation };