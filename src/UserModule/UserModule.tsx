import React, { useState } from "react";
import "./UserModule.css";

interface Communication {
  id: number;
  type: string;
  date: string;
  notes?: string;
}

interface Company {
  id: number;
  name: string;
  communications: Communication[];
  nextCommunication: Communication | null;
  isOverdue: boolean;
  isDueToday: boolean;
}

const companiesData: Company[] = [
  {
    id: 1,
    name: "Company A",
    communications: [
      { id: 1, type: "LinkedIn Post", date: "2023-09-01", notes: "Follow up with CEO." },
      { id: 2, type: "Email", date: "2023-09-05", notes: "Sent proposal." },
      { id: 3, type: "Phone Call", date: "2023-09-10", notes: "Discussed project scope." },
      { id: 4, type: "Email", date: "2023-09-15", notes: "Received feedback." },
    ],
    nextCommunication: { id: 5, type: "Email", date: "2024-01-05" },
    isOverdue: false,
    isDueToday: false,
  },
  {
    id: 2,
    name: "Company B",
    communications: [
      { id: 1, type: "Phone Call", date: "2023-09-10", notes: "Discuss project." },
      { id: 2, type: "Email", date: "2023-09-12", notes: "Follow-up email." },
      { id: 3, type: "LinkedIn Post", date: "2023-09-15", notes: "Posted update." },
      { id: 4, type: "Presentation", date: "2023-09-20", notes: "Presented quarterly review." },
    ],
    nextCommunication: { id: 5, type: "Follow-up Call", date: "2024-01-02" },
    isOverdue: false,
    isDueToday: true,
  },
  {
    id: 3,
    name: "Company C",
    communications: [
      { id: 1, type: "Email", date: "2023-09-15", notes: "Initial contact." },
      { id: 2, type: "Phone Call", date: "2023-09-20", notes: "Introduced team." },
      { id: 3, type: "LinkedIn Post", date: "2023-09-25", notes: "Engaged with their post." },
      { id: 4, type: "Email", date: "2023-09-30", notes: "Sent follow-up." },
    ],
    nextCommunication: { id: 5, type: "Phone Call", date: "2024-01-05" },
    isOverdue: false,
    isDueToday: false,
  },
  {
    id: 4,
    name: "Company D",
    communications: [
      { id: 1, type: "Email", date: "2023-09-05", notes: "Discussed potential collaboration." },
      { id: 2, type: "LinkedIn Post", date: "2023-09-08", notes: "Posted article." },
      { id: 3, type: "Phone Call", date: "2023-09-12", notes: "Scheduled a meeting." },
      { id: 4, type: "Presentation", date: "2023-09-18", notes: "Presented partnership proposal." },
    ],
    nextCommunication: { id: 5, type: "Follow-up Email", date: "2024-01-03" },
    isOverdue: false,
    isDueToday: false,
  },
  {
    id: 5,
    name: "Company E",
    communications: [
      { id: 1, type: "Email", date: "2023-09-01", notes: "Initial outreach." },
      { id: 2, type: "Phone Call", date: "2023-09-05", notes: "Followed up on proposal." },
      { id: 3, type: "LinkedIn Post", date: "2023-09-10", notes: "Engaged with their content." },
      { id: 4, type: "Email", date: "2023-09-15", notes: "Sent contract draft." },
    ],
    nextCommunication: { id: 5, type: "Call to finalize details", date: "2024-01-01" },
    isOverdue: true,
    isDueToday: false,
  },
  
];

const UserModule: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(companiesData);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCommunication, setNewCommunication] = useState<Communication>({
    id: 0,
    type: "",
    date: "",
    notes: "",
  });

  const toggleCompanySelection = (id: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const handleCommunicationSubmit = () => {
    const updatedCompanies = companies.map((company) => {
      if (selectedCompanies.includes(company.id)) {
        return {
          ...company,
          communications: [
            ...company.communications,
            { ...newCommunication, id: company.communications.length + 1 },
          ],
          isOverdue: false,
          isDueToday: false,
        };
      }
      return company;
    });

    setCompanies(updatedCompanies);
    setSelectedCompanies([]);
    setNewCommunication({ id: 0, type: "", date: "", notes: "" });
    setModalVisible(false);
  };

  return (
    <div className="user-module-container">
      <h2 className="dashboard-title">User Module Dashboard</h2>
      <table className="companies-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>Company Name</th>
            <th>Last Five Communications</th>
            <th>Next Scheduled Communication</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className={
                company.isOverdue
                  ? "overdue"
                  : company.isDueToday
                  ? "due-today"
                  : ""
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company.id)}
                  onChange={() => toggleCompanySelection(company.id)}
                />
              </td>
              <td>{company.name}</td>
              <td>
                {company.communications
                  .slice(-5)
                  .map((comm) => (
                    <div
                      key={comm.id}
                      className="communication-item"
                      title={comm.notes}
                    >
                      {comm.type} - {comm.date}
                    </div>
                  ))}
              </td>
              <td>
                {company.nextCommunication
                  ? `${company.nextCommunication.type} - ${company.nextCommunication.date}`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="communication-button"
        onClick={() => setModalVisible(true)}
      >
        Communication Performed
      </button>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Log Communication</h2>
            <label>
              Type of Communication:
              <select
                value={newCommunication.type}
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, type: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Email">Email</option>
                <option value="Phone Call">Phone Call</option>
                <option value="LinkedIn Post">LinkedIn Post</option>
                <option value="Presentation">Presentation</option>
                <option value="Follow-up Call">Follow-up Call</option>
              </select>
            </label>
            <label>
              Date of Communication:
              <input
                type="date"
                value={newCommunication.date}
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, date: e.target.value })
                }
              />
            </label>
            <label>
              Add Notes:
              <textarea
                value={newCommunication.notes}
                onChange={(e) =>
                  setNewCommunication({ ...newCommunication, notes: e.target.value })
                }
              />
            </label>
            <button onClick={handleCommunicationSubmit}>Submit</button>
            <button onClick={() => setModalVisible(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModule;
