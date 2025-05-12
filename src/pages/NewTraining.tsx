
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Upload, FileText, Shield, Database, Server, CheckCircle, XCircle, AlertCircle } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("config");
  const [formData, setFormData] = useState({
    domainName: "",
    awsAccessKey: "",
    awsSecret: "",
    bucketName: "",
    region: "",
    entitySetId: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigSubmitted, setIsConfigSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
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
      setIsConfigSubmitted(true);
      setActiveTab("upload");
      
      toast({
        title: "Configuration Saved",
        description: "Your training configuration has been saved successfully.",
      });
    }, 1500);
  };

  const handleTrainingSubmit = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No Documents",
        description: "Please upload at least one document to process.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call for document processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Training Initiated",
        description: `Processing ${uploadedFiles.length} document${uploadedFiles.length > 1 ? 's' : ''}.`,
      });
      
      // Navigate to training results page
      navigate("/dashboard/training-results", { 
        state: { 
          trainingId: `train-${Date.now()}`,
          files: uploadedFiles.map(file => file.name)
        } 
      });
    }, 2000);
  };

  const getSelectedEntitySetName = () => {
    const set = mockEntitySets.find(set => set.id === formData.entitySetId);
    return set ? set.name : "Not selected";
  };

  return (
    <div className="min-h-full bg-gray-50">
      <DashboardHeader title="New Training" subtitle="Configure and start a new document training" />
      
      <div className="p-6">
        <Card className="max-w-4xl mx-auto shadow-sm">
          <CardHeader className="bg-jelly-primary text-white">
            <CardTitle>Document Training Wizard</CardTitle>
            <CardDescription className="text-gray-100">
              Follow the steps below to set up and start your document training
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="config" disabled={isLoading} className="data-[state=active]:bg-jelly-primary/10 data-[state=active]:text-jelly-primary">
                1. Configure Connection
              </TabsTrigger>
              <TabsTrigger value="upload" disabled={!isConfigSubmitted || isLoading} className="data-[state=active]:bg-jelly-primary/10 data-[state=active]:text-jelly-primary">
                2. Upload Documents
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="config">
              <CardContent className="pt-6">
                <form onSubmit={handleConfigSubmit}>
                  <div className="space-y-6">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                      <div className="text-blue-600 mt-0.5">
                        <Shield size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Configuration Settings</h4>
                        <p className="text-sm text-blue-700">
                          Enter your domain details and AWS credentials to connect to your document storage.
                          All credentials are securely encrypted.
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="domainName" className="font-medium">Domain Name</Label>
                        <Input
                          id="domainName"
                          name="domainName"
                          placeholder="e.g., insurance-claims"
                          value={formData.domainName}
                          onChange={handleChange}
                          className="border-gray-300"
                        />
                        <p className="text-xs text-gray-500">
                          A unique identifier for this training domain
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="entitySet" className="font-medium">Entity Set</Label>
                        <Select 
                          value={formData.entitySetId} 
                          onValueChange={(value) => handleSelectChange("entitySetId", value)}
                        >
                          <SelectTrigger className="border-gray-300">
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
                      <div className="flex items-center gap-2 mb-4">
                        <Database size={18} className="text-jelly-primary" />
                        <h3 className="font-medium">AWS Configuration</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="awsAccessKey" className="font-medium">AWS Access Key</Label>
                          <Input
                            id="awsAccessKey"
                            name="awsAccessKey"
                            placeholder="AWS Access Key"
                            value={formData.awsAccessKey}
                            onChange={handleChange}
                            type="password"
                            className="border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="awsSecret" className="font-medium">AWS Secret</Label>
                          <Input
                            id="awsSecret"
                            name="awsSecret"
                            placeholder="AWS Secret"
                            value={formData.awsSecret}
                            onChange={handleChange}
                            type="password"
                            className="border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bucketName" className="font-medium">Bucket Name</Label>
                          <Input
                            id="bucketName"
                            name="bucketName"
                            placeholder="e.g., my-document-bucket"
                            value={formData.bucketName}
                            onChange={handleChange}
                            className="border-gray-300"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="region" className="font-medium">AWS Region</Label>
                          <Select 
                            value={formData.region} 
                            onValueChange={(value) => handleSelectChange("region", value)}
                          >
                            <SelectTrigger className="border-gray-300">
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
                  </div>
                
                  <CardFooter className="flex justify-end pt-6 px-0 mt-6 border-t">
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
                        {isLoading ? "Saving Configuration..." : "Save & Continue"}
                      </Button>
                    </div>
                  </CardFooter>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="upload">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3">
                    <div className="text-green-600 mt-0.5">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800 mb-1">Configuration Completed</h4>
                      <p className="text-sm text-green-700">
                        Your training configuration has been saved. Now upload documents to process.
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-green-800">
                        <div>
                          <span className="font-medium">Domain:</span> {formData.domainName}
                        </div>
                        <div>
                          <span className="font-medium">Entity Set:</span> {getSelectedEntitySetName()}
                        </div>
                        <div>
                          <span className="font-medium">Bucket:</span> {formData.bucketName}
                        </div>
                        <div>
                          <span className="font-medium">Region:</span> {formData.region}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-jelly-primary/10 flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-jelly-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                    <p className="text-gray-500 mb-4 max-w-md mx-auto">
                      Upload PDF documents that you want to process with the selected entity set.
                      You can upload multiple documents at once.
                    </p>
                    <div className="flex justify-center">
                      <Label 
                        htmlFor="document-upload" 
                        className="cursor-pointer bg-jelly-primary text-white py-2 px-4 rounded-md hover:bg-jelly-accent transition-colors flex items-center gap-2"
                      >
                        <FileText size={18} />
                        Browse Files
                      </Label>
                      <Input
                        id="document-upload"
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf"
                        multiple
                        className="hidden"
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Supported formats: PDF
                    </p>
                  </div>
                  
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Server size={18} className="text-jelly-primary" />
                        Selected Documents ({uploadedFiles.length})
                      </h4>
                      <div className="border border-gray-200 rounded-md overflow-hidden">
                        <div className="max-h-[250px] overflow-y-auto">
                          <table className="w-full">
                            <thead className="bg-gray-50 text-left">
                              <tr>
                                <th className="px-4 py-3 text-sm font-medium text-gray-500">File Name</th>
                                <th className="px-4 py-3 text-sm font-medium text-gray-500">Size</th>
                                <th className="px-4 py-3 text-sm font-medium text-gray-500">Type</th>
                                <th className="px-4 py-3 text-sm font-medium text-gray-500 w-10"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {uploadedFiles.map((file, index) => (
                                <tr key={index} className="bg-white">
                                  <td className="px-4 py-2 text-sm text-gray-900 flex items-center gap-2">
                                    <FileText size={16} className="text-jelly-primary" />
                                    {file.name}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-500">
                                    {file.type || "application/pdf"}
                                  </td>
                                  <td className="px-4 py-2 text-sm">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => removeFile(index)}
                                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <XCircle size={16} />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-3">
                    <div className="text-yellow-600 mt-0.5">
                      <AlertCircle size={20} />
                    </div>
                    <div className="text-sm text-yellow-700">
                      <p>The document processing time depends on the number and size of the documents. 
                      Once submitted, you'll be able to monitor the progress on the results page.</p>
                    </div>
                  </div>
                </div>
              
                <CardFooter className="flex justify-end pt-6 px-0 mt-6 border-t">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("config")}
                    >
                      Back to Configuration
                    </Button>
                    <Button 
                      onClick={handleTrainingSubmit} 
                      className="bg-jelly-primary hover:bg-jelly-accent"
                      disabled={isLoading || uploadedFiles.length === 0}
                    >
                      {isLoading ? "Processing..." : "Start Training"}
                    </Button>
                  </div>
                </CardFooter>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default NewTraining;
