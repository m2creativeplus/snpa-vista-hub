"use client";

import { useState, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, FileIcon, Loader2, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function MediaPage() {
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const saveMedia = useMutation(api.media.saveMedia);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; url: string; type: string }>>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);

    for (const file of acceptedFiles) {
      try {
        // 1. Get upload URL from Convex
        const uploadUrl = await generateUploadUrl();

        // 2. Upload file to Convex storage
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        const { storageId } = await response.json();

        // 3. Save metadata
        const result = await saveMedia({
          storageId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        });

        // 4. Update local state
        setUploadedFiles((prev) => [
          ...prev,
          { name: file.name, url: result.url || "", type: file.type },
        ]);

        toast.success(`Uploaded: ${file.name}`);
      } catch (error) {
        toast.error(`Failed to upload: ${file.name}`);
      }
    }

    setUploading(false);
  }, [generateUploadUrl, saveMedia]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-snpa-primary/10 rounded-lg">
          <ImageIcon className="w-6 h-6 text-snpa-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-snpa-primary">
            Media Library
          </h1>
          <p className="text-muted-foreground">
            Upload and manage images, documents, and brand assets
          </p>
        </div>
      </div>

      {/* Upload Zone */}
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:bg-muted/50"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          ) : (
            <Upload className="w-12 h-12 text-muted-foreground" />
          )}
          <div>
            <h3 className="text-lg font-semibold">
              {isDragActive ? "Drop files here" : "Drag & Drop Media Files"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse (Images, PDFs)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</h2>
        {uploadedFiles.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No media uploaded yet. Drag files above to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="overflow-hidden group relative">
                {file.type.startsWith("image/") ? (
                  <div className="aspect-square bg-muted">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <FileIcon className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <CardContent className="p-2">
                  <p className="text-xs truncate">{file.name}</p>
                </CardContent>
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
