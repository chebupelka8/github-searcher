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

    static addQueryParams(url, params) {
        const editedURL = url.replaceAll(new RegExp("\\/$", "g"), "") + "?";

        const generateQueryParams = function*() {
            for (const key of Object.keys(params)) {
                const replaceSpaces = string => string.replaceAll(new RegExp("\\s+", "g"), "+");
                yield `${replaceSpaces(key)}=${replaceSpaces(params[key].toString())}`;
            }
        }

        return editedURL + [...generateQueryParams()].join("&");
    }
}