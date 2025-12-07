import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, AlertCircle, FileText, Shield, Landmark, Upload, Calendar, DollarSign, Percent, ExternalLink } from "lucide-react";

const disbursements = [
  {
    id: "DISB-001",
    client: "Tech Innovations Ltd",
    amount: "$2,500,000",
    requestDate: "2024-01-15",
    approver: "John Smith",
    status: "Approved",
    stage: "Final Approval",
    riskLimitStatus: "Pending",
    loanBookingStatus: "Pending",
  },
  {
    id: "DISB-002",
    client: "Green Energy Corp",
    amount: "$1,800,000",
    requestDate: "2024-01-16",
    approver: "Sarah Johnson",
    status: "In Progress",
    stage: "Treasury Review",
    riskLimitStatus: "Pending",
    loanBookingStatus: "Pending",
  },
  {
    id: "DISB-003",
    client: "Medical Solutions Inc",
    amount: "$3,200,000",
    requestDate: "2024-01-17",
    approver: "Pending",
    status: "In Progress",
    stage: "Legal Review",
    riskLimitStatus: "Created",
    loanBookingStatus: "Pending",
  },
  {
    id: "DISB-004",
    client: "Retail Ventures LLC",
    amount: "$950,000",
    requestDate: "2024-01-14",
    approver: "Mike Chen",
    status: "Completed",
    stage: "Disbursed",
    riskLimitStatus: "Created",
    loanBookingStatus: "Completed",
  },
];

const repaymentProfiles = [
  {
    id: "RP-001",
    dealId: "DISB-004",
    client: "Retail Ventures LLC",
    principal: "$950,000",
    interestRate: "8.5%",
    tenor: "36 months",
    repaymentType: "Monthly",
    firstPaymentDate: "2024-02-14",
    status: "Active",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { className: string, icon: any }> = {
    "Approved": { className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", icon: CheckCircle },
    "In Progress": { className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20", icon: Clock },
    "Completed": { className: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", icon: CheckCircle },
    "Active": { className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", icon: CheckCircle },
    "Created": { className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20", icon: CheckCircle },
    "Pending": { className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20", icon: Clock },
  };
  
  const config = variants[status] || { className: "bg-muted text-muted-foreground border-muted", icon: AlertCircle };
  const Icon = config.icon;
  
  return (
    <Badge className={`gap-1 ${config.className}`}>
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
};

export default function Process() {
  const { toast } = useToast();
  const [selectedDeal, setSelectedDeal] = useState<string>("");
  const [loanTerms, setLoanTerms] = useState({
    principal: "",
    interestRate: "",
    tenor: "",
    repaymentType: "Monthly",
    firstPaymentDate: "",
    gracePeriod: "",
    notes: "",
  });

  const handleCreateSAPLimit = (dealId: string, client: string) => {
    toast({
      title: "SAP Limit Creation Initiated",
      description: `Limit creation request for ${client} (${dealId}) has been sent to SAP. Risk Management will be notified upon completion.`,
    });
  };

  const handleBookLoan = () => {
    if (!selectedDeal) {
      toast({
        title: "Error",
        description: "Please select a deal to book.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Loan Booked Successfully",
      description: `Loan terms for ${selectedDeal} have been recorded. Repayment profile uploaded to the system.`,
    });

    setLoanTerms({
      principal: "",
      interestRate: "",
      tenor: "",
      repaymentType: "Monthly",
      firstPaymentDate: "",
      gracePeriod: "",
      notes: "",
    });
    setSelectedDeal("");
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disbursement Process</h1>
        <p className="text-muted-foreground mt-2">
          Risk Management limits and Finance & Settlements loan booking
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="risk-limits">
            <Shield className="h-4 w-4 mr-2" />
            Risk Management (SAP)
          </TabsTrigger>
          <TabsTrigger value="loan-booking">
            <Landmark className="h-4 w-4 mr-2" />
            Finance & Settlements
          </TabsTrigger>
          <TabsTrigger value="repayment-profiles">
            <Calendar className="h-4 w-4 mr-2" />
            Repayment Profiles
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Approved
              </div>
              <div className="text-3xl font-bold">1</div>
              <p className="text-sm text-muted-foreground mt-1">$2.5M ready</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 text-amber-600" />
                In Progress
              </div>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-muted-foreground mt-1">$5.0M pending</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Shield className="h-4 w-4 text-purple-600" />
                SAP Limits Created
              </div>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-muted-foreground mt-1">Risk cleared</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Landmark className="h-4 w-4 text-blue-600" />
                Loans Booked
              </div>
              <div className="text-3xl font-bold">1</div>
              <p className="text-sm text-muted-foreground mt-1">$950K active</p>
            </Card>
          </div>

          <Card>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Disbursement Requests</h2>
                <Button onClick={() => {
                  toast({
                    title: "Disbursement Instruction Sent",
                    description: "The disbursement instruction has been sent and Treasury has been notified.",
                  });
                }}>
                  <FileText className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>SAP Limit</TableHead>
                  <TableHead>Loan Booking</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disbursements.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell className="font-semibold">{item.amount}</TableCell>
                    <TableCell>{item.requestDate}</TableCell>
                    <TableCell>{getStatusBadge(item.riskLimitStatus)}</TableCell>
                    <TableCell>{getStatusBadge(item.loanBookingStatus)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Risk Management (SAP) Tab */}
        <TabsContent value="risk-limits" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">SAP Limit Management</h2>
                <p className="text-sm text-muted-foreground">
                  Risk Management creates exposure limits on SAP for approved disbursements
                </p>
              </div>
              <Badge variant="outline" className="ml-auto gap-1">
                <ExternalLink className="h-3 w-3" />
                SAP Integration (Coming Soon)
              </Badge>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> SAP is a third-party solution that will be integrated in later stages. 
                Currently, limit creation requests are logged and queued for manual processing in SAP.
              </p>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>SAP Limit Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disbursements.filter(d => d.status === "Approved" || d.status === "Completed").map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell className="font-semibold">{item.amount}</TableCell>
                    <TableCell>{getStatusBadge(item.riskLimitStatus)}</TableCell>
                    <TableCell>{item.riskLimitStatus === "Created" ? "Risk Officer" : "-"}</TableCell>
                    <TableCell>{item.riskLimitStatus === "Created" ? item.requestDate : "-"}</TableCell>
                    <TableCell>
                      {item.riskLimitStatus === "Pending" ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleCreateSAPLimit(item.id, item.client)}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Create SAP Limit
                        </Button>
                      ) : (
                        <Badge variant="outline" className="bg-green-500/10 text-green-700">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Limit Active
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Finance & Settlements Tab */}
        <TabsContent value="loan-booking" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Landmark className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Book Loan Terms</h2>
                  <p className="text-sm text-muted-foreground">
                    Finance & Settlements records loan terms and repayment profile
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Select Deal</Label>
                  <Select value={selectedDeal} onValueChange={setSelectedDeal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a deal to book" />
                    </SelectTrigger>
                    <SelectContent>
                      {disbursements.filter(d => d.riskLimitStatus === "Created" && d.loanBookingStatus === "Pending").map((deal) => (
                        <SelectItem key={deal.id} value={deal.id}>
                          {deal.id} - {deal.client} ({deal.amount})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Principal Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-9"
                        placeholder="0.00"
                        value={loanTerms.principal}
                        onChange={(e) => setLoanTerms({ ...loanTerms, principal: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Interest Rate</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-9"
                        placeholder="0.00"
                        value={loanTerms.interestRate}
                        onChange={(e) => setLoanTerms({ ...loanTerms, interestRate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tenor (Months)</Label>
                    <Input 
                      placeholder="e.g., 36"
                      value={loanTerms.tenor}
                      onChange={(e) => setLoanTerms({ ...loanTerms, tenor: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Grace Period (Months)</Label>
                    <Input 
                      placeholder="e.g., 6"
                      value={loanTerms.gracePeriod}
                      onChange={(e) => setLoanTerms({ ...loanTerms, gracePeriod: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Repayment Type</Label>
                    <Select 
                      value={loanTerms.repaymentType} 
                      onValueChange={(value) => setLoanTerms({ ...loanTerms, repaymentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Quarterly">Quarterly</SelectItem>
                        <SelectItem value="Semi-Annual">Semi-Annual</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="Bullet">Bullet Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>First Payment Date</Label>
                    <Input 
                      type="date"
                      value={loanTerms.firstPaymentDate}
                      onChange={(e) => setLoanTerms({ ...loanTerms, firstPaymentDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Additional Notes</Label>
                  <Textarea 
                    placeholder="Any special terms or conditions..."
                    value={loanTerms.notes}
                    onChange={(e) => setLoanTerms({ ...loanTerms, notes: e.target.value })}
                  />
                </div>

                <Button className="w-full" onClick={handleBookLoan}>
                  <Landmark className="h-4 w-4 mr-2" />
                  Book Loan & Upload Repayment Profile
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pending Loan Bookings</h3>
              <div className="space-y-3">
                {disbursements.filter(d => d.riskLimitStatus === "Created" && d.loanBookingStatus === "Pending").map((deal) => (
                  <div key={deal.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{deal.client}</span>
                      <Badge variant="outline">{deal.id}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">{deal.amount}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      SAP Limit Created - Ready for Booking
                    </div>
                  </div>
                ))}
                {disbursements.filter(d => d.riskLimitStatus === "Created" && d.loanBookingStatus === "Pending").length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Landmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No pending loan bookings</p>
                    <p className="text-sm">Loans with SAP limits will appear here</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Repayment Profiles Tab */}
        <TabsContent value="repayment-profiles" className="space-y-6">
          <Card>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Repayment Profiles</h2>
                  <p className="text-sm text-muted-foreground">
                    View and manage uploaded repayment schedules
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Repayment Schedule</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Select Deal</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a deal" />
                          </SelectTrigger>
                          <SelectContent>
                            {disbursements.filter(d => d.loanBookingStatus === "Completed").map((deal) => (
                              <SelectItem key={deal.id} value={deal.id}>
                                {deal.id} - {deal.client}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Repayment Schedule File</Label>
                        <Input type="file" accept=".xlsx,.xls,.csv" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Accepted formats: Excel (.xlsx, .xls) or CSV
                        </p>
                      </div>
                      <Button className="w-full" onClick={() => {
                        toast({
                          title: "Schedule Uploaded",
                          description: "Repayment schedule has been uploaded and linked to the deal.",
                        });
                      }}>
                        Upload Schedule
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile ID</TableHead>
                  <TableHead>Deal ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Tenor</TableHead>
                  <TableHead>Repayment Type</TableHead>
                  <TableHead>First Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repaymentProfiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.id}</TableCell>
                    <TableCell>{profile.dealId}</TableCell>
                    <TableCell>{profile.client}</TableCell>
                    <TableCell className="font-semibold">{profile.principal}</TableCell>
                    <TableCell>{profile.interestRate}</TableCell>
                    <TableCell>{profile.tenor}</TableCell>
                    <TableCell>{profile.repaymentType}</TableCell>
                    <TableCell>{profile.firstPaymentDate}</TableCell>
                    <TableCell>{getStatusBadge(profile.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
