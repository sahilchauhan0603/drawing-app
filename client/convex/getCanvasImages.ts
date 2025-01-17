import { query } from "./_generated/server";

export const getCanvasImages = query(
  async ({ db }, { userIdentifier }: { userIdentifier: string }) => {
    return await db
      .query("canvasImages")
      .filter((q) => q.eq(q.field("userIdentifier"), userIdentifier))
      .collect();
  }
);
