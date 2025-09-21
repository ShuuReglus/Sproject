import React, { useEffect, useState } from "react";

export default function App() {
  return <UploadForm />;
}

// 落ち着いたカラーパレット
const primaryColor = "#4f46e5"; // インディゴ
const secondaryColor = "#6366f1"; // ライトインディゴ
const accentColor = "#8b5cf6"; // パープル
const textColor = "#1f2937"; // ダークグレー
const lightGray = "#f3f4f6";
const mediumGray = "#9ca3af";

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// シンプルな背景グラデーション
const SimpleBackground = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: `linear-gradient(135deg, 
        ${lightGray} 0%, 
        #ffffff  50%, 
        ${lightGray} 100%)`,
      zIndex: 0,
      pointerEvents: "none",
    }}
  />
);

const UploadForm = () => {
  const [isSystemOpen, setIsSystemOpen] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      setImage(file);
      setComment(null);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
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

  // 背景アニメーションは削除してシンプルに

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <SimpleBackground />

      <div
        style={{
          minHeight: "100vh",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "3rem 2rem",
          fontFamily: "'Inter', sans-serif",
          color: textColor,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowY: "auto",
          position: "relative",
          zIndex: 10,
          boxSizing: "border-box",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: primaryColor,
            marginBottom: "0.5rem",
            letterSpacing: "-0.025em",
          }}
        >
          名言コメントメーカー
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: mediumGray,
            marginBottom: "3rem",
            fontWeight: "400",
          }}
        >
          画像をアップロードして、AIが面白いコメントを生成します
        </p>

        {/* ドラッグ&ドロップエリア + ファイル選択ボタン */}
        <div
          style={{
            position: "relative",
            marginBottom: "2rem",
            padding: "3rem 2rem",
            border: isDragOver
              ? `2px dashed ${primaryColor}`
              : `2px dashed ${mediumGray}`,
            borderRadius: "16px",
            background: isDragOver ? "rgba(79, 70, 229, 0.05)" : "#ffffff",
            transition: "all 0.3s ease",
            minHeight: "200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            boxShadow: isDragOver
              ? "0 10px 25px rgba(79, 70, 229, 0.15)"
              : "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="file-input"
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              cursor: "pointer",
              zIndex: 2,
            }}
          />

          <div
            style={{
              fontSize: "3rem",
              marginBottom: "0.5rem",
              transition: "transform 0.2s ease",
              transform: isDragOver ? "scale(1.1)" : "scale(1)",
            }}
          >
            {isDragOver ? "📥" : ""}
          </div>

          <label
            htmlFor="file-input"
            style={{
              display: "inline-block",
              padding: "1rem 2rem",
              borderRadius: "12px",
              border: "none",
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: "#ffffff",
              fontWeight: "600",
              fontSize: "1.1rem",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
              transition: "all 0.2s ease",
              userSelect: "none",
              position: "relative",
              textAlign: "center",
              minWidth: "200px",
              zIndex: 3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(79, 70, 229, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(79, 70, 229, 0.3)";
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              画像を選択
            </span>
          </label>

          <p
            style={{
              color: mediumGray,
              fontSize: "0.9rem",
              margin: 0,
              zIndex: 1,
              fontWeight: "400",
            }}
          >
            {isDragOver
              ? "ここにドロップしてください！"
              : "画像をドラッグ&ドロップ または クリックして選択"}
          </p>
        </div>

        {previewUrl && (
          <img
            src={previewUrl}
            alt="プレビュー"
            style={{
              maxWidth: "320px",
              maxHeight: "320px",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              marginBottom: "2rem",
              filter: isUploading ? "blur(1px)" : "none",
              transition: "filter 0.3s ease",
              opacity: isUploading ? 0.7 : 1,
              zIndex: 1,
            }}
          />
        )}

        {isUploading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                border: `3px solid ${lightGray}`,
                borderTop: `3px solid ${primaryColor}`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p
              style={{
                color: textColor,
                fontSize: "1.1rem",
                fontWeight: "500",
                margin: 0,
              }}
            >
              コメント生成中...
            </p>
          </div>
        )}

        {comment && !isUploading && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "400px",
              color: textColor,
              fontSize: "1.1rem",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              whiteSpace: "pre-wrap",
              textAlign: "left",
              marginBottom: "2rem",
              zIndex: 1,
              border: `1px solid ${lightGray}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
                color: primaryColor,
                fontWeight: "600",
              }}
            >
              AIコメント
            </div>
            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                fontWeight: "400",
              }}
            >
              {comment}
            </p>
          </div>
        )}
      </div>

      {/* keyframe animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* スクロールバー非表示 */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* スムーズなスクロール */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      {isSystemOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsSystemOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "2rem",
              borderRadius: "16px",
              color: textColor,
              fontFamily: "'Inter', sans-serif",
              maxWidth: "400px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                marginBottom: "1.5rem",
                color: primaryColor,
                fontWeight: "600",
              }}
            >
              設定
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
