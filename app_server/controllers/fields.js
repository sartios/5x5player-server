module.exports.listFields = function(req, res){
    res.render('field/fields',{
        fields:[{
            id : 2,
            name : 'A2',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        },{
            id : 3,
            name : 'A3',
            company : {
                name : 'Company 1'
            },
            size : 22,
            location : 'City 1, AA 111 BBB'
        },{
            id : 4,
            name : 'A4',
            company : {
                name : 'Company 1'
            },
            size : 16,
            location : 'City 1, AA 111 BBB'
        },{
            id : 5,
            name : 'A5',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        }]
    });
};

module.exports.viewCreateField = function(req, res){
    res.render('field/create-field');
};

module.exports.createField = function(req, res){
    res.render('field/fields',{
        fields:[{
            id : 2,
            name : 'A2',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        },{
            id : 3,
            name : 'A3',
            company : {
                name : 'Company 1'
            },
            size : 22,
            location : 'City 1, AA 111 BBB'
        },{
            id : 4,
            name : 'A4',
            company : {
                name : 'Company 1'
            },
            size : 16,
            location : 'City 1, AA 111 BBB'
        },{
            id : 5,
            name : 'A5',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        }]
    });
};

module.exports.editField = function(req, res){
    res.render('field/edit-field',{
        field : {
            name : 'sample name',
            size : 22,
            location : 'City 2'
        }
    });
};

module.exports.updateField = function(req, res){
    res.render('field/fields',{
        fields:[{
            id : 2,
            name : 'A2',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        },{
            id : 3,
            name : 'A3',
            company : {
                name : 'Company 1'
            },
            size : 22,
            location : 'City 1, AA 111 BBB'
        },{
            id : 4,
            name : 'A4',
            company : {
                name : 'Company 1'
            },
            size : 16,
            location : 'City 1, AA 111 BBB'
        },{
            id : 5,
            name : 'A5',
            company : {
                name : 'Company 1'
            },
            size : 12,
            location : 'City 1, AA 111 BBB'
        }]
    });
};
