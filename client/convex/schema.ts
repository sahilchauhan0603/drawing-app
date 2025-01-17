import { defineSchema, defineTable } from "convex/server";
import {v} from 'convex/values'

export default defineSchema({
  canvasImages: defineTable({
    userIdentifier: v.string(), // Use a string validator
    imageData: v.string(),      // Use a string validator for Base64 image data
    createdAt: v.number(),    // Use a datetime validator for timestamps
  }),
});
