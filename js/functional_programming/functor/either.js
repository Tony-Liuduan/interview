var Left = function (x) {
    this.__value = x;
}
Left.of = function (x) {
    return new Left(x);
}
Left.prototype.map = function (f) {
    return this;
}
var Right = function (x) {
    this.__value = x;
}
Right.of = function (x) {
    return new Right(x);
}
Right.prototype.map = function (f) {
    return Right.of(f(this.__value));
}


var either = curry(function (f, g, e) {
    switch (e.constructor) {
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
});


var moment = require('moment');
// getAge :: Date -> User -> Either(String, Number)
var getAge = curry(function (now, user) {
    var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
    if (!birthdate.isValid()) {
        return Left.of("Birth date could not be parsed");
    }
    return Right.of(now.diff(birthdate, 'years'));
});
getAge(moment(), { birthdate: '2005-12-12' });
// Right(9)
getAge(moment(), { birthdate: 'balloons!' });
// Left("Birth date could not be parsed")



// zoltar :: User -> _
var zoltar = compose(console.log, either(id, fortune), getAge(moment()));
zoltar({ birthdate: '2005-12-12' }); // "If you survive, you will be 10" // undefined
zoltar({ birthdate: 'balloons!' });
// "Birth date could not be parsed"
// undefined
