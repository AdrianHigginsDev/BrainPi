module.exports = function create(className, dataNode) {
    const fs           = require('fs');
    const fileContents = `var Model = require('./Model.js'); \n\n`
          + `class ${className} extends Model\n`
          + `{\n`
          + `    constructor()\n`
          + `    {\n`
          + `        super();\n`
          + `    }\n\n`
          + `    static props() {\n`
          + `        return {\n`
          + `            data: ${dataNode}\n`
          + `        }\n`
          + `    }\n\n`
          + `}\n\n`
          + `module.exports = ${className};`;

    fs.writeFile(`./src/models/${className}.js`, fileContents, (err) => {
      if (err) {
          console.log(err);
          console.log("Closing Conduct...")
          process.exit(1);
      }

      console.log(`New Model: ${className}`);
      process.exit();
    });
}