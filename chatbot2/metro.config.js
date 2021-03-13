//const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver:{
    
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
