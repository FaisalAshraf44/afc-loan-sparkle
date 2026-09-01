import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Target } from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { dimension: "Development Gap", score: 3 },
  { dimension: "Jobs Intensity", score: 4 },
  { dimension: "Climate", score: 2 },
  { dimension: "Knock-on Effect", score: 3 },
  { dimension: "Additionality", score: 4 },
];

interface ImpactAnnexProps {
  variant?: "preliminary" | "final";
}

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <div className="text-sm">{children}</div>
  </div>
);

export function ImpactAnnex({ variant = "final" }: ImpactAnnexProps) {
  const isPreliminary = variant === "preliminary";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Impact Radar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Impact Radar</CardTitle>
            </div>
            {isPreliminary && <Badge variant="warning">Preliminary</Badge>}
          </div>
          <CardDescription>Five-dimension impact profile, scored 0–5.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                />
                <Radar
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Preliminary at ID Memo; refined at EIM, FIM and BRIC.
          </p>
        </CardContent>
      </Card>

      {/* Impact Brief */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Impact Brief</CardTitle>
            {isPreliminary && <Badge variant="warning">Preliminary</Badge>}
          </div>
          <CardDescription>Summary of the deal's expected development impact.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field label="Impact Summary">
            Financing the construction of a key section of Guinea's Northern Corridor
            (~160km of paved road), improving market access, essential services and
            cross-border trade for currently isolated regions.
          </Field>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Stakeholder">Population-level</Field>
            <Field label="Geography">Guinea</Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Ps of Transformation">
              <Badge variant="secondary">Platforms</Badge>
            </Field>
            <Field label="SDGs">
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">SDG 8</Badge>
                <Badge variant="secondary">SDG 9</Badge>
              </div>
            </Field>
          </div>

          <Field label="Scale">~X million people connected; ~Y million annual trips</Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Depth">Moderate</Field>
            <Field label="Duration">Long-term (10+ years)</Field>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Contribution — Financial">Access to Finance; Tenor Extension</Field>
            <Field label="Contribution — Non-financial">N/A</Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Risks — Default">Evidence, External, Execution</Field>
            <Field label="Risks — Red Flag">N/A</Field>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ImpactAnnex;
