"use strict";


export class Path {
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

    static async getUser(userName) {
        const response = await fetch(Path.mergeUrl(UserRequests.prefix, `/users/${userName}`));
        return await response.json();
    }
}
