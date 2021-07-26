export abstract class Constants {
    static readonly REPO_URL: string = "https://github.com/AmitPr/unblogged";
    static readonly REPO_NAME: string = Constants.REPO_URL.split("/").reverse()[0];
    static readonly REPO_OWNER: string = Constants.REPO_URL.split("/").reverse()[1];
    static readonly TOKEN_REGEX: string = "ghp_([a-zA-Z0-9]{36})$";
}