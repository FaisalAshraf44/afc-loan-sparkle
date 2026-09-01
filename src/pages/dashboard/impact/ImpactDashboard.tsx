import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

const ImpactDashboard = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Impact Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground">
          Portfolio-level aggregation of Radar/Brief and DI data.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Purpose</CardTitle>
            </div>
            <Badge variant="secondary">Design stage</Badge>
          </div>
          <CardDescription>
            Aggregates Impact Radar/Brief and DI submissions across the portfolio. Planned to
            include:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Slice by sector, team, geography, vintage, disbursed vs pipeline</li>
            <li>Portfolio radar profile</li>
            <li>Deal ranking</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactDashboard;
