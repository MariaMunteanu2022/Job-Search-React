import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import "./App.css";
import { FaSpinner } from "react-icons/fa";

function App() {
  let maxPages, renderedJobs;
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, totalJobs } = useFetchJobs(params, page);
  if (totalJobs) {
    maxPages = parseInt(totalJobs / 50 + 1);
  }
  if (jobs) {
    renderedJobs = jobs.slice(
      (page - 1) * 50,
      page * 50 - 1 > totalJobs ? totalJobs - 1 : page * 50 - 1
    );
  }

  function handleParamChange(e) {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">
        <FaSpinner />
        Indeed
      </h1>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={page <= maxPages - 1}
      />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {renderedJobs &&
        renderedJobs.map((job) => {
          return <Job key={job.id} job={job} />;
        })}

      <JobsPagination
        page={page}
        setPage={setPage}
        hasNextPage={page <= maxPages - 1}
      />
    </Container>
  );
}

export default App;
