"use strict";


export class HtmlManager {
    static createRepos(repos, parentElement) {
        repos.forEach(function(entry) {
            const repo = HtmlManager.createRepo(entry);
            parentElement.appendChild(repo);
        });
    }

    static createRepo(repo) {
        const container = document.createElement("div");
        container.classList.add("repo");

        const repoName = document.createElement("label");
        repoName.appendChild(document.createTextNode(repo["name"]));
        repoName.classList.add("name");
        container.appendChild(repoName);

        if (repo["description"] !== null) {
            const repoDescription = document.createElement("label");
            repoDescription.appendChild(document.createTextNode(repo["description"]));
            repoDescription.classList.add("description");
            container.appendChild(repoDescription);
        }

        return container;
    }
}