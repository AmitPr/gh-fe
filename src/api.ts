import { request } from '@octokit/request';
import { Constants } from './constants';

class API {
    //Singleton Instance
    private static instance: API = new API();

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public token: string | null;

    private constructor() {
        this.token = null;
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
}

const APIInstance = API.Instance;

export { API };