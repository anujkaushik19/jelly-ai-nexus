
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardHeader from "@/components/DashboardHeader";

interface Entity {
  name: string;
  value: string;
  confidence: number;
  page: number;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface PageData {
  pageNumber: number;
  entities: Entity[];
}

interface DocumentData {
  id: string;
  name: string;
  type: string;
  pages: number;
  totalEntities: number;
  pageData: PageData[];
}

// Mock document data
const mockDocument: DocumentData = {
  id: "doc-1",
  name: "Insurance_Policy_2023.pdf",
  type: "PDF",
  pages: 5,
  totalEntities: 23,
  pageData: [
    {
      pageNumber: 1,
      entities: [
        {
          name: "Policy Number",
          value: "POL-12345-ABC",
          confidence: 0.95,
          page: 1,
          position: { x: 120, y: 150, width: 100, height: 15 },
        },
        {
          name: "Effective Date",
          value: "2023-01-01",
          confidence: 0.92,
          page: 1,
          position: { x: 120, y: 180, width: 80, height: 15 },
        },
        {
          name: "Expiration Date",
          value: "2024-01-01",
          confidence: 0.93,
          page: 1,
          position: { x: 320, y: 180, width: 80, height: 15 },
        },
      ],
    },
    {
      pageNumber: 2,
      entities: [
        {
          name: "Premium",
          value: "$1,250.00",
          confidence: 0.96,
          page: 2,
          position: { x: 150, y: 120, width: 70, height: 15 },
        },
        {
          name: "Coverage Limit",
          value: "$500,000",
          confidence: 0.98,
          page: 2,
          position: { x: 150, y: 160, width: 70, height: 15 },
        },
      ],
    },
    {
      pageNumber: 3,
      entities: [
        {
          name: "Insured Name",
          value: "John Doe",
          confidence: 0.99,
          page: 3,
          position: { x: 120, y: 150, width: 100, height: 15 },
        },
        {
          name: "Property Address",
          value: "123 Main St, Anytown, USA",
          confidence: 0.89,
          page: 3,
          position: { x: 120, y: 180, width: 200, height: 15 },
        },
      ],
    },
    {
      pageNumber: 4,
      entities: [
        {
          name: "Agent Name",
          value: "Sarah Smith",
          confidence: 0.97,
          page: 4,
          position: { x: 120, y: 150, width: 100, height: 15 },
        },
        {
          name: "Agent Phone",
          value: "(555) 123-4567",
          confidence: 0.94,
          page: 4,
          position: { x: 120, y: 180, width: 120, height: 15 },
        },
      ],
    },
    {
      pageNumber: 5,
      entities: [
        {
          name: "Policyholder Signature",
          value: "[Signature]",
          confidence: 0.85,
          page: 5,
          position: { x: 120, y: 250, width: 100, height: 20 },
        },
        {
          name: "Date Signed",
          value: "2022-12-15",
          confidence: 0.91,
          page: 5,
          position: { x: 320, y: 250, width: 80, height: 15 },
        },
      ],
    },
  ],
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch the document data from your API
    setLoading(true);
    setTimeout(() => {
      setDocument(mockDocument);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <div>
        <DashboardHeader title="Loading Document" subtitle="Please wait..." />
        <div className="p-6 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!document) {
    return (
      <div>
        <DashboardHeader title="Document Not Found" subtitle="The requested document could not be found." />
        <div className="p-6">
          <Button asChild>
            <a href="/dashboard/training-results">Return to Training Results</a>
          </Button>
        </div>
      </div>
    );
  }
  
  const currentPageData = document.pageData.find(page => page.pageNumber === currentPage);
  const totalPages = document.pages;
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div>
      <DashboardHeader title={document.name} subtitle={`Document ID: ${document.id}`} />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Document Preview
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                      <span className="sr-only">Previous page</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      <span className="sr-only">Next page</span>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex justify-center">
                <div className="relative bg-gray-100 border border-gray-300 min-h-[500px] w-full max-w-[595px] shadow-sm">
                  {/* Placeholder for PDF content */}
                  <div className="p-8">
                    <p className="text-center text-gray-500 mt-40">
                      PDF Viewer would be integrated here <br />
                      Currently showing page {currentPage} of document
                    </p>
                    
                    {/* Highlight boxes for entities on this page */}
                    {currentPageData?.entities.map((entity, index) => (
                      <div
                        key={index}
                        className="absolute border-2 border-jelly-primary bg-jelly-primary/10"
                        style={{
                          left: `${entity.position.x}px`,
                          top: `${entity.position.y}px`,
                          width: `${entity.position.width}px`,
                          height: `${entity.position.height}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                  Extracted Entities
                </h2>
              </div>
              
              <div className="p-4">
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="current">Current Page</TabsTrigger>
                    <TabsTrigger value="all">All Pages</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="current" className="mt-0">
                    {currentPageData?.entities && currentPageData.entities.length > 0 ? (
                      <div className="space-y-4">
                        {currentPageData.entities.map((entity, index) => (
                          <div 
                            key={index}
                            className="p-3 border border-gray-200 rounded-md hover:border-jelly-primary/50 hover:bg-jelly-primary/5 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{entity.name}</h3>
                              <Badge variant="outline" className={entity.confidence > 0.9 ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}>
                                {Math.round(entity.confidence * 100)}%
                              </Badge>
                            </div>
                            <p className="text-lg break-words">{entity.value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No entities found on this page
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all" className="mt-0">
                    {document.pageData.map(page => (
                      <div key={page.pageNumber} className="mb-6">
                        <h3 className="font-medium text-gray-500 mb-2">Page {page.pageNumber}</h3>
                        <div className="space-y-3">
                          {page.entities.map((entity, index) => (
                            <div 
                              key={index}
                              className="p-3 border border-gray-200 rounded-md hover:border-jelly-primary/50 hover:bg-jelly-primary/5 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{entity.name}</h4>
                                <Badge variant="outline" className={entity.confidence > 0.9 ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}>
                                  {Math.round(entity.confidence * 100)}%
                                </Badge>
                              </div>
                              <p className="text-lg break-words">{entity.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <Button className="w-full bg-jelly-primary hover:bg-jelly-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export Extracted Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
