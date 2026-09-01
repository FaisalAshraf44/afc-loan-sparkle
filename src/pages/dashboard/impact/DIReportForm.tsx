import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Send } from "lucide-react";

type TemplateKey = "single-country" | "multi-country" | "sovereign" | "short-term" | "letter-of-credit";

const templates: { key: TemplateKey; label: string; customisable: boolean }[] = [
  { key: "single-country", label: "Single-country", customisable: true },
  { key: "multi-country", label: "Multi-country", customisable: true },
  { key: "sovereign", label: "Sovereign", customisable: true },
  { key: "short-term", label: "Short-term", customisable: false },
  { key: "letter-of-credit", label: "Letter of Credit", customisable: false },
];

const fixedSections: { section: string; rows: { indicator: string; example: string }[] }[] = [
  {
    section: "Basic Information",
    rows: [
      { indicator: "Client name", example: "e.g. Northern Corridor Infrastructure Co." },
      { indicator: "Reporting year", example: "e.g. 2025" },
    ],
  },
  {
    section: "Financial Indicators",
    rows: [
      { indicator: "Revenue", example: "USD" },
      { indicator: "EBITDA", example: "USD" },
      { indicator: "Payments to government", example: "USD" },
    ],
  },
  {
    section: "General Indicators",
    rows: [
      { indicator: "Direct jobs supported", example: "# of employees" },
      { indicator: "Absolute emissions — Scope 1", example: "tCO2e" },
    ],
  },
];

const sectorIndicators = [
  "Installed generation capacity (MW)",
  "Electricity generated (MWh)",
  "New connections",
  "People with new access",
];

const DIReportForm = () => {
  const { toast } = useToast();
  const [selected, setSelected] = useState<TemplateKey>("single-country");
  const [checkedIndicators, setCheckedIndicators] = useState<string[]>([
    sectorIndicators[0],
    sectorIndicators[1],
  ]);

  const activeTemplate = templates.find((t) => t.key === selected)!;

  const toggleIndicator = (indicator: string) => {
    setCheckedIndicators((prev) =>
      prev.includes(indicator)
        ? prev.filter((i) => i !== indicator)
        : [...prev, indicator]
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          DI Report Forms
        </h1>
        <p className="text-muted-foreground">
          Select, customise and issue the Development Impact (DI) Report Form for a deal.
        </p>
      </div>

      {/* Template Selector */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Template</CardTitle>
          </div>
          <CardDescription>Choose the report template that matches the deal.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {templates.map((t) => {
              const active = selected === t.key;
              return (
                <Card
                  key={t.key}
                  onClick={() => setSelected(t.key)}
                  className={`p-3 cursor-pointer transition-colors text-center hover:bg-accent ${
                    active ? "border-primary bg-accent" : ""
                  }`}
                >
                  <p className="font-medium text-sm">{t.label}</p>
                  <Badge variant={t.customisable ? "secondary" : "warning"} className="mt-2 text-xs">
                    {t.customisable ? "Customisable" : "Fixed"}
                  </Badge>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {activeTemplate.customisable ? (
        <div className="space-y-6">
          {/* Fixed sections preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Sections</CardTitle>
              <CardDescription>
                Fixed sections that appear on every {activeTemplate.label.toLowerCase()} report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fixedSections.map((section) => (
                <div key={section.section}>
                  <h4 className="font-semibold text-sm mb-2">{section.section}</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Indicator</TableHead>
                        <TableHead>Expected input</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.rows.map((row) => (
                        <TableRow key={row.indicator}>
                          <TableCell className="font-medium">{row.indicator}</TableCell>
                          <TableCell className="text-muted-foreground">{row.example}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sector-specific indicators */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Sector-specific Indicators</CardTitle>
                <Badge variant="secondary">Customisable — sector indicators selected by the Deal team</Badge>
              </div>
              <CardDescription>Example sector: Power</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sectorIndicators.map((indicator) => (
                <div key={indicator} className="flex items-center gap-2">
                  <Checkbox
                    id={indicator}
                    checked={checkedIndicators.includes(indicator)}
                    onCheckedChange={() => toggleIndicator(indicator)}
                  />
                  <Label htmlFor={indicator} className="text-sm font-normal cursor-pointer">
                    {indicator}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <p className="text-sm font-medium">Financial Services template — fixed, never customised.</p>
            <p className="text-sm text-muted-foreground mt-1">
              The {activeTemplate.label} form uses a standard indicator set for all deals.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end pt-6">
        <Button
          onClick={() =>
            toast({
              title: "DI Report Form issued",
              description: "DI Report Form issued to investee.",
            })
          }
        >
          <Send className="h-4 w-4 mr-2" />
          Send to investee
        </Button>
      </div>
    </div>
  );
};

export default DIReportForm;
