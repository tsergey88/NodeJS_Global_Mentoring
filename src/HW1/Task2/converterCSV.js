import fs from 'fs';
import { csv } from 'csvtojson';
import { errorHandler } from '../../utils/utils';

export const convertCSV = (input = './src/HW1/Task2/csv/input_file.csv', output = './src/HW1/Task2/csv/output_file.json') => {
  const readStream = fs.createReadStream(input, 'utf8');
  const writeStream = fs.createWriteStream(output, 'utf8');

  const parserParameters = {
    ignoreColumns: /(Amount)/,
    headers: ['book', 'author', 'price'],
  };

  readStream
    .on('error', errorHandler)
    .pipe(csv(parserParameters))
    .on('error', errorHandler)
    .pipe(writeStream)
    .on('error', errorHandler);
};

export default convertCSV;
