"use strict";

import { Path } from "./path.js";


export class Requests {
    static async request(url) {
        return await fetch(url);
    }

    static async requestJson(url) {
        const response = await Requests.request(url);
        return await response.json();
    }
}


export class UserRequests extends Requests {
    static prefix = "https://api.github.com";
    
    static async _getJson(...urls) {
        return await UserRequests.requestJson(Path.mergeUrl(UserRequests.prefix, ...urls));
    }

    static async getUser(userName) {
        return await UserRequests._getJson("users", userName);
    }

    static async getOrganization(orgName) {
        return await UserRequests._getJson("orgs", orgName);
    }

    static async getTargetRepos(target) {
        return await UserRequests.requestJson(target["repos_url"]);
    }

    static _getCountRepoPages(target) {
        return Math.ceil(target["public_repos"] / 30);
    }

    static getRepoURLs(target) {
        const result = [];

        for (let i = 1; i <= UserRequests._getCountRepoPages(target); i++) {
            result.push(Path.addQueryParams(target["repos_url"], {page: i}));
        }

        return result;
    }

    static async countStars(target) {  // work wrong yet
        const response =  await UserRequests.getUserRepos(target);
        
        return response.reduce(function(accumulator, entry) {
            return accumulator + entry["stargazers_count"]; 
        }, 0);
    }
}
