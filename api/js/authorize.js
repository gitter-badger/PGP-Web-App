/**
 * Created by dcorns on 10/4/14.
 */
'use strict';

var User = require('../../models/user');

module.exports = function(usrObj) {
  return{
    echo: function(){
      return usrObj;
    },
    authenticate: function(test) {
      var usr = User.where({email: usrObj.email});
      usr.findOne(function (err, user) {
        if (err) console.log(err);
        var result = {user: false, password: false};
        if (user) {
          result.user = true;
          testPassword(user, result);
        }
        else{
          test(result);
        }
      });
      usr.findOne();
      function testPassword(usr, result) {
        if (usr.password === usrObj.password) {
          result.password = true;
        }
        test(result);
      }
    }
  }
};