import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Target, Save, Sparkles } from "lucide-react";

const ImpactInput = () => {
  const { toast } = useToast();

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Impact Assessment — Data Input
        </h1>
        <p className="text-muted-foreground">
          Enter the transaction's impact inputs. The system generates the Impact Radar and
          Impact Brief from these fields — a preliminary version at ID Memo, refined at EIM,
          FIM and BRIC.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Impact Radar — Inputs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Impact Radar — Inputs</CardTitle>
            </div>
            <CardDescription>Scoring inputs behind the five radar dimensions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Sector</Label>
              <Select defaultValue="roads">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roads">Roads</SelectItem>
                  <SelectItem value="power">Power</SelectItem>
                  <SelectItem value="ports">Ports</SelectItem>
                  <SelectItem value="telecoms">Telecoms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="countries">Countries reached</Label>
              <Input id="countries" defaultValue="Guinea (100%)" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="capital">Total capital deployed US$m</Label>
                <Input id="capital" defaultValue="240" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jobs">Permanent direct jobs</Label>
                <Input id="jobs" defaultValue="1,850" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Climate emissions trajectory</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0 — No reduction</SelectItem>
                  <SelectItem value="1">1 — Marginal / uncertain reduction</SelectItem>
                  <SelectItem value="2">2 — Moderate reduction</SelectItem>
                  <SelectItem value="3">3 — Significant reduction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Additionality mobilisation</Label>
              <Select defaultValue="1.0">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.0">0.0 — Not additional</SelectItem>
                  <SelectItem value="0.5">0.5 — Partly additional</SelectItem>
                  <SelectItem value="1.0">1.0 — Central to the deal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="primary-capital">Primary capital %</Label>
              <Input id="primary-capital" defaultValue="85%" />
            </div>
          </CardContent>
        </Card>

        {/* Impact Brief — Inputs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Impact Brief — Inputs</CardTitle>
            </div>
            <CardDescription>Narrative and qualitative inputs behind the brief.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="summary">Impact summary</Label>
              <Textarea
                id="summary"
                rows={4}
                defaultValue="Financing the construction of a key section of Guinea's Northern Corridor (~160km of paved road), improving market access, essential services and cross-border trade for currently isolated regions."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Primary stakeholder</Label>
                <Select defaultValue="population">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="population">Population-level</SelectItem>
                    <SelectItem value="firm">Firm-level</SelectItem>
                    <SelectItem value="individual">Individual-level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="geography">Geography</Label>
                <Input id="geography" defaultValue="Guinea" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="scale">Scale</Label>
                <Input id="scale" defaultValue="~2.4m" />
              </div>
              <div className="space-y-1.5">
                <Label>Depth</Label>
                <Select defaultValue="moderate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shallow">Shallow</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="deep">Deep</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Duration</Label>
              <Select defaultValue="long-term">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short-term">Short-term</SelectItem>
                  <SelectItem value="medium-term">Medium-term</SelectItem>
                  <SelectItem value="long-term">Long-term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Ps of Transformation / SDGs</Label>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary">Platforms</Badge>
                <Badge variant="secondary">SDG 8</Badge>
                <Badge variant="secondary">SDG 9</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Draft saved",
              description: "Impact assessment inputs saved as a draft.",
            })
          }
        >
          <Save className="h-4 w-4 mr-2" />
          Save draft
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "Impact Annex generated",
              description: "The Impact Radar and Impact Brief have been generated from these inputs.",
            })
          }
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Impact Annex
        </Button>
      </div>
    </div>
  );
};

export default ImpactInput;
