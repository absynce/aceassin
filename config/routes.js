exports.routes = function (map) {
    map.camelCaseHelperNames = true;
    
    // Add all your routes below this line:
    map.resources('project', function (project) {
    });
      
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};
