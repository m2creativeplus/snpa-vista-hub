"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

interface ContentEditorProps {
  section: string;
  title: string;
}

export function ContentEditor({ section, title }: ContentEditorProps) {
  const content = useQuery(api.cms.getContent, { section });
  const updateContent = useMutation(api.cms.updateContent);
  const [editingValues, setEditingValues] = useState<Record<string, string>>({});

  if (!content) {
      return (
          <Card>
              <CardContent className="p-6 flex justify-center">
                  <Loader2 className="animate-spin text-muted-foreground" />
              </CardContent>
          </Card>
      )
  }

  const handleSave = async (key: string, originalValue: string, type: "text" | "image" | "json") => {
    const newValue = editingValues[key];
    if (newValue === undefined || newValue === originalValue) return;

    try {
      await updateContent({
        section,
        key,
        value: newValue,
        type,
      });
      toast.success("Content Updated", { description: `${key} saved successfully.` });
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Manage content for the {section} section.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {content.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No editable content found for this section. Run seed.</p>
        )}
        {content.map((item) => (
          <div key={item._id} className="grid gap-2">
            <Label className="capitalize">{item.key.replace(/_/g, " ")}</Label>
            <div className="flex gap-2">
                <Input 
                    defaultValue={item.value} 
                    onChange={(e) => setEditingValues(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
                <Button 
                    size="icon" 
                    variant={editingValues[item.key] && editingValues[item.key] !== item.value ? "default" : "ghost"}
                    onClick={() => handleSave(item.key, item.value, item.type as any)}
                    disabled={!editingValues[item.key] || editingValues[item.key] === item.value}
                >
                    <Save className="w-4 h-4" />
                </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
