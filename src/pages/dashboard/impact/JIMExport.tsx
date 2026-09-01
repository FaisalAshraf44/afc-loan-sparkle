import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";

const JIMExport = () => {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          JIM Export
        </h1>
        <p className="text-muted-foreground">
          Map submitted DI data to the Joint Impact Model (JIM) template.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileOutput className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Purpose</CardTitle>
            </div>
            <Badge variant="secondary">Design stage</Badge>
          </div>
          <CardDescription>
            Transforms submitted DI data into the Joint Impact Model input format. Planned to
            include:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Field-mapping from DI form to JIM columns</li>
            <li>One investee per row</li>
            <li>Interim export / future automation</li>
          </ul>
          <Button variant="outline" disabled>
            <FileOutput className="h-4 w-4 mr-2" />
            Export to JIM
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JIMExport;
