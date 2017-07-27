module.exports = {
	get : function (code,msg,err) {
		if(!err) err = {};

		err.status = code || 500;
		err.message = msg || "Ocurrio un error. Intentelo nuevamente."

		err.errors = this.each(err.errors);

		//controlando errores mongoDB
		if(err.code) {
			switch(err.code){
				case 11000 :
					err.errors.push("Se esta duplicando el registro.");
					break;
			}
		}

		return err;
	},
	each : function (data) {
		var errors = [];

		if(!data) return errors;

		for(var key in data){
			errors.push(data[key].message);
		}

		return errors;
	}
};
