import { useState, useEffect } from 'react';

export default function useFavicon(url){
  const [favicon, setFavicon] = useState(null);
  useEffect(()=>{
    if (!url) return;
    try{
      const host = new URL(url).hostname;
      setFavicon(`https://www.google.com/s2/favicons?domain=${host}`);
    }catch(e){}
  }, [url]);
  return favicon;
}