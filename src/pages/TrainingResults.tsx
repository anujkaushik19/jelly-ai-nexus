
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";

interface ProcessedDocument {
  id: string;
  name: string;
  type: string;
  pages: number;
  entitiesExtracted: number;
  definitiveValues: boolean;
  status: "processing" | "completed" | "failed";
  lastUpdated: string;
}

const TrainingResults = () => {
  const location = useLocation();
  const trainingId = location.state?.trainingId || "training-123456";
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Simulate live API polling
  useEffect(() => {
    // Initial documents
    const initialDocuments: ProcessedDocument[] = [
      {
        id: "doc-1",
        name: "Insurance_Policy_2023.pdf",
        type: "PDF",
        pages: 5,
        entitiesExtracted: 12,
        definitiveValues: true,
        status: "completed",
        lastUpdated: new Date().toISOString(),
      },
      {
        id: "doc-2",
        name: "Claim_Form_ABC123.pdf",
        type: "PDF",
        pages: 3,
        entitiesExtracted: 8,
        definitiveValues: true,
        status: "completed",
        lastUpdated: new Date().toISOString(),
      },
    ];
    
    setDocuments(initialDocuments);
    
    // Mock incoming documents during processing
    const mockDocumentNames = [
      "Policy_Renewal_XYZ456.pdf",
      "Binder_Contract_2023.pdf",
      "Endorsement_ABC123.pdf",
      "Claim_Report_DEF789.pdf",
      "Client_Application_Form.pdf",
    ];
    
    const mockDocumentTimer = setInterval(() => {
      // Randomly decide if we should add a new document or update an existing one
      const shouldAddNew = documents.length < 7 && Math.random() > 0.3;
      
      if (shouldAddNew) {
        // Add a new processing document
        const newDoc: ProcessedDocument = {
          id: `doc-${Date.now()}`,
          name: mockDocumentNames[Math.floor(Math.random() * mockDocumentNames.length)],
          type: "PDF",
          pages: Math.floor(Math.random() * 10) + 1,
          entitiesExtracted: 0,
          definitiveValues: false,
          status: "processing",
          lastUpdated: new Date().toISOString(),
        };
        
        setDocuments(prev => [...prev, newDoc]);
      } else if (documents.length > 0) {
        // Update a random existing document
        setDocuments(prev => {
          return prev.map(doc => {
            if (doc.status === "processing" && Math.random() > 0.5) {
              return {
                ...doc,
                status: "completed",
                entitiesExtracted: Math.floor(Math.random() * 15) + 5,
                definitiveValues: Math.random() > 0.3,
                lastUpdated: new Date().toISOString(),
              };
            }
            return doc;
          });
        });
      }
      
      setLoading(false);
    }, 3000);
    
    return () => clearInterval(mockDocumentTimer);
  }, []);

  const filteredDocuments = filter === "all" 
    ? documents 
    : documents.filter(doc => doc.status === filter);

  return (
    <div>
      <DashboardHeader 
        title="Training Results" 
        subtitle={`Training ID: ${trainingId}`} 
      />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="font-semibold">Processed Documents</h2>
              <Badge variant={loading ? "outline" : "secondary"} className="flex items-center gap-1">
                {loading ? (
                  <svg className="animate-spin h-3 w-3 mr-1" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : null}
                {loading ? "Processing" : "Complete"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export Results
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Pages</TableHead>
                  <TableHead className="text-center">Entities</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      {loading ? "Processing documents..." : "No documents found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell className="text-center">{doc.pages}</TableCell>
                      <TableCell className="text-center">
                        {doc.status === "processing" ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          doc.entitiesExtracted
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {doc.status === "completed" ? (
                          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
                            Completed
                          </Badge>
                        ) : doc.status === "failed" ? (
                          <Badge variant="destructive">
                            Failed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="animate-pulse bg-blue-50 text-blue-700">
                            Processing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(doc.lastUpdated).toLocaleTimeString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {doc.status === "completed" && (
                          <Button asChild variant="ghost" size="sm">
                            <Link to={`/dashboard/document/${doc.id}`}>
                              View
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingResults;
