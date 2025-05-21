import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/DashboardHeader';

interface ProcessedDocument {
  id: string;
  name: string;
  type: string;
  pages: number;
  domain: string;
  definitiveValues: boolean;
  status: 'processing' | 'completed' | 'failed';
  lastUpdated: string;
}

const TrainingResults = () => {
  const location = useLocation();
  
  const bucketName = localStorage.getItem('bucketName');
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bucketName) return;

    let interval: NodeJS.Timeout;

    const fetchCompletedFiles = async () => {
      try {
        const response = await fetch(
          `http://192.168.0.250:8080/bucket/${bucketName}/documents/with-definitive-values`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) return;

        const updatedDocs: ProcessedDocument[] = data
          .filter((doc: any) => files.includes(doc.file_name))
          .map((doc: any) => ({
            id: doc.file_name,
            name: doc.file_name,
            type: 'PDF',
            pages: doc.total_pages || 0,
            domain: doc.domain || '-',
            definitiveValues: !!doc.domain,
            status: doc.processing_status,
            lastUpdated: new Date().toISOString(),
          }));

        setDocuments(updatedDocs);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchCompletedFiles();
    interval = setInterval(fetchCompletedFiles, 10000);

    return () => clearInterval(interval);
  }, [bucketName]);

  const filteredDocuments =
    filter === 'all'
      ? documents
      : documents.filter((doc) => doc.status === filter);

  return (
    <div>
      <DashboardHeader
        title="Training Results"
        subtitle="File status will update as they are trained"
      />

      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="font-semibold">Processed Documents</h2>
              <Badge variant={loading ? 'outline' : 'secondary'}>
                {loading ? 'Processing' : 'Complete'}
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead className="text-center">Pages</TableHead>
                  <TableHead className="text-center">Domain</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {error ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-red-500 py-6">
                      {error}
                    </TableCell>
                  </TableRow>
                ) : filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      {loading ? 'Processing documents...' : 'No documents found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell className="text-center">{doc.pages}</TableCell>
                      <TableCell className="text-center">
                        {doc.status === 'processing' ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          doc.domain
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {doc.status === 'completed' ? (
                          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
                            Completed
                          </Badge>
                        ) : doc.status === 'failed' ? (
                          <Badge variant="destructive">Failed</Badge>
                        ) : (
                          <Badge variant="outline" className="animate-pulse bg-blue-50 text-blue-700">
                            Processing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {doc.status === 'completed' && (
                          <Button asChild variant="ghost" size="sm">
                            <Link to={`/dashboard/training/${doc.id}`}>
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
