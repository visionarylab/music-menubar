import { useState, useEffect } from "react";

function useMediaQuery(query: string, isIOS: boolean) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const updateMatch = () => setMatch(window.matchMedia(query).matches);

    updateMatch();
    if (isIOS) {
      window.matchMedia(query).addListener(updateMatch);
      return () => {
        window.matchMedia(query).addListener(updateMatch);
      };
    } else {
      window.matchMedia(query).addEventListener("change", updateMatch);
      return () => {
        window.matchMedia(query).removeEventListener("change", updateMatch);
      };
    }
  }, [query, isIOS]);

  return match;
}

export default useMediaQuery;
