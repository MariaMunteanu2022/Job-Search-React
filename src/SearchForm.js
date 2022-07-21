import React from "react";
import { Form, Col } from "react-bootstrap";

export default function SearchForm({ params, onParamChange }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Category</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.category}
            name="category"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Company</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.company_name}
            name="company_name"
            type="text"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamChange}
            value={params.candidate_required_location}
            name="candidate_required_location"
            type="text"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
