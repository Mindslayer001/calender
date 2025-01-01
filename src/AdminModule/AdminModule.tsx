import React, { useState } from 'react';
import './AdminModule.css';

interface Company {
  id: number;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
}

const initialCompany: Company = {
  id: 0,
  name: '',
  location: '',
  linkedinProfile: '',
  emails: [],
  phoneNumbers: [],
  comments: '',
};

const AdminModule = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company>(initialCompany);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newEmails = [...company.emails];
    newEmails[index] = event.target.value;
    setCompany({ ...company, emails: newEmails });
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPhoneNumbers = [...company.phoneNumbers];
    newPhoneNumbers[index] = event.target.value;
    setCompany({ ...company, phoneNumbers: newPhoneNumbers });
  };

  const addEmail = () => {
    setCompany({ ...company, emails: [...company.emails, ''] });
  };

  const addPhoneNumber = () => {
    setCompany({ ...company, phoneNumbers: [...company.phoneNumbers, ''] });
  };

  const removeEmail = (index: number) => {
    const newEmails = [...company.emails];
    newEmails.splice(index, 1);
    setCompany({ ...company, emails: newEmails });
  };

  const removePhoneNumber = (index: number) => {
    const newPhoneNumbers = [...company.phoneNumbers];
    newPhoneNumbers.splice(index, 1);
    setCompany({ ...company, phoneNumbers: newPhoneNumbers });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      const newCompanies = companies.map((c) =>
        c.id === company.id ? company : c
      );
      setCompanies(newCompanies);
      setIsEditing(false);
    } else {
      setCompanies([...companies, { ...company, id: companies.length + 1 }]);
    }
    setCompany(initialCompany);
  };

  const handleEdit = (id: number) => {
    const companyToEdit = companies.find((c) => c.id === id);
    if (companyToEdit) {
      setCompany(companyToEdit);
      setIsEditing(true);
    }
  };

  const handleDelete = (id: number) => {
    const newCompanies = companies.filter((c) => c.id !== id);
    setCompanies(newCompanies);
  };

  return (
    <div className="admin-module-container">
      <h1 className="main-heading">Company Dashboard</h1>
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={company.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                value={company.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="linkedinProfile">LinkedIn Profile</label>
              <input
                id="linkedinProfile"
                type="text"
                name="linkedinProfile"
                value={company.linkedinProfile}
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label>Emails</label>
              {company.emails.map((email, index) => (
                <div key={index} className="subfield">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e, index)}
                  />
                  <button type="button" onClick={() => removeEmail(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addEmail}>
                Add Email
              </button>
            </div>
            <div className="field">
              <label>Phone Numbers</label>
              {company.phoneNumbers.map((number, index) => (
                <div key={index} className="subfield">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => handlePhoneNumberChange(e, index)}
                  />
                  <button type="button" onClick={() => removePhoneNumber(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addPhoneNumber}>
                Add Phone Number
              </button>
            </div>
            <div className="field">
              <label htmlFor="comments">Comments</label>
              <textarea
                id="comments"
                name="comments"
                value={company.comments}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
          </form>
        </div>
        <div className="details-container">
          <h2>Company Details</h2>
          {companies.length === 0 ? (
            <p>No companies added yet.</p>
          ) : (
            companies.map((company) => (
              <div key={company.id} className="details-box">
                <h3>{company.name}</h3>
                <p>Location: {company.location}</p>
                <p>LinkedIn: {company.linkedinProfile}</p>
                <p>Emails: {company.emails.join(', ')}</p>
                <p>Phone Numbers: {company.phoneNumbers.join(', ')}</p>
                <p>Comments: {company.comments}</p>
                <button onClick={() => handleEdit(company.id)}>Edit</button>
                <button onClick={() => handleDelete(company.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
