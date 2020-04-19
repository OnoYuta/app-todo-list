# app-todo-list

Vue.jsとBootstrap4を使ったシンプルなタスク管理システム

## Feature

- ToDo作成機能
  - 任意のタイトルとカテゴリのToDoを新規作成する
  - 入力値が要件を満たす場合のみ「作成」ボタンを有効にする
  - ToDo作成に失敗した場合はエラーメッセージを表示する
- カテゴリ作成機能
  - カテゴリ「+」アイコンをクリックすると作成フォームのモーダルが表示される
  - 重複しないカテゴリ名が入力された場合のみ「作成」ボタンを有効にする
- 一覧表示機能
  - ToDoのID/タイトル/カテゴリ/実施状況を表示する
  - 完了もしくは未完了を実施状況のスイッチで管理する
- 検索機能
  - ToDoのタイトルに含まれる文字列を指定して部分一致の検索をする
  - 指定したカテゴリに属するToDoのみに絞り込む
- 削除機能
  - 完了したToDoを「削除」ボタンのクリックにより削除する
  - ToDoの実施状況に応じて「削除」ボタンを有効にする
  - 「一括削除」ボタンで表示中の完了したすべてのToDoを一括削除する
- データ自動保存
  - データを永続化してリロードに対応する
  - ToDoやカテゴリに変更が加えられたときに自動的にデータを保存する
- サンプルデータ復元
  - 表示するデータが0件のときに「リストア」ボタンを表示する
  - 「リストア」ボタンをクリックしてサンプルデータを復元する

## Demo

### カテゴリ追加

![046d3c20359838f82961ce1f661e15a9](https://user-images.githubusercontent.com/49770211/79679022-f77c7980-823c-11ea-8f8c-6ab92acd6af4.gif)

### ToDo削除

![2fdaefa3601f69d7ad79472decb3b985](https://user-images.githubusercontent.com/49770211/79679023-fea38780-823c-11ea-8d24-0926bf968e13.gif)

### キーワード検索

![1f599dd4e6785d3f3f3d98a49bd82ce7](https://user-images.githubusercontent.com/49770211/79679025-05ca9580-823d-11ea-92e9-6713e89b4eaf.gif)

## Environments

<!--実行環境 -->

- jQuery 3.4.1
- Bootstrap 4.4.1
- Vue.js v2.6.11

## Licence

This app is released under the [MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
