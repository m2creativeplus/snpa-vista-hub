"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { Upload, FileUp, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BulkUploaderProps {
  type: "products" | "users";
  onUpload: (data: any[]) => Promise<void>;
}

export function BulkUploader({ type, onUpload }: BulkUploaderProps) {
  const [data, setData] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setError(null);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`CSV Parsing Error: ${results.errors[0].message}`);
          return;
        }
        setData(results.data as any[]);
        toast.success(`Parsed ${results.data.length} records successfully.`);
      },
      error: (err) => {
        setError(`Failed to parse file: ${err.message}`);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (data.length === 0) return;
    
    setIsUploading(true);
    try {
      await onUpload(data);
      setData([]);
      toast.success("Bulk Import Processed Successfully");
    } catch (err: any) {
      toast.error("Import Failed", { description: err.message || "Unknown error" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer hover:bg-muted/50",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <input {...getInputProps()} />
          <div className="p-4 rounded-full bg-primary/10">
            {isDragActive ? (
              <FileUp className="w-8 h-8 text-primary animate-bounce" />
            ) : (
              <Upload className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              {isDragActive ? "Drop CSV here" : `Drag & Drop ${type} CSV`}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse your files
            </p>
          </div>
          <p className="text-xs text-muted-foreground px-4 py-1 bg-muted rounded-full">
            Supported: .csv (Max 5MB)
          </p>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {data.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Ready to Import: {data.length} {type}
                </h4>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setData([])} disabled={isUploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} disabled={isUploading}>
                        {isUploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {isUploading ? "Importing..." : "Run Bulk Import"}
                    </Button>
                </div>
            </div>

            <div className="border rounded-md max-h-[300px] overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {data.length > 0 && Object.keys(data[0]).slice(0, 5).map(header => (
                                <TableHead key={header} className="capitalize">{header}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.slice(0, 10).map((row, i) => (
                            <TableRow key={i}>
                                {Object.values(row).slice(0, 5).map((cell: any, j) => (
                                    <TableCell key={j} className="whitespace-nowrap">{String(cell)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {data.length > 10 && (
                    <div className="p-2 text-center text-xs text-muted-foreground border-t bg-muted/20">
                        ...and {data.length - 10} more rows
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}
