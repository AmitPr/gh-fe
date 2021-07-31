declare class TokenValidation {
    input: HTMLInputElement;
    container: HTMLDivElement;
    feedback: HTMLDivElement;
    verifyButton: HTMLButtonElement;
    constructor();
    onVerifyClick(event: MouseEvent): void;
    onKeyup(event: KeyboardEvent | null): void;
    dispose(): void;
}
export { TokenValidation };
