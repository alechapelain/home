'use strict';

var injectTasks = function(basePaths, tasks) {
    var i = 0,
        len = tasks.length,
        module = null,
        moduleTasks;

    for (i; i < len; i++) {
        moduleTasks = require('./' + tasks[i])(basePaths);
    }
};

module.exports = function(basePaths) {
    injectTasks(basePaths, ['dev', 'build', 'lint']);
};
