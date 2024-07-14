"use strict";

import { Path, UserRequests } from "./user_requests.js";


const avatarPreview = document.getElementById("avatar");
const nicknamePreview = document.getElementById("user-name");

const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");


searchButton.onclick = function() {
    const entered = searchInput.value;

    if (typeof entered === "string" && entered.trim().length > 0) {
        UserRequests.getUser(entered).then(function(response) {
            avatarPreview.src = response["avatar_url"];
            nicknamePreview.innerHTML = `${response["login"]} (${response["name"]})`;
        });
    };
}

