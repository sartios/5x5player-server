module.exports.listFields = function(req, res){
    res.render('field/fields',{});
};

module.exports.viewCreateField = function(req, res){
    res.render('field/create-field');
};

module.exports.createField = function(req, res){
    res.render('field/fields');
};

module.exports.editField = function(req, res){
    res.render('field/fields');
};
