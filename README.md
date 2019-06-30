# IMAPでGmailを検索して受信して本文を表示するサンプル

## 要件
- 2017-01-01以降に送信され、送信者に「corec.jp」を含むメール
- gmailアカウントやパスワードは .env ファイルから読み込む

## 準備
- gmailの設定で「IMAPを有効」及び「安全性の低いアプリからのアクセスの許可」をオンにしておく

## Ruby

検証環境

Windows10

```
ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [x64-mingw32]
```

### 準備(Windows)

<https://rubyinstaller.org/downloads/>

Ruby+Devkit 2.6.3-1 (x64) 

### 実行

```sh
bundle install
bundle exec ruby gmail.rb
```

## Node.js

検証環境

Windows10

```
node -v
v10.16.0
```

### 準備(Windows)

```sh
npm install --global --production windows-build-tools
npm install -g node-gyp
```

### 実行

```sh
npm install
npm start
```