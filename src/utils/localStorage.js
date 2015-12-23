(function(){
    module.exports = {
        set: set,
        get: get
    };
    
    function set(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    function get(key){
        var value = localStorage.getItem(key);
        return value ? JSON.parse(value) : value;
    }
    
})();