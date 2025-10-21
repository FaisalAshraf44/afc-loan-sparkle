import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, Upload } from "lucide-react";

const STEPS = [
  { id: 1, title: "Company Information", description: "Basic company details" },
  { id: 2, title: "Contact Details", description: "Primary contact information" },
  { id: 3, title: "KYC Documents", description: "Upload required documents" },
  { id: 4, title: "Financial Information", description: "Financial details and statements" },
  { id: 5, title: "Review & Submit", description: "Review all information" }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Enter company name" />
            </div>
            <div>
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input id="registrationNumber" placeholder="Enter registration number" />
            </div>
            <div>
              <Label htmlFor="incorporationDate">Date of Incorporation</Label>
              <Input id="incorporationDate" type="date" />
            </div>
            <div>
              <Label htmlFor="industry">Industry Sector</Label>
              <Input id="industry" placeholder="e.g., Technology, Healthcare" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="contactName">Primary Contact Name</Label>
              <Input id="contactName" placeholder="Enter contact name" />
            </div>
            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input id="contactEmail" type="email" placeholder="contact@company.com" />
            </div>
            <div>
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input id="contactPhone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div>
              <Label htmlFor="contactAddress">Business Address</Label>
              <Input id="contactAddress" placeholder="Enter business address" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Certificate of Incorporation</p>
              <p className="text-xs text-muted-foreground">
                Click to upload or drag and drop
              </p>
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Tax Identification Number</p>
              <p className="text-xs text-muted-foreground">
                Click to upload or drag and drop
              </p>
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Director Identification</p>
              <p className="text-xs text-muted-foreground">
                Click to upload or drag and drop
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="annualRevenue">Annual Revenue</Label>
              <Input id="annualRevenue" type="number" placeholder="Enter annual revenue" />
            </div>
            <div>
              <Label htmlFor="employeeCount">Number of Employees</Label>
              <Input id="employeeCount" type="number" placeholder="Enter employee count" />
            </div>
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Financial Statements</p>
              <p className="text-xs text-muted-foreground">
                Upload last 2 years of audited statements
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Your Information</CardTitle>
                <CardDescription>
                  Please review all the information before submitting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <p className="text-sm text-muted-foreground">All company details provided</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Contact Details</h4>
                  <p className="text-sm text-muted-foreground">Primary contact information added</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">KYC Documents</h4>
                  <p className="text-sm text-muted-foreground">3 documents uploaded</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Financial Information</h4>
                  <p className="text-sm text-muted-foreground">Financial details completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
          Client Onboarding
        </h1>
        <p className="text-muted-foreground">
          Complete the KYC and client setup process
        </p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep > step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : currentStep === step.id
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-12 lg:w-24 mx-2 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progress} className="flex-1" />
          <span className="text-sm font-medium text-muted-foreground">
            {currentStep}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === STEPS.length ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
