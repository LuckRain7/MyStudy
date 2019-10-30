const cp = require('child_process'),
    { resolve } = require('path'),
    fs = require('fs');

; (async () => {
    const script = resolve(__dirname, '../task/movie'),
        child = cp.fork(script, []);

    let invoked = false;
    child.on('message', (data) => {
        fs.writeFile(resolve(__dirname, '../data/movie.json'), JSON.stringify(data), 'utf8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('ok');
            }
        })
    })
    child.on('exit', (code) => {
        if (invoked) return;

        invoked = true;
        console.log(code);
    })
    child.on('error', (err) => {
        if (invoked) return;

        invoked = true;
        console.log(err);
    })
})()