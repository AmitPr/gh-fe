declare class API {
    private static instance;
    static get Instance(): API;
    token: string | null;
    user: any;
    get isAuthenticated(): boolean;
    private constructor();
    verifyToken(token: string): Promise<boolean>;
    tryFetchPost(postFileName: string): Promise<import("@octokit/types").OctokitResponse<{
        type: string;
        size: number;
        name: string;
        path: string;
        content?: string | undefined;
        sha: string;
        url: string;
        git_url: string | null;
        html_url: string | null;
        download_url: string | null;
        _links: {
            git: string | null;
            html: string | null;
            self: string;
        };
    }[] | {
        type: string;
        encoding: string;
        size: number;
        name: string;
        path: string;
        content: string;
        sha: string;
        url: string;
        git_url: string | null;
        html_url: string | null;
        download_url: string | null;
        _links: {
            git: string | null;
            html: string | null;
            self: string;
        };
        target?: string | undefined;
        submodule_git_url?: string | undefined;
    } | {
        type: string;
        target: string;
        size: number;
        name: string;
        path: string;
        sha: string;
        url: string;
        git_url: string | null;
        html_url: string | null;
        download_url: string | null;
        _links: {
            git: string | null;
            html: string | null;
            self: string;
        };
    } | {
        type: string;
        submodule_git_url: string;
        size: number;
        name: string;
        path: string;
        sha: string;
        url: string;
        git_url: string | null;
        html_url: string | null;
        download_url: string | null;
        _links: {
            git: string | null;
            html: string | null;
            self: string;
        };
    }, 200>>;
    uploadPost(postFileName: string, content: string, sha: string | undefined): Promise<import("@octokit/types").OctokitResponse<{
        content: {
            name?: string | undefined;
            path?: string | undefined;
            sha?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            html_url?: string | undefined;
            git_url?: string | undefined;
            download_url?: string | undefined;
            type?: string | undefined;
            _links?: {
                self?: string | undefined;
                git?: string | undefined;
                html?: string | undefined;
            } | undefined;
        } | null;
        commit: {
            sha?: string | undefined;
            node_id?: string | undefined;
            url?: string | undefined;
            html_url?: string | undefined;
            author?: {
                date?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
            } | undefined;
            committer?: {
                date?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
            } | undefined;
            message?: string | undefined;
            tree?: {
                url?: string | undefined;
                sha?: string | undefined;
            } | undefined;
            parents?: {
                url?: string | undefined;
                html_url?: string | undefined;
                sha?: string | undefined;
            }[] | undefined;
            verification?: {
                verified?: boolean | undefined;
                reason?: string | undefined;
                signature?: string | null | undefined;
                payload?: string | null | undefined;
            } | undefined;
        };
    }, 200> | import("@octokit/types").OctokitResponse<{
        content: {
            name?: string | undefined;
            path?: string | undefined;
            sha?: string | undefined;
            size?: number | undefined;
            url?: string | undefined;
            html_url?: string | undefined;
            git_url?: string | undefined;
            download_url?: string | undefined;
            type?: string | undefined;
            _links?: {
                self?: string | undefined;
                git?: string | undefined;
                html?: string | undefined;
            } | undefined;
        } | null;
        commit: {
            sha?: string | undefined;
            node_id?: string | undefined;
            url?: string | undefined;
            html_url?: string | undefined;
            author?: {
                date?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
            } | undefined;
            committer?: {
                date?: string | undefined;
                name?: string | undefined;
                email?: string | undefined;
            } | undefined;
            message?: string | undefined;
            tree?: {
                url?: string | undefined;
                sha?: string | undefined;
            } | undefined;
            parents?: {
                url?: string | undefined;
                html_url?: string | undefined;
                sha?: string | undefined;
            }[] | undefined;
            verification?: {
                verified?: boolean | undefined;
                reason?: string | undefined;
                signature?: string | null | undefined;
                payload?: string | null | undefined;
            } | undefined;
        };
    }, 201>>;
}
export { API };
