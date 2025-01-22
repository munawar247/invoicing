function init() {
  if (typeof window === "undefined") {
    //loading for webpack

    const remoteUrls = {
      Invoice: "http://localhost:8030",
      Store: "http://localhost:8019/remoteEntry.js",
    };

    module.exports = { remoteUrls };
  } else {
    //In future will write window logic here
  }
}

init();
