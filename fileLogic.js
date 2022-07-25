const fs = require('fs');

function create(filename, content,encoding='utf8') {
    fs.writeFileSync('./files/' + filename, content, { encoding: encoding })
    console.log("file created");
    return "ok"
}
function read(filename) { }

function update(filename, content) {
    fs.appendFileSync('./files/' + filename, content, { encoding: 'utf8' })
    console.log("file deleted");

}

function remove(filename) {
    fs.rmSync('./files/' + filename)
    console.log("file deleted");
}

function isExist(filename) {
    return fs.existsSync('./files/' + filename);
}
function isValidName(filename = "") {
    return ["/", "\\", "*", ":", "|", "?", "<", ">", '"'].find(char => filename.includes(char)) ? false : true;
}
function isValidExtantions(filename = "") {
    let ext = filename.slice(filename.lastIndexOf(".") + 1)
    return ["pdf", "txt", "png", "jpg", "js", "html", "css", "jsx", "ts"].find(char => ext == char) ? true : false;
}

async function isValid(req, res, next) {
    const { filename } = req.body;
    if (isValidName(filename) && isValidExtantions(filename)) { next() }
    else {

        res.status(400).json("file name or extanction is not valid.")
    }
}

module.exports = { isValid, create, read, update, remove }




