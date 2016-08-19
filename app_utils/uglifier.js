var uglifyJs = require('uglify-js');
var fs = require('fs');

module.exports.run = function(){
  loadFiles();
  minify();
  writeToFile();
};

var appClientFiles = [], uglified;
var loadFiles = function(){
  appClientFiles.push('app_client/js/app.js');
  appClientFiles.push('app_client/js/common/services/authentication.js');
  appClientFiles.push('app_client/js/root.js');
  appClientFiles.push('app_client/js/common/services/user.js');
  appClientFiles.push('app_client/js/team/services.js');
  appClientFiles.push('app_client/js/field/services.js');
  appClientFiles.push('app_client/js/player/services.js');
  appClientFiles.push('app_client/js/requests/services.js');
  appClientFiles.push('app_client/js/field/controllers.js');
  appClientFiles.push('app_client/js/common/controllers/controllers.js');
  appClientFiles.push('app_client/js/auth/controllers.js');
  appClientFiles.push('app_client/js/home/controllers.js');
  appClientFiles.push('app_client/js/team/controllers.js');
  appClientFiles.push('app_client/js/player/controllers.js');
  appClientFiles.push('app_client/js/requests/controllers.js');
  appClientFiles.push('app_client/js/common/directives/footerGeneric.js');
  appClientFiles.push('app_client/js/common/directives/navigationGeneric.js');
  appClientFiles.push('app_client/js/common/directives/successGeneric.js');
  appClientFiles.push('app_client/js/common/directives/showResults.js');
};

var minify = function(){
  uglified = uglifyJs.minify(appClientFiles, {compress: false});
};

var writeToFile = function(){
  fs.writeFile('public/angular/5x5player.min.js', uglified.code, function(err){
    if(err){
      console.log(err);
    }else{
      console.log("Script generated and saved:", '5x5player.min.js');
    }
  });
};
