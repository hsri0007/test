const fs = require('fs');

const GENERATED_FILE = './src/cms/graphql-generated.ts';
console.log('Cleaning up the generated file...');
fs.readFile(GENERATED_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  // Replaces Maybe with NotMaybe
  const result = data
    .replace(/Array<Maybe</g, 'Array<NotMaybe<')
    .replace(
      /export type Maybe<T>/g,
      '\r\n\r\n/** Added in cleanup to replace `Maybe` within arrays */\r\nexport type NotMaybe<T> = T;\r\n\r\nexport type Maybe<T>'
    );

  fs.writeFile(GENERATED_FILE, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
