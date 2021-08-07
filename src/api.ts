import { request } from '@octokit/request';
import { Constants } from './constants';

class API {
    //Singleton Instance
    private static instance: API = new API();

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public token: string | null;
    public user: any;

    public get isAuthenticated() { return this.token !== null };

    private constructor() {
        this.token = null;
        this.user = null;
    }

    public verifyToken(token: string): Promise<boolean> {
        var requestWithAuth = request.defaults({
            headers: {
                authorization: `token ${token}`
            }
        });
        var response = requestWithAuth('GET /user');

        var result: Promise<boolean> = new Promise<boolean>(async (resolve, reject) => {
            try {
                var res = await response;
                if (res.data['login'].toUpperCase() === Constants.REPO_OWNER.toUpperCase()) {
                    this.token = token;
                    this.user = res.data;
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (err) {
                reject(err);
            }
        });
        return result;
    }
    
    public fetchFileTree(){
        var requestWithAuth = request.defaults({
            headers: {
                authorization: `token ${this.token}`
            }
        });
        var result = requestWithAuth('GET /repos/{owner}/{repo}/git/trees/master?recursive=1', {
            owner: Constants.REPO_OWNER,
            repo: Constants.REPO_NAME,
        });
        return result;
    }

    public uploadPost(targetPath:string, content: string, sha:string|undefined){
        var requestWithAuth = request.defaults({
            headers: {
                authorization: `token ${this.token}`
            }
        });
        var result = requestWithAuth('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: Constants.REPO_OWNER,
            repo: Constants.REPO_NAME,
            path: targetPath,
            message: sha?`Edit File ${targetPath} (automated)`:`Add File ${targetPath} (automated)`,
            content: content,
            sha: sha,
        })
        return result;
    }
}

const APIInstance = API.Instance;

export { API };