$(function () {

    //init parse
    Parse.initialize('v9SKMfSSx4WelTmWoqmg7cpN2adFd570Gg2p9G7u', 'yJsFAhqSMFMnv24CwVlY5Bjw4sJt2FkvgsHEMyZK');
    Parse.serverURL = 'https://parseapi.back4app.com';
    Parse.liveQueryServerURL = 'wss://imtracking.back4app.io';
    const client = new Parse.LiveQueryClient({
        applicationId: 'v9SKMfSSx4WelTmWoqmg7cpN2adFd570Gg2p9G7u',
        serverURL: 'wss://imtracking.back4app.io',
        javascriptKey: 'yJsFAhqSMFMnv24CwVlY5Bjw4sJt2FkvgsHEMyZK'
    });
    client.open();

    var queryUserStatus = new Parse.Query('im_user_status');
    //query.descending('time').limit(1);
    var subscriptionUserStatus = client.subscribe(queryUserStatus);
    subscriptionUserStatus.on('open', () => {
        console.log('subscription  user status opened');
        //alert('subcription user status opened');
    });
    subscriptionUserStatus.on('update', (object) => {
        nvStatus[object.get("userid")] = object.get("status");
        //alert('object updated ' + nvStatus[object.get("userid")] + " - " + object.get("status"));
        refreshUserStatus();
    });
    //////////////////////////////////////
    var queryLocations = new Parse.Query('im_locations');
    var subscriptionLocations = client.subscribe(queryLocations);
    subscriptionLocations.on('open', () => {
        console.log('subscription location opened');
        //alert('subcription location opened');
        $("#wsstatus").text("Connected");
    });
    subscriptionLocations.on('create', (object) => {
        var point = new google.maps.LatLng(object.get("lat"), object.get("lng"));
        nvPoints[object.get("userid")].push(point);
        drawPointForNV(point,object.get("userid"));
        //alert('object location create ' + object.get("lat") + '--' + object.get("lng"));
        //$('#nvlines').html(generateNV1Html()+'<br>'+generateNV2Html());  
    });

});