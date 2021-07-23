import { request } from "https://cdn.skypack.dev/@octokit/request";

function post() {
    // Read FormData
    var formData = new FormData(window.document.forms.SubmitPostForm);
    console.log("token " + formData.get("token"));
    const requestWithAuth = request.defaults({
        headers: {
            authorization: "token " + formData.get("token"),
        },
    });
    var result = requestWithAuth('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'amitpr',
        repo: 'unblogged',
        path: formData.get("filename"),
        message: 'Add post (automated)',
        content: btoa(formData.get("content")),
    })
    console.log(result);
}
window.post = post;