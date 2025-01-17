import { mutation } from "./_generated/server";

export default mutation(
  async (
    { db },
    { userIdentifier, imageData }: { userIdentifier: string; imageData: string }
  ) => {
    const savedImage = await db.insert("canvasImages", {
      userIdentifier,
      imageData,
      createdAt: Date.now(),
    });
    return savedImage;
  }
);
