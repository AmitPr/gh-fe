import { request } from "https://cdn.skypack.dev/@octokit/request";

const token_regex = new RegExp("ghp_([a-zA-Z0-9]{36})$");
document.getElementById("token-input").addEventListener("input", (event) => computeTokenInputClasses(event.target, document.getElementById("token-verify")));
computeTokenInputClasses(document.getElementById("token-input"), document.getElementById("token-verify"))

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

function computeTokenInputClasses(input, button) {
    var value = input.value;
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");

    var isvalid = token_regex.test(value);
    if (input.length > 0 && !isvalid) {
        input.classList.add("is-invalid");
        if (button.classList.contains("animated")) {
            button.classList.remove("animated");
            button.classList.add("animated-reverse");
        }
    } else if (isvalid) {
        button.classList.add("animated");
        button.classList.remove("animated-reverse");
    }
}

window.post = post;