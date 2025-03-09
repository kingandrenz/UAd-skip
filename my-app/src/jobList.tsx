import JobCard from "./jobCard";

const JobList: React.FC = () => {
    const jobs = [
        { id: 1, title: "Software Engineer", company: "TechCorp", location: "Remote", description: "Develop and maintain software applications." },
        { id: 2, title: "Product Manager", company: "Innovate Ltd", location: "New York, USA", description: "Oversee product development lifecycle." },
        { id: 3, title: "Data Analyst", company: "DataWorks", location: "San Francisco, USA", description: "Analyze and interpret complex data sets." },
        { id: 4, title: "UX Designer", company: "Creative Studio", location: "Los Angeles, USA", description: "Design intuitive user experiences and interfaces." },
        { id: 5, title: "Marketing Specialist", company: "GrowthHub", location: "Chicago, USA", description: "Develop marketing campaigns and analyze trends." }
      ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p className="text-gray-500">No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default JobList;
