# Google Apps Script セットアップガイド

お問い合わせフォームをGoogle Sheetsに保存し、メール通知を送信するための設定手順です。

## 1. Google Sheetsの準備

1. [Google Sheets](https://sheets.google.com)にアクセス
2. 新しいスプレッドシートを作成
3. シート名を「お問い合わせ」に変更
4. A1セルから以下のヘッダーを入力：
   ```
   A1: 受信日時
   B1: お名前
   C1: メールアドレス
   D1: メッセージ
   ```

## 2. Google Apps Scriptの設定

1. Google Sheetsの「拡張機能」→「Apps Script」をクリック
2. デフォルトのコードを削除し、以下のコードを貼り付け：

```javascript
function doPost(e) {
  try {
    // スプレッドシートIDを設定（URLから取得）
    const SHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // メール通知先
    const NOTIFICATION_EMAIL = 'your-email@example.com';
    
    // リクエストデータを解析
    const data = JSON.parse(e.postData.contents);
    
    // スプレッドシートに追加
    sheet.appendRow([
      new Date(data.timestamp),
      data.name,
      data.email,
      data.message
    ]);
    
    // メール通知を送信
    const subject = '【ポートフォリオ】新しいお問い合わせがあります';
    const body = `
新しいお問い合わせが届きました。

■ お名前
${data.name}

■ メールアドレス
${data.email}

■ メッセージ
${data.message}

■ 受信日時
${new Date(data.timestamp).toLocaleString('ja-JP')}

---
このメールはポートフォリオサイトから自動送信されています。
    `;
    
    GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. 設定の更新

1. **SHEET_ID**：Google SheetsのURLから取得
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

2. **NOTIFICATION_EMAIL**：通知を受信したいメールアドレス

## 4. デプロイ

1. 「デプロイ」→「新しいデプロイ」をクリック
2. 種類：「ウェブアプリ」を選択
3. 実行ユーザー：「自分」
4. アクセス権限：「全員」
5. 「デプロイ」をクリック
6. **ウェブアプリのURL**をコピー

## 5. React コードの更新

`src/components/sections/Contact.jsx`の以下の部分を更新：

```javascript
const response = await fetch('YOUR_WEB_APP_URL_HERE', {
```

## 6. 権限の許可

初回実行時に以下の権限を許可：
- Google Sheetsへのアクセス
- Gmailでのメール送信

## 7. テスト

1. ポートフォリオサイトのお問い合わせフォームから送信
2. Google Sheetsにデータが追加されることを確認
3. メール通知が届くことを確認

## 注意事項

- スプレッドシートIDとメールアドレスは実際の値に置き換えてください
- Apps Scriptの実行回数に制限があります（1日6分間）
- セキュリティのため、機密情報は環境変数で管理することを推奨します

## トラブルシューティング

- フォーム送信が失敗する場合：ブラウザの開発者ツールでエラーを確認
- メールが届かない場合：Gmail の迷惑メールフォルダを確認
- Apps Script のログを確認：「実行数」タブでエラーログを確認