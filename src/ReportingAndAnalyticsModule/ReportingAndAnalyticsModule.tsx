import './ReportingAndAnalyticsModule.css';
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

interface IActivityLog {
  date: string;
  user: string;
  company: string;
  activity: string;
}

const communicationData = [
  { name: 'Email', frequency: 40, successfulResponses: 30 },
  { name: 'LinkedIn Post', frequency: 35, successfulResponses: 20 },
  { name: 'Phone Call', frequency: 25, successfulResponses: 15 },
  { name: 'Text Message', frequency: 20, successfulResponses: 10 },
  { name: 'Webinar', frequency: 15, successfulResponses: 5 },
];

const overdueData = [
  { date: '2023-12-01', CompanyA: 12, CompanyB: 8, CompanyC: 5 },
  { date: '2023-12-02', CompanyA: 10, CompanyB: 6, CompanyC: 7 },
  { date: '2023-12-03', CompanyA: 8, CompanyB: 5, CompanyC: 4 },
  { date: '2023-12-04', CompanyA: 15, CompanyB: 10, CompanyC: 6 },
  { date: '2023-12-05', CompanyA: 10, CompanyB: 8, CompanyC: 7 },
];

const activityLogData: IActivityLog[] = [
  { date: '2023-12-01', user: 'John Doe', company: 'Company A', activity: 'Sent email' },
  { date: '2023-12-02', user: 'Jane Doe', company: 'Company B', activity: 'Made phone call' },
  { date: '2023-12-03', user: 'John Doe', company: 'Company C', activity: 'Sent LinkedIn post' },
  { date: '2023-12-04', user: 'Jane Smith', company: 'Company D', activity: 'Participated in webinar' },
  { date: '2023-12-05', user: 'Mark Johnson', company: 'Company E', activity: 'Sent text message' },
];

const ReportingAndAnalyticsModule = () => {
  const [communicationMethod, setCommunicationMethod] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('');
  const [company, setCompany] = useState<string>('');

  const handleFilter = () => {
    // Add filter logic here
    alert('Filter Applied!');
  };

  const handleDownloadReport = (format: 'pdf' | 'csv') => {
    alert(`Downloading report in ${format.toUpperCase()} format!`);
  };

  return (
    <div className="dashboard-container">
      {/* Heading */}
      <h1 className="main-header">Reporting and Analytics</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <label>
          Communication Method:
          <select
            value={communicationMethod}
            onChange={(e) => setCommunicationMethod(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Email">Email</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Text Message">Text Message</option>
            <option value="Webinar">Webinar</option>
          </select>
        </label>
        <label>
          Date Range:
          <input type="date" value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
        </label>
        <label>
          Company:
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="">Select</option>
            <option value="Company A">Company A</option>
            <option value="Company B">Company B</option>
            <option value="Company C">Company C</option>
            <option value="Company D">Company D</option>
            <option value="Company E">Company E</option>
          </select>
        </label>
        <button onClick={handleFilter}>Apply Filter</button>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Row 1 */}
        <div className="chart-row">
          <div className="chart-card">
            <h2>Communication Frequency</h2>
            <BarChart width={400} height={300} data={communicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="chart-card">
            <h2>Engagement Effectiveness</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={communicationData}
                dataKey="successfulResponses"
                nameKey="name"
                fill="#82ca9d"
                label={(entry) =>
                  `${entry.name}: ${((entry.successfulResponses / entry.frequency) * 100).toFixed(
                    1
                  )}%`
                }
              />
            </PieChart>
          </div>
        </div>

        {/* Row 2 */}
        <div className="chart-row">
          <div className="chart-card">
            <h2>Overdue Communication Trends</h2>
            <LineChart width={400} height={300} data={overdueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="CompanyA" stroke="#ff7300" />
              <Line type="monotone" dataKey="CompanyB" stroke="#387908" />
              <Line type="monotone" dataKey="CompanyC" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="chart-card">
            <h2>Activity Log</h2>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>User</th>
                  <th>Company</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {activityLogData.map((log, index) => (
                  <tr key={index}>
                    <td>{log.date}</td>
                    <td>{log.user}</td>
                    <td>{log.company}</td>
                    <td>{log.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="download-section">
        <button onClick={() => handleDownloadReport('pdf')}>Download PDF</button>
        <button onClick={() => handleDownloadReport('csv')}>Download CSV</button>
      </div>
    </div>
  );
};

export default ReportingAndAnalyticsModule;
