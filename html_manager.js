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

        container.appendChild(document.createTextNode(repo["name"]));

        return container;
    }
}