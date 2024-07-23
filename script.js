"use strict";

import { UserRequests } from "./user_requests.js";
import { HtmlManager } from "./html_manager.js";


const avatarPreview = document.getElementById("avatar");
const namePreview = document.getElementById("name");
const loginPreview = document.getElementById("login")

const following = document.getElementById("following");
const followers = document.getElementById("followers");

const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");

const reposPreview = document.getElementById("repos-preview");


searchButton.onclick = function() {
    const entered = searchInput.value;

    if (typeof entered === "string" && entered.trim().length > 0) {
        UserRequests.getUser(entered.trim()).then(function(response) {
            
            if (response["status"] !== "404") avatarPreview.src = response["avatar_url"];
            else {
                document.getElementById("container")["background-image"] = `url("./assets/not_found.jpg")`;
                avatarPreview.src = "./assets/unknown_user.jpg";
            };

            namePreview.innerHTML = response["name"];
            loginPreview.innerHTML = response["login"];

            following.innerHTML = `${response["following"]} <span style="color: #b5b5b5; font-weight: normal;">following</span>`;
            followers.innerHTML = `${response["followers"]} <span style="color: #b5b5b5; font-weight: normal;">followers</span>`;
            
            UserRequests.getUserRepos(response).then(function(repos) {
                reposPreview.querySelectorAll("div.repo").forEach(entry => entry.remove());
                HtmlManager.createRepos(repos, reposPreview);

                console.log(repos);
            });
            
        });


    };
}

