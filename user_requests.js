"use strict";


class Path {
    static mergeUrl(...values) {
        const regexs = [new RegExp("^\\/", "g"), new RegExp("\\/$", "g")];
        const editedValues = values.map(function(entry) {
            regexs.forEach(reg => entry = entry.replaceAll(reg, ""));
            return entry;
        });
        
        return editedValues.join("/"); 
    }
}


export class UserRequests {
    static prefix = "https://api.github.com";
    
    static async _request(url) {
        return await fetch(url);
    }

    static async getUser(userName) {
        const response = await UserRequests._request(Path.mergeUrl(UserRequests.prefix, `/users/${userName}`));
        return await response.json();
    }

    static async getUserRepos(target) {
        if (typeof target === "string" && target.trim().length > 0) {
            const response = await UserRequests.getUser(target);
            const reposResponse = await UserRequests._request(response["repos_url"]);

            return await reposResponse.json();
        }
        else if (typeof target === "object") {
            const reposResponse = await UserRequests._request(target["repos_url"]);

            return await reposResponse.json();
        }
    }

    static async countStars(target) {
        const response =  await UserRequests.getUserRepos(target);
        
        return response.reduce(function(accumulator, entry) {
            return accumulator + entry["stargazers_count"]; 
        }, 0);
    }
}
