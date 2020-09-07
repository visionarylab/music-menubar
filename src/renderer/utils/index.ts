import { gifs } from "../assets/gifs";

// TODO: change to take in current bg, get random DIFFERENT bg

/**
 * Retrieve random gif from gif list
 * @returns {Object} gif - {gif: any; source: string;}
 */
export function getRandomGif(): { gif: any; source: string } {
  return gifs[Math.floor(Math.random() * gifs.length)];
}
