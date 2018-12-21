module.exports = function create(className) {
    var fs           = require('fs');
    var fileContents = `var Controller = require('./Controller'); \n\n`
          + `class ${className} extends Controller\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    Index(request, response)\n`
          + `    {\n`
          + `        // TO-DO\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = new ${className}();`;

    fs.writeFile(`./src/controllers/${className}.js`, fileContents, (err) => {
      if (err)  {
        console.log(err);
        console.log("Closing Conduct...");
        process.exit();
      }
      
      console.log(`New Controller: ${x}`);
    });
}
