function doPost(e) {
  try {
    // スプレッドシートIDを設定（URLから取得）
    const SHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // メール通知先
    const NOTIFICATION_EMAIL = 'your-email@example.com';
    
    // リクエストデータを解析
    let data;
    
    // POSTデータの存在確認と解析
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        // フォールバック：パラメータから取得
        data = {
          name: e.parameter.name || 'Unknown',
          email: e.parameter.email || 'Unknown',
          message: e.parameter.message || 'Unknown',
          timestamp: new Date().toISOString()
        };
      }
    } else if (e && e.parameter) {
      // パラメータから直接取得
      data = {
        name: e.parameter.name || 'Unknown',
        email: e.parameter.email || 'Unknown', 
        message: e.parameter.message || 'Unknown',
        timestamp: new Date().toISOString()
      };
    } else {
      throw new Error('No data received');
    }
    
    // データの妥当性チェック
    if (!data.name || !data.email || !data.message) {
      throw new Error('Required fields are missing');
    }
    
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
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'データが正常に保存されました'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        message: 'データの保存に失敗しました'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用関数
function testFunction() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'テスト太郎',
        email: 'test@example.com',
        message: 'これはテストメッセージです',
        timestamp: new Date().toISOString()
      })
    }
  };
  
  const result = doPost(testData);
  console.log('Test Result:', result.getContent());
}