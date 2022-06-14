exports.toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

exports.extractDate = (str) => {
    return str.match(/^\d{4}-(0?[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/g)[0];
}

exports.extractTime = (str) => {
    return str.match(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g)[0];
}