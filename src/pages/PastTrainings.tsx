import { useEffect, useState } from "react";
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
  status: "completed" | "failed" | "canceled";
  definitiveValues?: Record<string, string>;
  fileName?: string;
  pdf_url?: string; // Added pdf_url
}

const PastTrainings = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletedFiles = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.250:8080/bucket/jellyfish-20-files-2025/documents/with-definitive-values",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) return;

      const updatedSessions: TrainingSession[] = data.map((doc: any) => ({
        id: doc.file_name || "Unknown",
        domain: doc.domain || "Unknown",
        status:
          doc.processing_status === "completed" ||
          doc.processing_status === "failed" ||
          doc.processing_status === "canceled"
            ? doc.processing_status
            : "completed",
        definitiveValues: doc.definitive_values,
        fileName: doc.file_name,
        pdf_url: doc.pdf_url, // Include pdf_url
      }));

      setSessions(updatedSessions);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedFiles();
  }, []);

  const domains = ["all", ...new Set(sessions.map((session) => session.domain))];

  const filteredSessions = sessions
    .filter((session) => selectedDomain === "all" || session.domain === selectedDomain)
    .filter((session) => {
      const query = searchQuery.toLowerCase();
      return (
        session.domain.toLowerCase().includes(query) ||
        session.id.toLowerCase().includes(query)
      );
    });

  return (
    <div>
      <DashboardHeader
        title="Past Trainings"
        subtitle="View and access your previous document training sessions"
      />
      <div className="p-6">
        <div className="text-sm text-gray-600 mb-4 font-medium">
          Displaying domain-wise filtering
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.filter((d) => d !== "all").map((domain) => (
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button asChild className="bg-jelly-primary hover:bg-jelly-accent">
              <Link to="/dashboard/new-training">
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
                  className="mr-2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Training
              </Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : filteredSessions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">No training sessions found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedDomain("all");
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.id}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            session.status === "completed"
                              ? "bg-green-50 text-green-700"
                              : session.status === "failed"
                              ? "bg-red-50 text-red-700"
                              : "bg-gray-50 text-gray-700"
                          }
                        >
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{session.domain}</TableCell>
                      <TableCell className="text-right">
                        {session.status === "completed" && (
                          <Button asChild variant="ghost" size="sm">
                            <Link
                              to={`/dashboard/document/${session.id}`}
                              state={{
                                definitiveValues: session.definitiveValues,
                                fileName: session.fileName,
                                pdf_url: session.pdf_url, 
                              }}
                            >
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
