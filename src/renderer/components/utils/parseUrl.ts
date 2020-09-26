import { parse } from "querystring";

// Issue: https://github.com/aaronleopold/music-menubar/issues/6
// Example:
// url = https://www.youtube.com/watch?v=rCFmLjGq3Jg&list=RDrCFmLjGq3Jg&start_radio=1&t=20
// params = { v: rCFmLjGq3Jg, list: RDrCFmLjGq3Jg, start_radio: 1, t=20 }

export const parseUrl = (url: string) => {
    //No string provided
    if (url === "" || url === undefined) return null;

    //No query string detected
    if (!url.includes("?")) return null;

    const queryString = url.split("?")[1];
    const params = parse(queryString);

    return params;
};
