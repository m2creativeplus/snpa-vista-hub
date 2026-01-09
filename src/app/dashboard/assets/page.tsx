"use client";

import { FileIcon, Folder, Download, Search, MoreVertical, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const assets = [
  { id: 1, name: "Ministry_Logo_Official_2026.ai", type: "vector", size: "2.4 MB", date: "Jan 01, 2026" },
  { id: 2, name: "Letterhead_Template_A4.pdf", type: "pdf", size: "1.1 MB", date: "Jan 03, 2026" },
  { id: 3, name: "Director_General_Signature_Digital.png", type: "image", size: "450 KB", date: "Dec 20, 2025" },
  { id: 4, name: "Standard_Font_Outfit_Bold.ttf", type: "font", size: "120 KB", date: "Jan 01, 2026" },
  { id: 5, name: "Ministry_Seal_Gold.svg", type: "vector", size: "15 KB", date: "Jan 01, 2026" },
  { id: 6, name: "ID_Badge_Template_v2.psd", type: "psd", size: "15.0 MB", date: "Jan 05, 2026" },
];

export default function AssetVaultPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Ministry Asset Vault</h1>
            <p className="text-gray-500">Secure storage for authorized government branding assets.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Folder className="w-4 h-4" /> New Folder
            </Button>
            <Button className="bg-snpa-primary hover:bg-green-700 gap-2">
                <Upload className="w-4 h-4" /> Upload Asset
            </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-center">
             <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search assets..." className="pl-9 bg-gray-50 border-gray-200" />
             </div>
             <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
                <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">All Files</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Logos</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Templates</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Signatures</Badge>
             </div>
        </div>
      </Card>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {assets.map((asset) => (
            <Card key={asset.id} className="group hover:border-snpa-primary hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3 h-full justify-between">
                    <div className="flex-1 flex items-center justify-center w-full bg-gray-50 rounded-lg p-6 group-hover:bg-green-50 transition-colors relative">
                        {asset.type === 'vector' || asset.type === 'font' ? (
                            <FileIcon className="w-12 h-12 text-blue-500" />
                        ) : asset.type === 'image' ? (
                             <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center text-purple-600 font-bold text-xs">IMG</div>
                        ) : (
                             <FileIcon className="w-12 h-12 text-red-500" />
                        )}
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="h-6 w-6">
                                <MoreVertical className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="font-bold text-sm text-gray-900 truncate" title={asset.name}>{asset.name}</h3>
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                             <span>{asset.size}</span>
                             <span>{asset.date}</span>
                        </div>
                    </div>
                    <Button size="sm" variant="ghost" className="w-full text-xs h-8 mt-2 group-hover:bg-snpa-primary group-hover:text-white transition-colors">
                        <Download className="w-3 h-3 mr-2" /> Download
                    </Button>
                </CardContent>
            </Card>
        ))}
        
        {/* Dropzone Placeholder */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-snpa-primary hover:text-snpa-primary hover:bg-green-50/50 transition-colors cursor-pointer min-h-[200px]">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm font-bold">Drag files to upload</span>
        </div>

      </div>
    </div>
  );
}
