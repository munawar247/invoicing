function init() {
    if (typeof window === "undefined") {
      //loading for webpack
  
      const remoteUrls = {
        Invoice: "#{INVOICESUI}#",
        Store: "#{REDUXSTORE}#/remoteEntry.js",
      };
  
      module.exports = { remoteUrls };
    } else {
      //In future will write window logic here
    }
  }
  
  init();
  