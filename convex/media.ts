import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// List all media assets
export const listMedia = query({
  args: {},
  handler: async (ctx) => {
    // For now, return from a hypothetical media table
    // In production, this would query Convex file storage
    return [];
  },
});

// Generate upload URL (for Convex file storage)
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Save media metadata after upload
export const saveMedia = mutation({
  args: {
    storageId: v.id("_storage"),
    fileName: v.string(),
    fileType: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    // Get the URL for the uploaded file
    const url = await ctx.storage.getUrl(args.storageId);
    
    // Log the upload
    await ctx.db.insert("auditLog", {
      action: "MEDIA_UPLOAD",
      entityType: "media",
      entityId: args.storageId,
      userId: "system",
      details: `Uploaded ${args.fileName} (${args.fileType})`,
      timestamp: Date.now(),
    });

    return { storageId: args.storageId, url };
  },
});

// Delete media
export const deleteMedia = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
    
    await ctx.db.insert("auditLog", {
      action: "MEDIA_DELETE",
      entityType: "media",
      entityId: args.storageId,
      userId: "system",
      details: `Deleted media file`,
      timestamp: Date.now(),
    });
  },
});
