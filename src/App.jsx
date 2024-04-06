import React, { useState } from "react";
import { FaHome, FaUser, FaFileAlt } from "react-icons/fa";

function App() {
  const [properties, setProperties] = useState([]);
  const [renters, setRenters] = useState([]);
  const [applications, setApplications] = useState([]);

  const handlePropertySubmit = (property) => {
    setProperties([...properties, property]);
  };

  const handleRenterSubmit = (renter) => {
    setRenters([...renters, renter]);
  };

  const handleApplicationSubmit = (application) => {
    setApplications([...applications, application]);
  };

  const handleApplicationReview = (applicationId, status) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status } : app)));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Property Rental Platform</h1>

      <div className="grid grid-cols-3 gap-8">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <FaHome className="mr-2" />
              Properties
            </h2>
            <PropertyForm onSubmit={handlePropertySubmit} />
            <PropertyList properties={properties} />
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <FaUser className="mr-2" />
              Renters
            </h2>
            <RenterForm onSubmit={handleRenterSubmit} />
            <RenterList renters={renters} />
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <FaFileAlt className="mr-2" />
              Applications
            </h2>
            <ApplicationForm properties={properties} renters={renters} onSubmit={handleApplicationSubmit} />
            <ApplicationList applications={applications} onReview={handleApplicationReview} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for property form
function PropertyForm({ onSubmit }) {
  const [property, setProperty] = useState({
    name: "",
    description: "",
    terms: "",
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(property);
    setProperty({ name: "", description: "", terms: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Property Name" value={property.name} onChange={handleChange} className="input input-bordered w-full mb-2" />
      <textarea name="description" placeholder="Description" value={property.description} onChange={handleChange} className="textarea textarea-bordered w-full mb-2"></textarea>
      <input type="text" name="terms" placeholder="Lease Terms" value={property.terms} onChange={handleChange} className="input input-bordered w-full mb-4" />
      <button type="submit" className="btn btn-accent btn-block rounded-box">
        Add Property
      </button>
    </form>
  );
}

// Component for property list
function PropertyList({ properties }) {
  return (
    <ul>
      {properties.map((property, index) => (
        <li key={index} className="mb-4">
          <h3 className="text-xl font-bold">{property.name}</h3>
          <p>{property.description}</p>
          <p>Lease Terms: {property.terms}</p>
        </li>
      ))}
    </ul>
  );
}

// Component for renter form
function RenterForm({ onSubmit }) {
  const [renter, setRenter] = useState({
    name: "",
    email: "",
    phone: "",
    references: "",
  });

  const handleChange = (e) => {
    setRenter({ ...renter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(renter);
    setRenter({ name: "", email: "", phone: "", references: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={renter.name} onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input type="email" name="email" placeholder="Email" value={renter.email} onChange={handleChange} className="input input-bordered w-full mb-2" />
      <input type="tel" name="phone" placeholder="Phone" value={renter.phone} onChange={handleChange} className="input input-bordered w-full mb-2" />
      <textarea name="references" placeholder="References" value={renter.references} onChange={handleChange} className="textarea textarea-bordered w-full mb-4"></textarea>
      <button type="submit" className="btn btn-accent btn-block rounded-box">
        Add Renter
      </button>
    </form>
  );
}

// Component for renter list
function RenterList({ renters }) {
  return (
    <ul>
      {renters.map((renter, index) => (
        <li key={index} className="mb-4">
          <h3 className="text-xl font-bold">{renter.name}</h3>
          <p>Email: {renter.email}</p>
          <p>Phone: {renter.phone}</p>
          <p>References: {renter.references}</p>
        </li>
      ))}
    </ul>
  );
}

// Component for application form
function ApplicationForm({ properties, renters, onSubmit }) {
  const [application, setApplication] = useState({
    propertyId: "",
    renterId: "",
  });

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...application, id: Date.now(), status: "pending" });
    setApplication({ propertyId: "", renterId: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="propertyId" value={application.propertyId} onChange={handleChange} className="select select-bordered w-full mb-2">
        <option value="">Select Property</option>
        {properties.map((property, index) => (
          <option key={index} value={index}>
            {property.name}
          </option>
        ))}
      </select>
      <select name="renterId" value={application.renterId} onChange={handleChange} className="select select-bordered w-full mb-4">
        <option value="">Select Renter</option>
        {renters.map((renter, index) => (
          <option key={index} value={index}>
            {renter.name}
          </option>
        ))}
      </select>
      <button type="submit" className="btn btn-primary">
        Submit Application
      </button>
    </form>
  );
}

// Component for application list
function ApplicationList({ applications, onReview }) {
  return (
    <ul>
      {applications.map((application) => (
        <li key={application.id} className="mb-4">
          <p>
            Property: {application.propertyId} | Renter: {application.renterId}
          </p>
          <p>Status: {application.status}</p>
          {application.status === "pending" && (
            <div>
              <button onClick={() => onReview(application.id, "approved")} className="btn btn-sm btn-success mr-2">
                Approve
              </button>
              <button onClick={() => onReview(application.id, "denied")} className="btn btn-sm btn-error">
                Deny
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default App;
