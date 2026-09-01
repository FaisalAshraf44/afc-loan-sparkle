import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";

const InvesteePortal = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6 flex items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Investee Portal
          </h1>
          <p className="text-muted-foreground">
            External portal where investees submit DI data annually.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Purpose</CardTitle>
            </div>
            <Badge variant="secondary">Design stage</Badge>
          </div>
          <CardDescription>
            A secure, external-facing portal for investees to submit their annual Development
            Impact data. Planned to include:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Annual DI submission</li>
            <li>View of historical submissions</li>
            <li>Supporting-document upload</li>
            <li>Secure external login</li>
            <li>Separate external user type</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvesteePortal;
