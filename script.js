"use strict";

import { Path, UserRequests } from "./user_requests.js";


const avatarPreview = document.getElementById("avatar");
const namePreview = document.getElementById("name");
const loginPreview = document.getElementById("login")

const following = document.getElementById("following");
const followers = document.getElementById("followers");

const searchButton = document.getElementById("find-button");
const searchInput = document.getElementById("find-input");


searchButton.onclick = function() {
    const entered = searchInput.value;

    if (typeof entered === "string" && entered.trim().length > 0) {
        UserRequests.getUser(entered).then(function(response) {
            console.log(response);
            
            if (response["status"] !== "404") avatarPreview.src = response["avatar_url"];
            else avatarPreview.src = "./assets/unknown_user.jpg";

            namePreview.innerHTML = response["name"];
            loginPreview.innerHTML = response["login"];

            following.innerHTML = `${response["following"]} <span class="some">following</span>`;
            followers.innerHTML = `${response["followers"]} <span class="some">followers</span>`;
        });

        UserRequests.countStars(entered).then(response => console.log(response));
    };
}

