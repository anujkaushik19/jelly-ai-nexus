
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Input } from "@/components/ui/input";

interface TrainingSession {
  id: string;
  domain: string;
  entitySet: string;
  documentsProcessed: number;
  entitiesExtracted: number;
  status: "completed" | "failed" | "canceled";
  date: string;
}

// Mock data
const mockTrainingSessions: TrainingSession[] = [
  {
    id: "train-001",
    domain: "Insurance Claims",
    entitySet: "Claim Details",
    documentsProcessed: 45,
    entitiesExtracted: 538,
    status: "completed",
    date: "2023-04-15T14:30:00Z",
  },
  {
    id: "train-002",
    domain: "Policy Renewals",
    entitySet: "Insurance Policy Details",
    documentsProcessed: 72,
    entitiesExtracted: 864,
    status: "completed",
    date: "2023-05-22T09:15:00Z",
  },
  {
    id: "train-003",
    domain: "Client Onboarding",
    entitySet: "Client Information",
    documentsProcessed: 28,
    entitiesExtracted: 336,
    status: "completed",
    date: "2023-06-10T11:45:00Z",
  },
  {
    id: "train-004",
    domain: "Claim Processing",
    entitySet: "Claim Details",
    documentsProcessed: 0,
    entitiesExtracted: 0,
    status: "failed",
    date: "2023-07-03T16:20:00Z",
  },
  {
    id: "train-005",
    domain: "Policy Endorsements",
    entitySet: "Insurance Policy Details",
    documentsProcessed: 15,
    entitiesExtracted: 180,
    status: "completed",
    date: "2023-08-18T13:10:00Z",
  },
  {
    id: "train-006",
    domain: "Home Insurance",
    entitySet: "Property Details",
    documentsProcessed: 0,
    entitiesExtracted: 0,
    status: "canceled",
    date: "2023-09-05T10:30:00Z",
  },
];

const PastTrainings = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sessions, setSessions] = useState<TrainingSession[]>(mockTrainingSessions);
  
  // Get unique domains for the filter dropdown
  const domains = ["all", ...new Set(sessions.map(session => session.domain))];
  
  // Filter sessions based on selected domain and search query
  const filteredSessions = sessions
    .filter(session => selectedDomain === "all" || session.domain === selectedDomain)
    .filter(session => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        session.domain.toLowerCase().includes(query) ||
        session.entitySet.toLowerCase().includes(query) ||
        session.id.toLowerCase().includes(query)
      );
    });
  
  return (
    <div>
      <DashboardHeader title="Past Trainings" subtitle="View and access your previous document training sessions" />
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.filter(d => d !== "all").map(domain => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative flex-1 max-w-sm">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <Input
                  type="text"
                  placeholder="Search trainings..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Button asChild className="bg-jelly-primary hover:bg-jelly-accent">
              <Link to="/dashboard/new-training">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Training
              </Link>
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">No training sessions found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <Button variant="outline" onClick={() => { setSelectedDomain("all"); setSearchQuery(""); }}>
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Training ID</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Entity Set</TableHead>
                    <TableHead className="text-center">Documents</TableHead>
                    <TableHead className="text-center">Entities</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map(session => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.id}</TableCell>
                      <TableCell>{session.domain}</TableCell>
                      <TableCell>{session.entitySet}</TableCell>
                      <TableCell className="text-center">{session.documentsProcessed}</TableCell>
                      <TableCell className="text-center">{session.entitiesExtracted}</TableCell>
                      <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-center">
                        {session.status === "completed" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Completed
                          </Badge>
                        ) : session.status === "failed" ? (
                          <Badge variant="outline" className="bg-red-50 text-red-700">
                            Failed
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700">
                            Canceled
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {session.status === "completed" && (
                          <Button asChild variant="ghost" size="sm">
                            <Link to={`/dashboard/training/${session.id}`}>
                              View Results
                            </Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastTrainings;
