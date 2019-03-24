$(function () {
    //do initial
    //alert("hi");
    //parse init
    var host = location.protocol + '//' + location.host;
    Parse.initialize("intelmobi-app-id", "intelmobi-js-key");
    Parse.serverURL = host + '/im';
    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        // alert('login');
        var menuhtml = '<ul class="nav navbar-nav pull-right">';
        menuhtml += '<li class="dropdown dropdown-user"> <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> <span class="username username-hide-on-mobile"> Hi! Admin </span> <i class="fa fa-angle-down"></i> </a>';
        menuhtml += '<ul class="dropdown-menu dropdown-menu-default animated jello">'
        menuhtml += '<li> <a href="#" id="logout" > <i class="icon-logout"></i> Log Out </a> </li>'
        menuhtml += '</ul></li></ul>';
        $('#topmenu').html(menuhtml);    
       
    }
    //
    $.fn.setupClickFn = function() {
        $('#btnSearch').click(function () {
            var word = $('#inputWords').val();
            var sel = $("form input[type='radio']:checked").val();
            Parse.Cloud.run("search_invoices ", {
                //here you can pass the function request parameters
                search_by: sel,
                key_word: word
            }).then(function (result) {
                //here you will handle the returned results (if function returned response.success())
                //alert(result);
                var html = "";
                for (var i = 0; i < result.length; i++) {                    
                    html += '<tr>'
                    html += '<td class="text-left">' + result[i].orderTime + '</td>';
                    html += '<td class="text-left">'
                        + '<a class="text-underline" target="_blank" href="/invoice?id=' + result[i].invoiceId + '" title="' + result[i].invoiceId + '">'
                        + result[i].invoiceId + '</a> </td>';
                    var amount = parseFloat(result[i].chargedAmount / 100).toFixed(2);
                    html += '<td class="text-center">' + '$' + amount + '</td>';
                    html += '<td class="text-left">' + result[i].orderStatus + '</td>';
                    html += '<td class="text-left">' + result[i].date + '</td>';
    
                }
                //alert(html);
                $('#invoiceRows').html(html);
                //$.fn.linkClickFn();
    
            }, function (error) {
                //handle errors if called function returned response.error()
                alert(error);
            });
        });
    
        $("#logout").on('click', function () {
            Parse.User.logOut().then(() => {
                var currentUser = Parse.User.current();  // this will now be null\
                //alert(host);
                window.location.replace(host + "/admin");
            });
        });
     };    
    //
     $.fn.setupClickFn();

});