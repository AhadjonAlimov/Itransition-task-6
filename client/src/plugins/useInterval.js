import { useEffect } from 'react';

export default function useInterval(callback, delay) {

    useEffect(() => {
        const interval = setInterval(() => {
            callback();
            // console.log("render interval");
        }, delay);
        return () => clearInterval(interval);
    }, [callback]);
}