import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

const mockDocument: DocumentData = {
  id: "doc-1",
  name: "Insurance_Policy_2023.pdf",
  type: "PDF",
  pages: 5,
  totalEntities: 23,
  pageData: [],
};

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const definitiveValues = location.state.definitiveValues;
  const definitiveArray = Object.entries(definitiveValues).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  const pdf_url = location.state.pdf_url;

  useEffect(() => {
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

  const totalPages = document.pages;

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <DashboardHeader title={document.name} subtitle={`Document ID: ${document.id}`} />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* PDF Viewer */}
          <div className="lg:col-span-3 ">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200  ">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center ">
                <h2 className="font-semibold flex items-center">
                  <svg className="mr-2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Document Preview
                </h2>
                <div className="flex items-center gap-3 ">
                  <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                  </span>
                  <div className="flex ">
                    <Button variant="ghost" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-center ">
                <div className="relative bg-gray-100 border border-gray-300 w-[820px] h-[842px] shadow-sm rounded-md overflow-hidden ">
                  <iframe
                    src={`${pdf_url}#page=${currentPage}&zoom=100`}
                    title="PDF Viewer"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Entity Tabs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold flex items-center">
                  <svg className="mr-2" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  Extracted Entities
                </h2>
              </div>

              <div className="p-4">
                <Tabs defaultValue="current" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="current" className="w-[35rem]">Definitive Values</TabsTrigger>
                  </TabsList>

                  <TabsContent value="current" className="mt-0">
                    {definitiveArray.length > 0 ? (
                      <div className="space-y-4">
                        {definitiveArray.map((item, index) => (
                          <div
                            key={index}
                            className="p-3 border border-gray-200 rounded-md hover:border-jelly-primary/50 hover:bg-jelly-primary/5 transition-colors"
                          >
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <p className="text-lg break-words">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">No definitive values found</div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              <div className="p-4 border-t border-gray-200">
                <Button className="w-full bg-jelly-primary hover:bg-jelly-accent">
                  <svg className="mr-2" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
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
