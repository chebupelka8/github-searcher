"use strict";

import { UserRequests } from "./user_requests.js";
import { HtmlManager } from "./html_manager.js";


const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");

const reposPreview = document.getElementById("repos-preview");
const searchType = document.getElementById("search-type");


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
            
            HtmlManager.setUserData(response);
            
            UserRequests.getTargetRepos(response).then(function(repos) {
                if (repos.length > 1) {
                    HtmlManager.createRepos(repos, reposPreview);
                    console.log(repos);
                }
            }); 
        });
    };
}

