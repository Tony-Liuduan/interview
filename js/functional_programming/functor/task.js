// Node readfile example:
//=======================
var fs = require('fs');
// readFile :: String -> Task(Error, JSON)
var readFile = function (filename) {
    return new Task(function (reject, result) {
        fs.readFile(filename, 'utf-8', function (err, data) {
            err ? reject(err) : result(data);
        });
    });
};
readFile("metamorphosis").map(split('\n')).map(head);
// Task("One morning, as Gregor Samsa was waking up from anxious dreams, he discovered that
// in bed he had been changed into a monstrous verminous bug.")




// jQuery getJSON example:
//========================
// getJSON :: String -> {} -> Task(Error, JSON)
var getJSON = curry(function (url, params) {
    return new Task(function (reject, result) {
        $.getJSON(url, params, result).fail(reject);
    });
});
getJSON('/video', { id: 10 }).map(_.prop('title'));
// Task("Family Matters ep 15")
// 传入普通的实际值也没问题 Task.of(3).map(function(three){ return three + 1 }); // Task(4)