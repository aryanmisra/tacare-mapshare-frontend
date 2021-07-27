import { useEffect, useRef } from "react";

export const isTest = process.env.REACT_APP_ENVIRONMENT === "production" ? false : true;

export const api = isTest ? "http://localhost:5000" : "https://tacare-api.herokuapp.com/";

export const parseNum = (val: string) => val.replace(/^\$/, "");
export const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const epochs: [string, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
    ["second", 1],
];

export function timeSince(date: Date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const interval = epochs.find((i) => i[1] < seconds);
    const count = interval ? Math.floor(seconds / interval[1]) : null;
    return interval && count ? `${count} ${interval[0]}${count !== 1 ? "s" : ""} ago` : "<1 second ago";
}

export const capFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        if (delay === null) {
            return;
        }

        const id = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(id);
    }, [delay]);
}
