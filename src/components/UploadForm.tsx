import React, { useState, useEffect } from "react";


export default function App() {
  return <UploadForm />;
}

const neonBlue = "#00f0ff";
const neonPink = "#ff00e0";
const neonPurple = "#9d00ff";
const neonCyan = "#00fff7";

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// 3Dネオン波アニメーション背景
const NeonWaveBackground = () => (
  <canvas
    id="neon-wave-bg"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      pointerEvents: "none",
      filter: "drop-shadow(0 0 6px #00f0ffaa) drop-shadow(0 0 15px #ff00e0aa)",
    }}
  />
);

// 花火＆光の粒コンポーネント
const Fireworks = ({ side }: { side: "left" | "right" }) => {
  const particlesCount = 20;
  const particles = Array.from({ length: particlesCount });

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        width: "20vw",
        pointerEvents: "none",
        [side]: 0,
        overflow: "visible",
        zIndex: 0,
      }}
    >
      {particles.map((_, i) => (
        <div
          key={i}
          className="firework-particle"
          style={{
            animationDelay: `${randomRange(0, 2)}s`,
            animationDuration: `${randomRange(1, 2.5)}s`,
            left: `${randomRange(0, 100)}%`,
            backgroundColor:
              i % 3 === 0 ? neonPink : i % 3 === 1 ? neonBlue : neonPurple,
            width: `${randomRange(4, 8)}px`,
            height: `${randomRange(4, 8)}px`,
            borderRadius: "50%",
            position: "absolute",
            bottom: 0,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        .firework-particle {
          animation-name: firework-burst;
          animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1);
          animation-iteration-count: infinite;
        }
        @keyframes firework-burst {
          0% {
            opacity: 0;
            transform: translateY(0) scale(1);
          }
          10% {
            opacity: 1;
            transform: translateY(-60px) scale(1.4);
          }
          100% {
            opacity: 0;
            transform: translateY(-180px) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

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

  // canvasで3Dネオン波を描く処理（初回のみ）
  useEffect(() => {
    const canvas = document.getElementById(
      "neon-wave-bg"
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const linesCount = 5;
    const lines: {
      y: number;
      phase: number;
      speed: number;
      amplitude: number;
    }[] = [];

    for (let i = 0; i < linesCount; i++) {
      lines.push({
        y: (height / (linesCount + 1)) * (i + 1),
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.02,
        amplitude: 20 + Math.random() * 20,
      });
    }

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      lines.forEach(({ y, phase, amplitude }) => {
        ctx.beginPath();
        ctx.lineWidth = 3;
        const gradient = ctx.createLinearGradient(0, y - amplitude, 0, y + amplitude);
        gradient.addColorStop(0, neonPink);
        gradient.addColorStop(0.5, neonBlue);
        gradient.addColorStop(1, neonCyan);
        ctx.strokeStyle = gradient;

        const segments = 100;
        for (let i = 0; i <= segments; i++) {
          const x = (width / segments) * i;
          const waveY = y + Math.sin(phase + (i / segments) * Math.PI * 4) * amplitude;
          if (i === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();

        // フェーズ更新
        lines.forEach((line) => (line.phase += line.speed));
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
  <>
    {/* Google Fonts */}
    <link
      href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
      rel="stylesheet"
    />

    <NeonWaveBackground />
    <Fireworks side="left" />
    <Fireworks side="right" />

    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        fontFamily: "'Orbitron', sans-serif",
        color: neonBlue,
        position: "relative",
        overflow: "visible",
        zIndex: 10,
        maxWidth: "720px",
        margin: "0 auto",
        boxSizing: "border-box",
        userSelect: "none",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3.5rem",
          textShadow: `
            0 0 10px ${neonPink},
            0 0 20px ${neonPink},
            0 0 30px ${neonBlue},
            0 0 40px ${neonPurple},
            0 0 70px ${neonPurple},
            0 0 80px ${neonPink}`,
          marginBottom: "2rem",
        }}
      >
         名言コメントメーカー 
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          padding: "1rem 2rem",
          borderRadius: "20px",
          border: `3px solid ${neonPink}`,
          background:
            "linear-gradient(45deg, rgba(255,0,224,0.5), rgba(0,255,255,0.5))",
          color: "#fff",
          fontWeight: "900",
          fontSize: "1.2rem",
          cursor: "pointer",
          boxShadow: `
            0 0 15px ${neonPink},
            0 0 40px ${neonBlue},
            0 0 60px ${neonPurple}`,
          marginBottom: "2rem",
          transition: "all 0.3s ease",
          userSelect: "none",
          textShadow: "0 0 5px #000",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = `
            0 0 30px ${neonPink},
            0 0 70px ${neonBlue},
            0 0 90px ${neonPurple}`)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = `
            0 0 15px ${neonPink},
            0 0 40px ${neonBlue},
            0 0 60px ${neonPurple}`)
        }
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="プレビュー"
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            borderRadius: "20px",
            border: `4px solid ${neonBlue}`,
            boxShadow: `0 0 20px ${neonBlue}, 0 0 30px ${neonPink}`,
            marginBottom: "1.5rem",
            zIndex: 1,
            filter: isUploading ? "blur(2px)" : "none",
            transition: "filter 0.3s ease",
            animation: isUploading ? "pulseBlur 1.5s infinite" : undefined,
          }}
        />
      )}

      {isUploading && (
        <p
          style={{
            color: neonPink,
            fontSize: "1.4rem",
            fontWeight: "bold",
            textShadow: `0 0 8px ${neonPink}`,
            marginBottom: "1.5rem",
            zIndex: 1,
          }}
        >
          コメント生成中...
        </p>
      )}

      {comment && !isUploading && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,0,224,0.8), rgba(0,255,255,0.8))",
            borderRadius: "20px",
            padding: "1rem 1.5rem",
            maxWidth: "350px",
            color: "#fff",
            fontSize: "1.3rem",
            boxShadow: `0 0 20px ${neonPink}, 0 0 40px ${neonBlue}`,
            zIndex: 1,
            whiteSpace: "pre-wrap",
            textAlign: "center",
            animation: "neonTextGlow 1.5s ease-in-out infinite alternate",
          }}
        >
          <strong>🎤 コメント:</strong>
          <p style={{ marginTop: "0.6rem" }}>{comment}</p>
        </div>
      )}
    </div>

    {/* keyframe animations */}
    <style>{`
      @keyframes glow {
        0%, 100% {
          background-position: 0% 0%, 50% 50%, 100% 100%;
        }
        50% {
          background-position: 100% 100%, 0% 0%, 50% 50%;
        }
      }

      @keyframes pulseBlur {
        0%, 100% {
          filter: blur(0);
        }
        50% {
          filter: blur(2px);
        }
      }

      @keyframes neonTextGlow {
        0% {
          text-shadow:
            0 0 5px ${neonPink},
            0 0 10px ${neonPink},
            0 0 20px ${neonBlue},
            0 0 30px ${neonPurple},
            0 0 40px ${neonPurple},
            0 0 50px ${neonPink};
        }
        100% {
          text-shadow:
            0 0 20px ${neonPink},
            0 0 30px ${neonPink},
            0 0 40px ${neonBlue},
            0 0 50px ${neonPurple},
            0 0 60px ${neonPurple},
            0 0 70px ${neonPink};
        }
      }
    `}</style>
  </>
);
}