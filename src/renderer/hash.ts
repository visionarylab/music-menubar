// Get the hash of the url
console.log("HASH", window.location.hash);
console.log("LOCATION", window.location.href);
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial: any, item) {
    if (item) {
      var parts: any = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

export default hash;
