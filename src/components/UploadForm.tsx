import React, { useState, useEffect } from "react";

const UploadForm = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setComment(null);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const uploadImageAndGetComment = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5003/generate-comment", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("APIからの応答が不正です");

      type GenerateCommentResponse = {
        comment: string;
      };

      const data = (await res.json()) as GenerateCommentResponse;
      setComment(data.comment ?? "コメントが見つかりませんでした");
    } catch (err) {
      console.error(err);
      alert("アップロード中にエラーが発生しました");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (image) {
      void uploadImageAndGetComment(image);
    }
  }, [image]);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", maxWidth: "400px" }}>
      <h3>画像アップロード（大喜利）</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div style={{ marginTop: 10 }}>
          <img
            src={previewUrl}
            alt="プレビュー"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        </div>
      )}
      {isUploading && <p>コメント生成中...</p>}
      {comment && !isUploading && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <strong>🎤 コメント:</strong>
          <p>{comment}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;




