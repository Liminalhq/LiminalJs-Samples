var exec = require('child_process').execFile;
export const execute=(fileName, params, path): Promise<unknown> => {
    let promise = new Promise((resolve, reject) => {
        exec(fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
}