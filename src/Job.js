import React, { useState } from "react";
import { Card, Badge, Button, Collapse, Form } from "react-bootstrap";
import { BiAperture } from "react-icons/bi";

export default function Job({ job }) {
  const [open, setOpen] = useState(false);
  const [apply, setApply] = useState(false);

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company_name}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.publication_date).toLocaleDateString()}-
              {job.job_type}
            </Card.Subtitle>
            <Badge variant="secondary" className="mr-2">
              {job.type}
            </Badge>
            <Badge variant="secondary">{job.location}</Badge>
          </div>
          <img
            className="d-none d-md-block"
            height="50"
            alt={job.company}
            src={job.company_logo}
          />
        </div>
        <Card.Text>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            variant="primary"
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
        </Card.Text>
        <Collapse in={open}>
          <div className="mt-4">
            <div dangerouslySetInnerHTML={{ __html: job.description }} />
            <div>
              <Button onClick={() => setApply(!apply)} variant="primary">
                Apply
              </Button>
            </div>

            {apply && (
              <div className="apply-section">
                Full Name
                <input type="text" />
                Phone Number
                <input type="text" />
                Email Address
                <input type="text" />
                Upload Resume
                <input type="text" />
                <div>
                  <Button onClick={() => setApply(!apply)} variant="primary">
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
