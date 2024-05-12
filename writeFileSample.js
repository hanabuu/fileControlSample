const fs = require('fs')

/**
 * 非同期書き込みサンプル
 * @param {in} file ファイルパス 
 * @param {in} data 書き込み文字列
 * @note ファイルの書き込みは非同期に行う。
 * @note 書き込み結果はログで見るのならこれでいいかも。
 * @note 書き込み結果によって処理をするなら同期の方？
 */
const noSyncTest = (file,data) => {
    fs.writeFile(file, data, (err) => {
        if(err){
            console.error("書き込み失敗" + err);
        } else {
            console.log("書き込み完了")
        }
    })
}

/**
 * 同期書き込みサンプル
 * @param {*} file string ファイルパス
 * @param {*} data string 書き込み文字列
 * @note ファイルの書き込みが完了したら返す
 * @note writeFileSyncは戻り値voidだから、結果はわからず。。。
 */
const syncTest = async (file, data) => {
    fs.writeFileSync(file, data);
}

/**
 * 追記サンプル
 * @param {in} file string ファイルパス
 * @param {in/out} data string 書き込み文字列
 */
const appendFileTest = async (file, data) => {
    fs.appendFileSync(file, data);
}

/**
 * streamサンプル
 * @param {in} file string ファイルパス
 * @param  {...any} data 書き込むデータ
 * @note 何度も書き込む場合はこちらがいいかも
 * @note createWriteStreamのoptionにencodingを入れてるが、sjis指定の仕方がわからない。
 * @note stream.writeとiconvliteを組み合わせることでsjisで書き込むことは可能
 */
const streamSample = (file, ...data) => {
    const stream = fs.createWriteStream(file, {flags: "a", encoding: "utf8"});
    data.forEach(str => {
        stream.write(str + "\n");
    })
    stream.end("\n");
    stream.on("error", (err) => {
        if(err) console.log(err);
    })
}

const main = () => {
    noSyncTest("./data/writefile1.txt", "aa");
    syncTest("./data/writefile2.txt", "bb");
    appendFileTest("./data/writefile2.txt", "cc");
    streamSample("./data/streamWrite.txt", "aa", "bb");
}

main();