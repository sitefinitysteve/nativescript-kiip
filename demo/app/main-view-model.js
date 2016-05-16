var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    debug: "",
    email: "",
    birthday: "06/21/91",
    gender: "",
    id: "",
    capabilities: ""
});

module.exports = viewModel;