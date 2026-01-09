"use client";

import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ContentEditor } from "@/components/cms/ContentEditor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutTemplate, Megaphone, Database, ShieldAlert, RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";
import { BulkUploader } from "@/components/cms/BulkUploader";

export default function CMSPage() {
  const seed = useMutation(api.cms.seedDefaults);
  const bulkImportProducts = useMutation(api.bulk.batchImportProducts);
  const bulkImportUsers = useMutation(api.bulk.batchImportUsers);

  const handleSeed = async () => {
    toast.promise(seed({}), {
        loading: "Initializing Default Content...",
        success: "CMS Seeded Successfully!",
        error: "Failed to seed CMS."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-display font-bold text-snpa-primary">Content Operations</h1>
            <p className="text-muted-foreground">Manage public content, announcements, and system configurations.</p>
        </div>
        <Button variant="outline" onClick={handleSeed}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Defaults
        </Button>
      </div>

      <Tabs defaultValue="public" className="space-y-4">
        <TabsList>
            <TabsTrigger value="public" className="gap-2"><LayoutTemplate className="w-4 h-4"/> Public Pages</TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2"><Megaphone className="w-4 h-4"/> Announcements</TabsTrigger>
            <TabsTrigger value="bulk" className="gap-2"><Upload className="w-4 h-4"/> Bulk Ops</TabsTrigger>
            <TabsTrigger value="ministries" className="gap-2"><ShieldAlert className="w-4 h-4"/> Ministries (Data)</TabsTrigger>
            <TabsTrigger value="system" className="gap-2"><Database className="w-4 h-4"/> System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="grid md:grid-cols-2 gap-6">
            <ContentEditor section="hero" title="Homepage Hero" />
            {/* Future: Add more sections here */}
        </TabsContent>

        <TabsContent value="announcements" className="grid md:grid-cols-2 gap-6">
            <ContentEditor section="announcement" title="Global Banners" />
        </TabsContent>

        <TabsContent value="bulk" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-1">📦 Bulk Product Import</h3>
                        <p className="text-sm text-blue-700 mb-4">Upload a CSV with columns: <code>id, name, category, price, securityLevel</code></p>
                        <BulkUploader type="products" onUpload={async (data) => {
                            await bulkImportProducts({ products: data.map(d => ({
                                id: d.id, name: d.name, category: d.category, price: Number(d.price), securityLevel: d.securityLevel
                            }))});
                        }} />
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <h3 className="font-bold text-purple-900 mb-1">👥 Batch User Onboarding</h3>
                        <p className="text-sm text-purple-700 mb-4">Upload a CSV with columns: <code>email, fullName, ministryCode, role</code></p>
                        <BulkUploader type="users" onUpload={async (data) => {
                            await bulkImportUsers({ users: data });
                        }} />
                    </div>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="ministries">
            <div className="p-12 border border-dashed rounded-lg text-center text-muted-foreground">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <h3 className="text-lg font-medium">Ministry Data Management</h3>
                <p>This module will allow editing Budget Limits and Tiers directly.</p>
                <Button className="mt-4" variant="secondary" disabled>Coming in Phase 4.2</Button>
            </div>
        </TabsContent>

        <TabsContent value="system">
            <div className="p-12 border border-dashed rounded-lg text-center text-muted-foreground">
                 <p>Audit Logs placeholder.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
