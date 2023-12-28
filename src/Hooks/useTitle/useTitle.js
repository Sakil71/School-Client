import { useEffect } from "react";

const useTitle = title =>{
    useEffect(()=> {
        document.title = `${title} - ABC School`;
    }, [title])
}

export default useTitle;