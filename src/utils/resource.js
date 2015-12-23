(function(){
    module.exports = {
        get: get
    };
    
    function get(requestURL, callback){
        var xmlHttpRequest = new XMLHttpRequest(),
            jsonResponse,
            completedState = 4;

        xmlHttpRequest.onreadystatechange = function(){
            if(xmlHttpRequest.readyState === completedState && xmlHttpRequest.status === 200){
                jsonResponse = JSON.parse(xmlHttpRequest.responseText);
                callback(jsonResponse);
            }else if(xmlHttpRequest.status.toString().indexOf(4) === 0){
                console.log(xmlHttpRequest.status + " " + xmlHttpRequest.statusText + " - " + xmlHttpRequest.responseURL);
            }
        };
        
        xmlHttpRequest.open('GET', requestURL, true);
        xmlHttpRequest.send(null);
    }
})();