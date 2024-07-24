"use strict";

import { UserRequests } from "./user_requests.js";
import { HtmlManager } from "./html_manager.js";


const avatarPreview = document.getElementById("avatar");
// const namePreview = document.getElementById("name");
// const loginPreview = document.getElementById("login")

// const following = document.getElementById("following");
// const followers = document.getElementById("followers");

const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");

const reposPreview = document.getElementById("repos-preview");
const searchType = document.getElementById("search-type");


function setUserData(userResponse) {
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


searchButton.onclick = function() {
    const entered = searchInput.value.trim();

    const searchTypeValue = searchType.value;
    const getTarget = UserRequests[
        `get${searchTypeValue.slice(0, searchTypeValue.length - 1)}`
    ];  // very bad practice!!!
    
    reposPreview.querySelectorAll("div.repo").forEach(entry => entry.remove());  // clear repositories preview

    if (typeof entered === "string" && entered.trim().length > 0) {
        getTarget(entered).then(function(response) {
            console.log(response);
            
            setUserData(response);
            
            UserRequests.getTargetRepos(response).then(function(repos) {
                if (repos.length > 1) {
                    HtmlManager.createRepos(repos, reposPreview);
                    console.log(repos);
                }
            }); 
        });
    };
}

