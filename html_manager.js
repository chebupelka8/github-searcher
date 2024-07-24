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

    static setUserData(userResponse) {
        const avatarPreview = document.getElementById("avatar");

        if (userResponse["status"] !== "404") avatarPreview.src = userResponse["avatar_url"];
        else avatarPreview.src = "./assets/unknown_user.jpg";

        const createPersonalUserData = function(...ids) {
            ids.forEach(id => {
                document.getElementById(id).appendChild(
                    document.createTextNode(userResponse[id])
                );
            });
        }

        const createTrackingUserData = function(...ids) {
            ids.forEach(id => {
                document.getElementById(id).innerHTML = `${userResponse[id]} <span style="color: #b5b5b5; font-weight: normal;">${id}</span>`;
            });
        }

        createPersonalUserData("name", "login");
        createTrackingUserData("following", "followers");
    }
}