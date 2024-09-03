const { writeFile, mkdir } = require('fs');
const { dirname } = require('path');
const { argv } = require('yargs');
require('dotenv').config();

const filePath = 'src/environments/environment.ts';

const environmentFileContent = `
  export const environment = {
    production: ${process.env['NODE_ENV'] === 'production'},
    apiUrl: "${process.env['API_URL']}"
  };
`;

mkdir(dirname(filePath), { recursive: true }, (err) => {
  if (err) {
    return console.error('Erreur lors de la création du répertoire:', err);
  }

  writeFile(filePath, environmentFileContent, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Angular environment.ts file generated`);
    }
  });
});
