import * as fs from "fs";

export function readFileContent(path: string) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, "utf8", function(err, contents) {
      if (err) {
        reject(contents);
      } else {
        resolve(contents);
      }
    });
  });
}

export function writeFile(path: string, content: string) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
