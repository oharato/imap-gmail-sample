// https://github.com/chadxz/imap-simple
const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const iconv = require('iconv');

const config = {
  imap: {
    user: process.env.ACCOUNT,
    password: process.env.PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  }
};
// https://github.com/mscdex/node-imap#connection-instance-methods
const searchCriteria = [['FROM', 'corec.jp'],['SINCE', '2017-01-01']];
// https://github.com/chadxz/imap-simple#usage-of-mailparser-in-combination-with-imap-simple
const fetchOptions = {bodies: ['']};

(async()=>{
  const connection = await imaps.connect(config);
  await connection.openBox('INBOX');
  const messages = await connection.search(searchCriteria, fetchOptions);
  console.log('search results: '+messages.length);
  for(let message of messages){
    const part = message.parts.find(part => part.which === '');
    // https://github.com/chadxz/imap-simple#usage-of-mailparser-in-combination-with-imap-simple
    const mail = await simpleParser(`Imap-Id: ${message.attributes.uid}\r\n${part.body}`);
    // simpleParserはiconv-liteを使っているのでiso-2022-jpを正しく変換できない
    // charsetを見てiconvで変換
    const match = mail.headerLines.find(o => o.key === "content-type").line.match(/charset="(.+)"/);
    const charset = match ? match[1] : null;
    if(charset){
      const conv = new iconv.Iconv(charset, "UTF-8");
      if(mail.subject) console.log('subject: ' + conv.convert(mail.subject).toString());
      if(mail.text) console.log(conv.convert(mail.text).toString());
      // if(mail.html) console.log(conv.convert(mail.html).toString());
    }else{
      console.log('subject: ' + mail.subject);
      console.log(mail.text);
      // console.log(mail.html);
    }
    // break;//テスト用に1件だけで止めたいときにコメントアウト外す
  }
  await connection.end();
})();
