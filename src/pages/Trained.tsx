import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardHeader from '@/components/DashboardHeader';

const Trained = () => {
  const [completedFiles, setCompletedFiles] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const files = location.state?.files || [];
  const bucketName = localStorage.getItem('bucketName');

  useEffect(() => {
    if (!bucketName) return;

    let interval;

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
          throw new Error(`Error fetching completed files: ${response.status}`);
        }

        const data = await response.json();
        const completed = {};

        if (Array.isArray(data)) {
          data.forEach((d) => {
            if (
              d.processing_status === 'completed' &&
              files.includes(d.file_name)
            ) {
              completed[d.file_name] = d; // Save entire session object
            }
          });
        }

        setCompletedFiles(completed);

        if (Object.keys(completed).length === files.length - 1 && interval) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedFiles();
    interval = setInterval(fetchCompletedFiles, 10000);

    return () => clearInterval(interval);
  }, [files, bucketName]);

  return (
    <div className="p-6">
      <DashboardHeader
        title="Trained Files"
        subtitle="File status will update as they are trained"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">
          <p>Failed to load completed status.</p>
          <p>{error}</p>
        </div>
      ) : (
        <Table className="mt-[2rem] bg-white shadow-lg h-auto max-h-[25rem] overflow-y-scroll">
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((fileName) => {
              const session = completedFiles[fileName];
              const isCompleted = !!session;
              const domain = session?.domain || '';

              return (
                <TableRow key={fileName}>
                  <TableCell className="font-bold">{fileName}</TableCell>
                  <TableCell>
                    {isCompleted ? (
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Processing
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{domain}</TableCell>
                  <TableCell className="text-right">
                    {isCompleted && (
                      <Button asChild size="sm" variant="ghost">
                        <Link
                          to={`/dashboard/document/${session._id}`}
                          state={{
                            definitiveValues: session.definitive_values,
                            fileName: session.file_name,
                            pdf_url: session.pdf_url,
                          }}
                        >
                          View
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Trained;
