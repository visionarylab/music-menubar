import { useState, useEffect } from "react";

function useMediaQuery(query: string, isIOS: boolean) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const updateMatch = () => setMatch(window.matchMedia(query).matches);

    updateMatch();
    if (isIOS) {
      // Note: addListener and removeListener are deprecated. I am intentionally using them
      // only on iOS devices because I found that addEventListener and removeEventListener breaks
      // on iOS platform. Hopefully, this gets resolved soon
      window.matchMedia(query).addListener(updateMatch);

      // remove listener on unmount
      return () => {
        window.matchMedia(query).removeListener(updateMatch);
      };
    } else {
      window.matchMedia(query).addEventListener("change", updateMatch);

      // remove listener on unmount
      return () => {
        window.matchMedia(query).removeEventListener("change", updateMatch);
      };
    }
  }, [query, isIOS]);

  return match;
}

export default useMediaQuery;
