const os = require("os");

process.stdin.setEncoding('utf8');

process.stdout.write('Write your string:' + os.EOL);

process.stdin.on('readable', () => {
  while ((str = process.stdin.read()) !== null) {
    const output = reverseString(str);
    process.stdout.write(output + os.EOL + 'Write new string:' + os.EOL);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});

const reverseString = str => [...str].reverse().join('');