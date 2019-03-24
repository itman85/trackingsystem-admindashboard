
/**
 * main test app
 */

 Parse.Cloud.define("hello", function(request, response){
 	response.success("Hello world!");
 });


 Parse.Cloud.define('submit_device_location', function (request, response) {
    console.log("submit_device_location ---" + request.params.deviceid);
    var _ImLocationClass = Parse.Object.extend("im_locations");
      var _objectImLocation = new _ImLocationClass();
      //console.log("---" + request.params.name);
      _objectImLocation.save({
        userid: request.params.userid,
        lng: request.params.lng,
        lat: request.params.lat,
        time: request.params.time
      }, { useMasterKey: true }).then(function (res) {
        console.log("Add location ok");
        response.success("Save location successfully");
      }, function (error) {
        console.log(error);
        console.log("Add location Error");
        response.error("Save location Error");
      });
  });
  
  Parse.Cloud.define('submit_user_status', function (request, response) {
    console.log("submit_device_location ---" + request.params.deviceid);
    var _ImUserClass = Parse.Object.extend("im_user_status");
      var _objectImUser = new _ImUserClass();
      if (typeof request.params.id != "undefined" && request.params.id != null) {
        _objectImUser.id = request.params.id;
      }
      //console.log("---" + request.params.name);
      _objectImUser.save({
        userid: request.params.userid,
        status: request.params.status,//0:online,1:offline
        time: request.params.time
      }, { useMasterKey: true }).then(function (user) {
        //console.log("Add location ok");
        response.success("Save user status successfully");
      }, function (error) {
        console.log(error);
        //console.log("Add location Error");
        response.error("Save user status Error");
      });
  });

  Parse.Cloud.define("admin_system_login", function (request, response) {
    console.log('admin login ' + request.params.username + ' - ' + request.params.password);
    Parse.User.logIn(request.params.username, request.params.password, {
      success: function (user) {
        if(user.get("admin")!='undefined' && user.get("admin"))
          response.success({ token: user.getSessionToken() });
        else
          response.error('This user is not allowed to login!');
      },
      error: function (object, error) {
        response.error(error.message);
      }
    });
  });
