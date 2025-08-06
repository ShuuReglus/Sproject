// src/components/UploadForm.tsx
import React, { useState } from 'react';

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [comment, setComment] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setComment(null); // コメントをリセット
    }
  };

  const handleUpload = async () => {
    if (!image) return alert('画像を選んでください');

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('http://localhost:5003/generate-comment', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('APIからの応答が不正です');

      type GenerateCommentResponse = {
  comment: string;
  // 他に追加したくなったらここに書く
};

const data = await res.json() as GenerateCommentResponse;
setComment(data.comment ?? 'コメントが見つかりませんでした');


    } catch (err) {
      console.error(err);
      alert('アップロード中にエラーが発生しました');
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', maxWidth: '400px' }}>
      <h3>画像アップロード（大喜利）</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} style={{ marginTop: '1rem' }}>
        コメント生成
      </button>
      {comment && (
        <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
          <strong>🎤 コメント:</strong>
          <p>{comment}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;


