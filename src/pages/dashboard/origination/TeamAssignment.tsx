import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Users, 
  Scale, 
  Leaf, 
  Wallet,
  Building2,
  UserPlus,
  CheckCircle,
  Clock,
  Mail
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: "legal_counsel" | "es_specialist" | "treasury" | "trade_finance";
  email: string;
  department: string;
  availability: "available" | "busy" | "unavailable";
}

interface ProjectAssignment {
  id: string;
  projectName: string;
  projectCode: string;
  clientName: string;
  assignmentDate: string;
  status: "pending" | "assigned" | "in_progress" | "completed";
  legalCounsel?: TeamMember;
  esSpecialist?: TeamMember;
  treasury?: TeamMember;
  tradeFinance?: TeamMember;
}

const teamMembers: TeamMember[] = [
  { id: "1", name: "John Smith", role: "legal_counsel", email: "j.smith@afc.com", department: "Legal", availability: "available" },
  { id: "2", name: "Sarah Johnson", role: "legal_counsel", email: "s.johnson@afc.com", department: "Legal", availability: "busy" },
  { id: "3", name: "Michael Chen", role: "es_specialist", email: "m.chen@afc.com", department: "E&S", availability: "available" },
  { id: "4", name: "Emily Davis", role: "es_specialist", email: "e.davis@afc.com", department: "E&S", availability: "available" },
  { id: "5", name: "David Brown", role: "treasury", email: "d.brown@afc.com", department: "Treasury", availability: "available" },
  { id: "6", name: "Lisa Wilson", role: "trade_finance", email: "l.wilson@afc.com", department: "Trade Finance", availability: "busy" },
];

const mockAssignments: ProjectAssignment[] = [
  {
    id: "1",
    projectName: "Series B Expansion",
    projectCode: "PROJ-2024-001",
    clientName: "TechVenture Inc",
    assignmentDate: "2024-01-15",
    status: "in_progress",
    legalCounsel: teamMembers[0],
    esSpecialist: teamMembers[2],
    treasury: teamMembers[4],
  },
  {
    id: "2",
    projectName: "Solar Farm Development",
    projectCode: "PROJ-2024-002",
    clientName: "GreenEnergy Solutions",
    assignmentDate: "2024-01-14",
    status: "assigned",
    legalCounsel: teamMembers[1],
    esSpecialist: teamMembers[3],
  },
  {
    id: "3",
    projectName: "Hospital Network Expansion",
    projectCode: "PROJ-2024-003",
    clientName: "Healthcare Plus",
    assignmentDate: "2024-01-13",
    status: "pending",
  },
];

const TeamAssignment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectAssignment | null>(null);
  const { toast } = useToast();

  const getStatusColor = (status: ProjectAssignment["status"]) => {
    switch (status) {
      case "pending": return "secondary";
      case "assigned": return "warning";
      case "in_progress": return "default";
      case "completed": return "success";
    }
  };

  const getRoleIcon = (role: TeamMember["role"]) => {
    switch (role) {
      case "legal_counsel": return <Scale className="h-4 w-4" />;
      case "es_specialist": return <Leaf className="h-4 w-4" />;
      case "treasury": return <Wallet className="h-4 w-4" />;
      case "trade_finance": return <Wallet className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: TeamMember["role"]) => {
    switch (role) {
      case "legal_counsel": return "Legal Counsel";
      case "es_specialist": return "E&S Specialist";
      case "treasury": return "Treasury";
      case "trade_finance": return "Trade Finance";
    }
  };

  const getAvailabilityColor = (availability: TeamMember["availability"]) => {
    switch (availability) {
      case "available": return "bg-emerald-500";
      case "busy": return "bg-amber-500";
      case "unavailable": return "bg-red-500";
    }
  };

  const filteredAssignments = mockAssignments.filter(assignment =>
    assignment.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TeamMemberCard = ({ member, role }: { member?: TeamMember; role: TeamMember["role"] }) => {
    if (!member) {
      return (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-border">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Not Assigned</p>
            <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
          </div>
          <Button variant="outline" size="sm">Assign</Button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
        <div className="relative">
          <Avatar>
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getAvailabilityColor(member.availability)}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
        </div>
        <Button variant="ghost" size="icon">
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Team Assignment
        </h1>
        <p className="text-muted-foreground">
          Assign legal counsel, E&S specialists, and Treasury/Trade Finance to projects
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.filter(m => m.role === "legal_counsel").length}</div>
                <p className="text-xs text-muted-foreground">Legal Counsel</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.filter(m => m.role === "es_specialist").length}</div>
                <p className="text-xs text-muted-foreground">E&S Specialists</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.filter(m => m.role === "treasury").length}</div>
                <p className="text-xs text-muted-foreground">Treasury</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">{teamMembers.filter(m => m.role === "trade_finance").length}</div>
                <p className="text-xs text-muted-foreground">Trade Finance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{assignment.projectName}</CardTitle>
                    <CardDescription>
                      {assignment.clientName} • {assignment.projectCode}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusColor(assignment.status)}>
                  {assignment.status === "in_progress" ? "In Progress" : assignment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-purple-500" />
                    Legal Counsel
                  </p>
                  <TeamMemberCard member={assignment.legalCounsel} role="legal_counsel" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-500" />
                    E&S Specialist
                  </p>
                  <TeamMemberCard member={assignment.esSpecialist} role="es_specialist" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-blue-500" />
                    Treasury
                  </p>
                  <TeamMemberCard member={assignment.treasury} role="treasury" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-amber-500" />
                    Trade Finance
                  </p>
                  <TeamMemberCard member={assignment.tradeFinance} role="trade_finance" />
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Manage Assignments
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Manage Team Assignments</DialogTitle>
                      <DialogDescription>
                        Assign team members to {assignment.projectName}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Legal Counsel</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select legal counsel" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.filter(m => m.role === "legal_counsel").map(m => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name} ({m.availability})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>E&S Specialist</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select E&S specialist" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.filter(m => m.role === "es_specialist").map(m => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name} ({m.availability})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Treasury</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select treasury member" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.filter(m => m.role === "treasury").map(m => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name} ({m.availability})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Trade Finance</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select trade finance member" />
                          </SelectTrigger>
                          <SelectContent>
                            {teamMembers.filter(m => m.role === "trade_finance").map(m => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name} ({m.availability})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full" onClick={() => {
                        toast({
                          title: "Assignments Updated",
                          description: "Team members have been notified of their assignment.",
                        });
                      }}>
                        Save Assignments
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Notifications Sent",
                    description: "All assigned team members have been notified.",
                  });
                }}>
                  <Mail className="h-4 w-4 mr-2" />
                  Notify Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamAssignment;
