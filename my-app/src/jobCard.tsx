import { useState } from "react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <button 
        onClick={() => setShowDetails(!showDetails)} 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && <p className="mt-2 text-gray-700">{job.description}</p>}
    </div>
  );
};

export default JobCard;