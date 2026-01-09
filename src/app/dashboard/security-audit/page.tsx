"use client";

import { useState } from "react";
import { Upload, CheckCircle, AlertTriangle, ShieldCheck, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function SecurityAuditPage() {
  const [score, setScore] = useState(0);
  const [isanalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | { level: string; color: string }>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI Analysis
    setTimeout(() => {
      const calculatedScore = 45; // Mock score based on "missing watermark"
      setScore(calculatedScore);
      setResults({
        level: "Medium Security (Level 2)",
        color: "text-amber-500",
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-snpa-primary">Security Scoring Engine</h1>
          <p className="text-muted-foreground">Automated document inspection against ISO 14298 standards.</p>
        </div>
        <Button onClick={handleAnalyze} disabled={isanalyzing} className="bg-snpa-primary hover:bg-snpa-primary/90 text-white">
          {isanalyzing ? "Scanning..." : "Run New Audit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Zone */}
        <Card className="border-dashed border-2 border-slate-300 bg-slate-50/50">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">Upload Document Scan</h3>
              <p className="text-sm text-slate-500">Supports PDF, JPG, PNG (Max 50MB)</p>
            </div>
            <Button variant="outline">Select File</Button>
          </CardContent>
        </Card>

        {/* Scoring Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Security Index</CardTitle>
            <CardDescription>Benchmarked against India SPMCIL & South Africa GPW</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center p-6">
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-slate-100">
                <span className={`text-4xl font-bold ${results?.color || "text-slate-900"}`}>{score}/100</span>
                {/* Visual ring would go here */}
              </div>
            </div>
            {results && (
              <div className="text-center space-y-2">
                <Badge variant="outline" className={`${results.color} border-current`}>{results.level}</Badge>
                <p className="text-sm text-slate-600">
                  Your document is <b>2 levels behind</b> the target benchmark.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Watermark (Substrate)", status: "Missing", impact: "High", penalty: "-15 pts" },
              { name: "Serialization (Unique ID)", status: "Present", impact: "Medium", penalty: "+10 pts" },
              { name: "Guilloche Pattern", status: "Partial", impact: "Medium", penalty: "+5 pts" },
              { name: "UV / Invisible Ink", status: "Missing", impact: "Critical", penalty: "-20 pts" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded border">
                <div className="flex items-center gap-3">
                  {item.status === "Missing" ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : item.status === "Partial" ? (
                    <FileText className="w-5 h-5 text-amber-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.impact} Impact</p>
                  </div>
                </div>
                <Badge variant="secondary">{item.penalty}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
