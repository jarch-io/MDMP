var mongoose = require('mongoose');

var HOSTNAME = "127.0.0.1";
var DATABASE = "MDMP";
var USERNAME = "";
var PASSWORD = "";

module.exports = {
	execute : function (next) {
		var conn = null;
		try {
			conn = mongoose.connect('mongodb://'+HOSTNAME+'/'+DATABASE,function (err,data) {
				if(err) return next(err);

				next(err,conn);
			});
		} catch(e) {
			conn && conn.disconnect();
		}
	}
};
