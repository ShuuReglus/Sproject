type ImageType = {
  id: string;
  url: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
};

const createImageMutation = `
  mutation CreateImage($input: CreateImageInput!) {
    createImage(input: $input) {
      id
      url
      uploadedBy
      createdAt
      updatedAt
    }
  }
`;

const addImage = async (): Promise<void> => {
  const newImage = {
    url: "https://example.com/image.png",
    description: "テスト画像",
    uploadedBy: "test-user",
  };

  const requestBody = {
    query: createImageMutation,
    variables: { input: newImage },
  };

  try {
    const response: Response = await fetch("https://example.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTPエラー! ステータス: ${response.status}`);
    }

    const result = (await response.json()) as {
      data: { createImage: ImageType };
    };
    console.log("画像追加成功:", result.data.createImage);
  } catch (error) {
    console.error("画像追加失敗:", error);
  }
};

addImage()
  .then(() => console.log("画像アップロード完了"))
  .catch((error) => console.error("画像アップロード失敗", error));
