(function(){
    
    var resource = require('./resource'),
        localStorage = require('./localStorage');
    
    module.exports = {
        getIssues : getIssues
    };
    
    function saveResponseToLocalStorageInterceptor(username, callback, response){
        var savedData = localStorage.get(username) || {},
            issues = response.map(function(issue){
                return {
                    url: issue.url,
                    id: issue.id,
                    title: issue.title
                };
            });
        
        savedData.issues = {
            updated: Date.now(),
            data: issues
        };
        
        localStorage.set(username, savedData);
        
        callback(username, issues);
    }
    
    function getUserDataFromLocalStorage(username){
        var userData = localStorage.get(username);
        
        return userData ? userData : null;
    }
    
    function getIssues(username, projectName, callback){
        var url = 'https://api.github.com/repos/' + username + '/' + projectName + '/issues',
            userDataFromLocalStorage = getUserDataFromLocalStorage(username)
            fetchIntervalInMinutes = 60,
            minuteInMilliSeconds = 60000
            useLocalStorageData = userDataFromLocalStorage && ((Date.now() - userDataFromLocalStorage.issues.updated) < fetchIntervalInMinutes * minuteInMilliSeconds);
        
        if(useLocalStorageData) {
            callback(username, userDataFromLocalStorage.issues.data);
        }else{
            resource.get(url, saveResponseToLocalStorageInterceptor.bind(this, username, callback));    
        }
    }
    
})();