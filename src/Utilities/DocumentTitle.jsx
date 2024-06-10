import { useEffect } from 'react'

export function DocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}