module.exports = {
  render : function (data,res) {
    return {
      code : res.statusCode,
      message : res.statusMessage,
      data : data
    };
  }
}
