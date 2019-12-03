const fs = require('fs');
const csv = require('csvtojson');

const inputFile = './src/HW1/Task2/csv/input_file.csv';
const outputFile = './src/HW1/Task2/csv/output_file.json';

const readStream = fs.createReadStream(inputFile, 'utf8');
const writeStream = fs.createWriteStream(outputFile, 'utf8');

const parserParameters = {
  ignoreColumns: /(Amount)/,
  headers: ['book', 'author', 'price']
};

readStream.pipe(csv(parserParameters)).pipe(writeStream);