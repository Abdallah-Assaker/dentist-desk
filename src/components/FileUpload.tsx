import { useState, useRef } from "react";
import { X, Upload, Image, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "document";
  url: string;
  file?: File;
}

interface FileUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  acceptedTypes?: string;
}

export default function FileUpload({
  files,
  onFilesChange,
  disabled = false,
  maxFiles = 10,
  acceptedTypes = "image/*,.pdf,.doc,.docx",
}: FileUploadProps) {
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (files.length + newFiles.length >= maxFiles) return;

      const isImage = file.type.startsWith("image/");
      const url = URL.createObjectURL(file);

      newFiles.push({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: isImage ? "image" : "document",
        url,
        file,
      });
    });

    onFilesChange([...files, ...newFiles]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (id: string) => {
    const fileToRemove = files.find((f) => f.id === id);
    if (fileToRemove?.url.startsWith("blob:")) {
      URL.revokeObjectURL(fileToRemove.url);
    }
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const handlePreview = (file: UploadedFile) => {
    setPreviewFile(file);
  };

  return (
    <div className="space-y-3">
      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-2 bg-muted rounded-lg group"
            >
              {file.type === "image" ? (
                <div className="h-10 w-10 rounded overflow-hidden bg-background flex-shrink-0">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-10 w-10 rounded bg-background flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <span className="text-sm flex-1 truncate">{file.name}</span>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handlePreview(file)}
                >
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </Button>
                {!disabled && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleRemove(file.id)}
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {files.length === 0 && (
        <p className="text-sm text-muted-foreground">No attachments</p>
      )}

      {/* Upload Button */}
      {!disabled && files.length < maxFiles && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedTypes}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Add Attachment
          </Button>
        </>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="truncate pr-8">
              {previewFile?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center min-h-[300px] bg-muted rounded-lg overflow-hidden">
            {previewFile?.type === "image" ? (
              <img
                src={previewFile.url}
                alt={previewFile.name}
                className="max-w-full max-h-[70vh] object-contain"
              />
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">{previewFile?.name}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (previewFile?.url) {
                      window.open(previewFile.url, "_blank");
                    }
                  }}
                >
                  Open Document
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
