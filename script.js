"use strict";

import { UserRequests } from "./user_requests.js";
import { HtmlManager } from "./html_manager.js";

import { Path } from "./path.js";


const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");

const reposPreview = document.getElementById("repos-preview");
const searchType = document.getElementById("search-type");


searchButton.addEventListener("click", function() {
    const entered = searchInput.value.trim();
    if (entered.length <= 0) return;

    const searchTypeValue = searchType.value;
    const getTarget = UserRequests[
        `get${searchTypeValue.slice(0, searchTypeValue.length - 1)}`
    ];
    
    // reposPreview.querySelectorAll("div.repo").forEach(entry => entry.remove());  // clear repositories preview
    reposPreview.innerHTML = "";

    getTarget(entered).then(function(response) {
        console.log(response);  
        HtmlManager.setUserData(response);
        if (response.status === "404") return;

        // console.log(UserRequests.getRepoURLs(response));

        UserRequests.getRepoURLs(response).forEach(url => {
            UserRequests.requestJson(url).then(function(reposPage) {
                HtmlManager.createRepos(reposPage, reposPreview);
                console.log(reposPage);
            });
        });
    }).catch(error => console.log(error));
});

