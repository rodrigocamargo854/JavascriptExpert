const { readFile } = require("fs/promises");
const User = require("./user")
const { error } = require("./constants");
const DEFAUT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    const users = File.parseCsvToJSON(content);
    return users;
  }

  static async getFileContent(filePath) {
    return (await readFile(filePath)).toString("utf8");
  }

  static isValid(csvString, options = DEFAUT_OPTION) {
    const [header, ...fileWithoutHeader] = csvString.split("\n");
    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }
    const isContentLengtAccepeted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )
    if(!isContentLengtAccepeted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return {valid: true}
  }
  static parseCsvToJSON(csvString){
    const lines = csvString.split('\n')
    //remove o primeiro item e jogo na variavel
    const fistLine = lines.shift()
    const header = fistLine.split(',')
    const users = lines.map(line =>{
      const columns = line.split(',')
      let user ={}
      for ( const index in columns ){
        user[header[index]] = columns[index]
      } 
      return new User(user)
    })
    console.log('user:', users)
  }
}

module.exports = File
