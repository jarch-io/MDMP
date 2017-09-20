module.exports = function (object) {
    var _obj = object;
    function clearValuesUndefined() {
        var o = _obj;
        for (var key in o) {
            if (!o[key])
                delete o[key];
        }
        return o;
    }
    return {
        clearValuesNull: clearValuesUndefined
    };
};
