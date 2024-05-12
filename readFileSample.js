const fs = require('fs')

const file = "./data/file.txt"
let readData = "";
let readDataSync = "";

const noSyncTest = () => {
    fs.readFile(file, "utf8", (err,data) => {
        if(err) {
            return err;
        }
        return data;
    });
}

const syncTest = async () => {
    let readDataSync = await fs.readFileSync(file, "utf8");
    // console.log(readDataSync);
    return readDataSync;
    // console.log(readDataSync);
}



const main = () => {
    console.log("noSyncTest", noSyncTest()) // ここだとまだデータは読み込まれていない
    syncTest().then(data => {
        console.log(data);
    })
    // console.log("syncTest", syncTest());  // これだとpromiseが返ってくる
}

main();