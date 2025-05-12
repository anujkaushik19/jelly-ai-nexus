
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import DashboardHeader from "@/components/DashboardHeader";

interface EntitySet {
  id: string;
  name: string;
  entities: string[];
}

// Mock data - would be replaced by Firebase fetch in real implementation
const mockEntitySets: EntitySet[] = [
  {
    id: "1",
    name: "Insurance Policy Details",
    entities: ["Policy Number", "Effective Date", "Expiration Date", "Premium", "Coverage Limit"],
  },
  {
    id: "2",
    name: "Client Information",
    entities: ["Full Name", "Email", "Phone", "Address", "Date of Birth"],
  },
  {
    id: "3",
    name: "Claim Details",
    entities: ["Claim Number", "Date of Loss", "Type of Loss", "Amount Claimed", "Status"],
  },
];

const NewTraining = () => {
  const [formData, setFormData] = useState({
    domainName: "",
    awsAccessKey: "",
    awsSecret: "",
    bucketName: "",
    region: "",
    entitySetId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Training Initiated",
        description: "Your training request has been submitted successfully.",
      });
      
      // Navigate to training results page
      navigate("/dashboard/training-results", { 
        state: { trainingId: `train-${Date.now()}` } 
      });
    }, 2000);
  };

  return (
    <div>
      <DashboardHeader title="New Training" subtitle="Configure and start a new document training" />
      
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Training Configuration</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="domainName">Domain Name</Label>
                    <Input
                      id="domainName"
                      name="domainName"
                      placeholder="e.g., insurance-claims"
                      value={formData.domainName}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      A unique identifier for this training domain
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="entitySet">Entity Set</Label>
                    <Select 
                      value={formData.entitySetId} 
                      onValueChange={(value) => handleSelectChange("entitySetId", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity set" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEntitySets.map(set => (
                          <SelectItem key={set.id} value={set.id}>
                            {set.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      The set of entities to extract from documents
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-4">AWS Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="awsAccessKey">AWS Access Key</Label>
                      <Input
                        id="awsAccessKey"
                        name="awsAccessKey"
                        placeholder="AWS Access Key"
                        value={formData.awsAccessKey}
                        onChange={handleChange}
                        type="password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="awsSecret">AWS Secret</Label>
                      <Input
                        id="awsSecret"
                        name="awsSecret"
                        placeholder="AWS Secret"
                        value={formData.awsSecret}
                        onChange={handleChange}
                        type="password"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bucketName">Bucket Name</Label>
                      <Input
                        id="bucketName"
                        name="bucketName"
                        placeholder="e.g., my-document-bucket"
                        value={formData.bucketName}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">AWS Region</Label>
                      <Select 
                        value={formData.region} 
                        onValueChange={(value) => handleSelectChange("region", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                          <SelectItem value="us-east-2">US East (Ohio)</SelectItem>
                          <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                          <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                          <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                          <SelectItem value="eu-central-1">EU Central (Frankfurt)</SelectItem>
                          <SelectItem value="ap-south-1">Asia Pacific (Mumbai)</SelectItem>
                          <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex justify-end">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard/entity-sets")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-jelly-primary hover:bg-jelly-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Start Training"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-6 max-w-2xl mx-auto bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            About Document Training
          </h3>
          <p className="text-sm text-blue-700">
            Training will process documents from your AWS S3 bucket and extract entities based on the selected entity set. 
            Make sure your AWS credentials have the necessary permissions to access the specified bucket.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewTraining;
