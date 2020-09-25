# music-menubar

tldr; a dropdown media controller for your youtube playlists / videos (and eventually a controller for spotify too), written using React, Tailwind CSS and Electron

### More deets

I'm always trying to create things to help improve my workflow, always trying to cut down on the time it takes me to do something that isn't part of my work (i.e. controlling my music). This app may only be a small improvement, but simply clicking the dropdown to control my music is more than enough for me.

### Current state

Currently this media player is only capable of managing youtube playlists and youtube videos / streams. I originally had spotify partly working, but decided to only focus on one feature at a time. So, until the youtube portion is closer to where I want it to be I'll be shelving the spotify controls.

### Installation

```bash
git clone https://github.com/aaronleopold/music-menubar.git
cd music-menubar
yarn
yarn dev
```

### Usage

Off the bat, this will come preloaded with three playlists and one stream. A quick note, I will be using the term stream throughout this readme, but really any youtube video will work. I just intended the usage to be a stream. All of the preloaded configs are Lofi, so if that's not your thing you can just delete them. To create new playlists, you'll need to grab the list ID from the url of the playlist. For example, let's say you love the following playlist:

`https://www.youtube.com/playlist?list=PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm`
The ID to extract is: `PLm5pKYShxnXB1g2LixFdKxjAvl3P2O4Hm`

The same goes for videos, lets say you love this video:

`https://www.youtube.com/watch?v=rCFmLjGq3Jg` then all you need to do is set `rCFmLjGq3Jg` as the ID.

### Artwork

I used a large amount (and still increasing) of gifs, and none of it is mine. Zip. All of the art you see is thanks to other people who have amazingly great talent, and the references to all gifs used can be found in `src/renderer/assets/gifs.ts`. You'll see an array of objects, and the source field is the source. Please take the time to check it out and give let the artist know if you happen across something you love!

For example:

```tsx
{
    gif: waneela,
    source: "https://giphy.com/gifs/cinemagraph-RkDZq0dhhYHhxdFrJB",
}
```

#### Contributing
I've started creating and annotating issues specifically for the start of Hacktober. Please allow issues marked as "good first issue" to be completed by those with less experience, as I intentionally set these aside. Additionally, please refer to the [CONTRIBUTING.md](https://github.com/aaronleopold/music-menubar/blob/main/CONTRIBUTING.md) for more general information.
