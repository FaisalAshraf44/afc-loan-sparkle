import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { 
  DollarSign, 
  Download, 
  CheckCircle, 
  Clock, 
  Send, 
  FileText, 
  Building2, 
  CreditCard,
  ArrowRight,
  Mail,
  Printer,
  Eye,
  BookOpen,
  Banknote
} from "lucide-react";

interface Disbursement {
  id: string;
  client: string;
  projectName: string;
  amount: string;
  currency: string;
  beneficiaryBank: string;
  beneficiaryAccount: string;
  swiftCode: string;
  scheduleDate: string;
  status: "pending" | "approved" | "disbursed" | "booked";
  treasuryStatus: string;
  telexSent: boolean;
  telexDate?: string;
  loanBooked: boolean;
  bookingRef?: string;
}

const initialDisbursements: Disbursement[] = [
  {
    id: "DISB-001",
    client: "Tech Innovations Ltd",
    projectName: "Project Alpha",
    amount: "2,500,000",
    currency: "USD",
    beneficiaryBank: "First National Bank",
    beneficiaryAccount: "****1234",
    swiftCode: "FNBKUS33",
    scheduleDate: "2024-01-20",
    status: "approved",
    treasuryStatus: "Ready for Disbursement",
    telexSent: false,
    loanBooked: false,
  },
  {
    id: "DISB-002",
    client: "Green Energy Corp",
    projectName: "Project Beta",
    amount: "1,800,000",
    currency: "USD",
    beneficiaryBank: "Continental Bank",
    beneficiaryAccount: "****5678",
    swiftCode: "CNBKUS44",
    scheduleDate: "2024-01-22",
    status: "pending",
    treasuryStatus: "Pending EXCO Approval",
    telexSent: false,
    loanBooked: false,
  },
  {
    id: "DISB-003",
    client: "Retail Ventures LLC",
    projectName: "Project Gamma",
    amount: "950,000",
    currency: "USD",
    beneficiaryBank: "Global Trade Bank",
    beneficiaryAccount: "****9012",
    swiftCode: "GTBKUS55",
    scheduleDate: "2024-01-18",
    status: "booked",
    treasuryStatus: "Loan Booked",
    telexSent: true,
    telexDate: "2024-01-18",
    loanBooked: true,
    bookingRef: "LB-2024-0156",
  },
];

const telexHistory = [
  { id: "TLX-001", disbursementId: "DISB-003", client: "Retail Ventures LLC", sentDate: "2024-01-18", amount: "$950,000", recipients: "Deal Team, Transaction Team", status: "delivered" },
  { id: "TLX-002", disbursementId: "DISB-098", client: "Industrial Holdings", sentDate: "2024-01-15", amount: "$3,200,000", recipients: "Deal Team, Risk Management", status: "delivered" },
  { id: "TLX-003", disbursementId: "DISB-097", client: "Maritime Solutions", sentDate: "2024-01-12", amount: "$1,500,000", recipients: "Deal Team, Legal", status: "delivered" },
];

export default function Treasury() {
  const [disbursements, setDisbursements] = useState<Disbursement[]>(initialDisbursements);
  const [selectedDisbursement, setSelectedDisbursement] = useState<Disbursement | null>(null);
  const [showDisbursementDialog, setShowDisbursementDialog] = useState(false);
  const [showTelexDialog, setShowTelexDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  
  // Disbursement form state
  const [disbursementConfirmations, setDisbursementConfirmations] = useState({
    verifiedDetails: false,
    fundsAvailable: false,
    complianceCleared: false,
  });

  // Telex form state
  const [telexRecipients, setTelexRecipients] = useState<string[]>(["deal-team"]);
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Booking form state
  const [bookingDetails, setBookingDetails] = useState({
    loanType: "",
    interestRate: "",
    tenor: "",
    repaymentFrequency: "",
    firstPaymentDate: "",
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      approved: "bg-green-500/20 text-green-400 border-green-500/30",
      disbursed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      booked: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    };
    
    const labels: Record<string, string> = {
      pending: "Pending",
      approved: "Approved",
      disbursed: "Disbursed",
      booked: "Loan Booked",
    };
    
    return <Badge className={variants[status] || "bg-muted text-muted-foreground"}>{labels[status] || status}</Badge>;
  };

  const handleDisburseFunds = () => {
    if (!selectedDisbursement) return;
    
    if (!disbursementConfirmations.verifiedDetails || !disbursementConfirmations.fundsAvailable || !disbursementConfirmations.complianceCleared) {
      toast.error("Please confirm all verification checks before disbursing");
      return;
    }

    setDisbursements(prev => prev.map(d => 
      d.id === selectedDisbursement.id 
        ? { ...d, status: "disbursed" as const, treasuryStatus: "Funds Disbursed" }
        : d
    ));

    toast.success("Funds Disbursed Successfully", {
      description: `$${selectedDisbursement.amount} ${selectedDisbursement.currency} transferred to ${selectedDisbursement.client}`
    });

    setShowDisbursementDialog(false);
    setDisbursementConfirmations({ verifiedDetails: false, fundsAvailable: false, complianceCleared: false });
  };

  const handleSendTelex = () => {
    if (!selectedDisbursement) return;

    if (telexRecipients.length === 0) {
      toast.error("Please select at least one recipient");
      return;
    }

    setDisbursements(prev => prev.map(d => 
      d.id === selectedDisbursement.id 
        ? { ...d, telexSent: true, telexDate: new Date().toISOString().split('T')[0] }
        : d
    ));

    const recipientNames = telexRecipients.map(r => {
      const names: Record<string, string> = {
        "deal-team": "Deal Team",
        "transaction-team": "Transaction Team",
        "risk-management": "Risk Management",
        "legal": "Legal Counsel",
      };
      return names[r] || r;
    }).join(", ");

    toast.success("Telex Sent Successfully", {
      description: `Transfer evidence sent to: ${recipientNames}`
    });

    setShowTelexDialog(false);
    setTelexRecipients(["deal-team"]);
    setAdditionalNotes("");
  };

  const handleBookLoan = () => {
    if (!selectedDisbursement) return;

    if (!bookingDetails.loanType || !bookingDetails.interestRate || !bookingDetails.tenor) {
      toast.error("Please fill in all required booking details");
      return;
    }

    const bookingRef = `LB-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;

    setDisbursements(prev => prev.map(d => 
      d.id === selectedDisbursement.id 
        ? { 
            ...d, 
            status: "booked" as const, 
            treasuryStatus: "Loan Booked",
            loanBooked: true,
            bookingRef 
          }
        : d
    ));

    toast.success("Loan Booked Successfully", {
      description: `Booking Reference: ${bookingRef} - Loan terms recorded in the system`
    });

    setShowBookingDialog(false);
    setBookingDetails({ loanType: "", interestRate: "", tenor: "", repaymentFrequency: "", firstPaymentDate: "" });
  };

  const pendingCount = disbursements.filter(d => d.status === "pending").length;
  const approvedCount = disbursements.filter(d => d.status === "approved").length;
  const disbursedCount = disbursements.filter(d => d.status === "disbursed" || d.status === "booked").length;

  const totalPending = disbursements
    .filter(d => d.status === "pending")
    .reduce((sum, d) => sum + parseFloat(d.amount.replace(/,/g, '')), 0);
  
  const totalApproved = disbursements
    .filter(d => d.status === "approved")
    .reduce((sum, d) => sum + parseFloat(d.amount.replace(/,/g, '')), 0);
  
  const totalDisbursed = disbursements
    .filter(d => d.status === "disbursed" || d.status === "booked")
    .reduce((sum, d) => sum + parseFloat(d.amount.replace(/,/g, '')), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Treasury Execution</h1>
        <p className="text-muted-foreground mt-1">Settlements & Operations - Disbursement and Loan Booking</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold">${(totalPending / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">{pendingCount} disbursement(s)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready to Disburse</p>
                <p className="text-2xl font-bold">${(totalApproved / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">{approvedCount} disbursement(s)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Banknote className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disbursed This Month</p>
                <p className="text-2xl font-bold">${(totalDisbursed / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">{disbursedCount} completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telex Sent</p>
                <p className="text-2xl font-bold">{telexHistory.length}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="disbursements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="disbursements">
            <DollarSign className="h-4 w-4 mr-2" />
            Disbursements
          </TabsTrigger>
          <TabsTrigger value="telex">
            <Mail className="h-4 w-4 mr-2" />
            Telex History
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <BookOpen className="h-4 w-4 mr-2" />
            Loan Bookings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disbursements" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Disbursement Queue</CardTitle>
                  <CardDescription>Process client disbursements and book loans</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Client / Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Beneficiary Bank</TableHead>
                    <TableHead>Schedule Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Telex</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disbursements.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.client}</p>
                          <p className="text-xs text-muted-foreground">{item.projectName}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">${item.amount} {item.currency}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{item.beneficiaryBank}</p>
                          <p className="text-xs text-muted-foreground font-mono">{item.swiftCode}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.scheduleDate}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.telexSent ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Sent
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {item.status === "approved" && (
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedDisbursement(item);
                                setShowDisbursementDialog(true);
                              }}
                            >
                              <Banknote className="h-4 w-4 mr-1" />
                              Disburse
                            </Button>
                          )}
                          {item.status === "disbursed" && !item.telexSent && (
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedDisbursement(item);
                                setShowTelexDialog(true);
                              }}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Telex
                            </Button>
                          )}
                          {item.status === "disbursed" && item.telexSent && !item.loanBooked && (
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedDisbursement(item);
                                setShowBookingDialog(true);
                              }}
                            >
                              <BookOpen className="h-4 w-4 mr-1" />
                              Book Loan
                            </Button>
                          )}
                          {item.status === "booked" && (
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telex" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Telex History</CardTitle>
                  <CardDescription>Transfer evidence communications sent to deal teams</CardDescription>
                </div>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Telex ID</TableHead>
                    <TableHead>Disbursement</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {telexHistory.map((telex) => (
                    <TableRow key={telex.id}>
                      <TableCell className="font-mono text-sm">{telex.id}</TableCell>
                      <TableCell className="font-mono text-sm">{telex.disbursementId}</TableCell>
                      <TableCell>{telex.client}</TableCell>
                      <TableCell className="font-semibold">{telex.amount}</TableCell>
                      <TableCell className="text-sm">{telex.recipients}</TableCell>
                      <TableCell>{telex.sentDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Delivered
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booked Loans</CardTitle>
              <CardDescription>Loans recorded in the system after disbursement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking Ref</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Disbursement Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disbursements.filter(d => d.loanBooked).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm font-semibold">{item.bookingRef}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{item.projectName}</TableCell>
                      <TableCell className="font-semibold">${item.amount} {item.currency}</TableCell>
                      <TableCell>{item.telexDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Disbursement Dialog */}
      <Dialog open={showDisbursementDialog} onOpenChange={setShowDisbursementDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Banknote className="h-5 w-5" />
              Disburse Funds
            </DialogTitle>
            <DialogDescription>
              Confirm disbursement to {selectedDisbursement?.client}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDisbursement && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold">${selectedDisbursement.amount} {selectedDisbursement.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Beneficiary:</span>
                    <span>{selectedDisbursement.beneficiaryBank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account:</span>
                    <span className="font-mono">{selectedDisbursement.beneficiaryAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SWIFT:</span>
                    <span className="font-mono">{selectedDisbursement.swiftCode}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Label className="font-semibold">Pre-Disbursement Checklist</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified" 
                      checked={disbursementConfirmations.verifiedDetails}
                      onCheckedChange={(checked) => setDisbursementConfirmations(prev => ({ ...prev, verifiedDetails: !!checked }))}
                    />
                    <label htmlFor="verified" className="text-sm">I have verified all beneficiary details are correct</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="funds" 
                      checked={disbursementConfirmations.fundsAvailable}
                      onCheckedChange={(checked) => setDisbursementConfirmations(prev => ({ ...prev, fundsAvailable: !!checked }))}
                    />
                    <label htmlFor="funds" className="text-sm">Funds are available and allocated for this disbursement</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="compliance" 
                      checked={disbursementConfirmations.complianceCleared}
                      onCheckedChange={(checked) => setDisbursementConfirmations(prev => ({ ...prev, complianceCleared: !!checked }))}
                    />
                    <label htmlFor="compliance" className="text-sm">All compliance checks have been cleared</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDisbursementDialog(false)}>Cancel</Button>
            <Button onClick={handleDisburseFunds}>
              <Banknote className="h-4 w-4 mr-2" />
              Confirm Disbursement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Telex Dialog */}
      <Dialog open={showTelexDialog} onOpenChange={setShowTelexDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Transfer Telex
            </DialogTitle>
            <DialogDescription>
              Send telex evidencing transfer to the deal team
            </DialogDescription>
          </DialogHeader>
          
          {selectedDisbursement && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Disbursement:</span>
                    <span className="font-mono">{selectedDisbursement.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client:</span>
                    <span>{selectedDisbursement.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold">${selectedDisbursement.amount} {selectedDisbursement.currency}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Label className="font-semibold">Recipients *</Label>
                <div className="space-y-2">
                  {[
                    { id: "deal-team", label: "Deal Team" },
                    { id: "transaction-team", label: "Transaction Team" },
                    { id: "risk-management", label: "Risk Management" },
                    { id: "legal", label: "Legal Counsel" },
                  ].map((recipient) => (
                    <div key={recipient.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={recipient.id} 
                        checked={telexRecipients.includes(recipient.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTelexRecipients(prev => [...prev, recipient.id]);
                          } else {
                            setTelexRecipients(prev => prev.filter(r => r !== recipient.id));
                          }
                        }}
                      />
                      <label htmlFor={recipient.id} className="text-sm">{recipient.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea 
                  placeholder="Add any additional notes to include in the telex..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTelexDialog(false)}>Cancel</Button>
            <Button onClick={handleSendTelex}>
              <Send className="h-4 w-4 mr-2" />
              Send Telex
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Loan Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Book Loan
            </DialogTitle>
            <DialogDescription>
              Record loan terms in the system for {selectedDisbursement?.client}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDisbursement && (
            <div className="space-y-4">
              <Card className="bg-muted/50">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Principal:</span>
                    <span className="font-bold">${selectedDisbursement.amount} {selectedDisbursement.currency}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Loan Type *</Label>
                  <Select value={bookingDetails.loanType} onValueChange={(v) => setBookingDetails(prev => ({ ...prev, loanType: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term">Term Loan</SelectItem>
                      <SelectItem value="revolving">Revolving Facility</SelectItem>
                      <SelectItem value="bridge">Bridge Loan</SelectItem>
                      <SelectItem value="project">Project Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Interest Rate (%) *</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    placeholder="e.g., 8.50"
                    value={bookingDetails.interestRate}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, interestRate: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tenor (months) *</Label>
                  <Input 
                    type="number"
                    placeholder="e.g., 60"
                    value={bookingDetails.tenor}
                    onChange={(e) => setBookingDetails(prev => ({ ...prev, tenor: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Repayment Frequency</Label>
                  <Select value={bookingDetails.repaymentFrequency} onValueChange={(v) => setBookingDetails(prev => ({ ...prev, repaymentFrequency: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="bullet">Bullet Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>First Payment Date</Label>
                <Input 
                  type="date"
                  value={bookingDetails.firstPaymentDate}
                  onChange={(e) => setBookingDetails(prev => ({ ...prev, firstPaymentDate: e.target.value }))}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>Cancel</Button>
            <Button onClick={handleBookLoan}>
              <BookOpen className="h-4 w-4 mr-2" />
              Book Loan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
