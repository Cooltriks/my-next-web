"use client";

import { useState } from "react";
import { Button, Card, Nav, Tab, Table } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, PointElement, LineElement, LineController } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  LineController
);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Users",
      data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
    {
      label: "Posts",
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      borderColor: "rgba(153, 102, 255, 1)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      fill: true,
    },
    {
      label: "Engagement",
      data: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
      borderColor: "rgba(255, 159, 64, 1)",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      fill: true,
    },
  ],
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-vh-100 d-flex bg-light">
      {/* Sidebar */}
      <aside
        className={`bg-dark text-light position-fixed h-100 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "w-250" : "w-0"
        }`}
        style={{ overflow: "hidden", zIndex: 1000 }}
      >
        <div className="p-4 border-bottom border-secondary">
          <span className="h3 fw-bold text-light">SMA Admin</span>
        </div>
        <nav className="flex-grow-1 p-3">
          <Nav className="flex-column">
            {["Dashboard", "About", "Banner", "Team", "Contact"].map((item, index) => (
              <Nav.Link
                key={index}
                className={`mb-2 text-light ${activeTab === item.toLowerCase() ? "active" : ""}`}
                onClick={() => handleTabChange(item.toLowerCase())}
              >
                {item}
              </Nav.Link>
            ))}
          </Nav>
        </nav>
        <div className="p-4 border-top border-secondary">
          <div className="d-flex align-items-center">
            <img
              src="/placeholder.svg"
              alt="Admin"
              className="rounded-circle me-3"
              style={{ height: "48px", width: "48px" }}
            />
            <div>
              <p className="mb-0 fw-bold text-light">Admin User</p>
              <small className="text-muted">admin@sma.com</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-grow-1 d-flex flex-column transition-all duration-300 ${sidebarOpen ? "ms-250" : ""}`}>
        {/* Navigation */}
        <nav className="bg-dark shadow-sm py-3">
          <div className="container d-flex justify-content-between align-items-center">
            <Button
              variant="link"
              className="text-light p-0"
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Search..."
                className="form-control me-2 bg-dark text-light border-secondary"
              />
              <img
                src="/placeholder.svg"
                alt="User"
                className="rounded-circle"
                style={{ height: "32px", width: "32px" }}
              />
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <main className="flex-grow-1 p-4">
          <div className="container">
            <h1 className="h3 mb-4 text-primary">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

            {activeTab === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="row mb-4">
                  {[
                    { title: "Total Users", count: "10,482", change: "+20.1% from last month", color: "primary" },
                    { title: "Total Posts", count: "23,543", change: "+15.2% from last month", color: "success" },
                    { title: "Engagement Rate", count: "58.3%", change: "+7.4% from last month", color: "info" },
                  ].map((stat, index) => (
                    <div className="col-12 col-md-4 mb-3" key={index}>
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Body className="d-flex flex-column">
                          <Card.Title className={`text-${stat.color}`}>{stat.title}</Card.Title>
                          <Card.Text className="h2 my-3">{stat.count}</Card.Text>
                          <p className="text-muted mt-auto">{stat.change}</p>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <Card className="mb-4 shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="text-primary mb-4">Analytics Overview</Card.Title>
                    <div style={{ height: "200px", width: "100%" }}>
                      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </Card.Body>
                </Card>

                {/* Tabs for Forms and Tables */}
                <Tab.Container defaultActiveKey="users">
                  <Nav variant="pills" className="mb-3">
                    <Nav.Item>
                      <Nav.Link eventKey="users" className="px-4">Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="posts" className="px-4">Posts</Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content>
                    <Tab.Pane eventKey="users">
                      <Card className="shadow-sm border-0">
                        <Card.Body>
                          <Card.Title className="text-primary mb-4">Create New User</Card.Title>
                          <form>
                            <div className="mb-3">
                              <label htmlFor="name" className="form-label">
                                Name
                              </label>
                              <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="User's name"
                              />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="User's email"
                              />
                            </div>
                          </form>
                        </Card.Body>
                        <Card.Footer className="bg-white border-0">
                          <Button variant="primary" className="px-4">Create User</Button>
                        </Card.Footer>
                      </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="posts">
                      <Card className="shadow-sm border-0">
                        <Card.Body>
                          <Card.Title className="text-primary mb-4">Recent Posts</Card.Title>
                          <Table hover responsive>
                            <thead>
                              <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>First Post</td>
                                <td>Alice Johnson</td>
                                <td>2023-07-01</td>
                              </tr>
                              <tr>
                                <td>Second Post</td>
                                <td>John Doe</td>
                                <td>2023-08-15</td>
                              </tr>
                              <tr>
                                <td>Third Post</td>
                                <td>Mary Smith</td>
                                <td>2023-09-10</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </>
            )}

            {activeTab === "about" && (
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-primary mb-4">About Us</Card.Title>
                  <p>This is the About page content. You can add more information about your company or organization here.</p>
                </Card.Body>
              </Card>
            )}

            {activeTab === "banner" && (
              <>
                <Card className="shadow-sm border-0 mb-4">
                  <Card.Body>
                    <Card.Title className="text-primary mb-4">Add New Banner</Card.Title>
                    <form>
                      <div className="mb-3">
                        <label htmlFor="bannerTitle" className="form-label">Banner Title</label>
                        <input type="text" className="form-control" id="bannerTitle" placeholder="Enter banner title" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bannerImage" className="form-label">Banner Image</label>
                        <input type="file" className="form-control" id="bannerImage" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bannerLink" className="form-label">Banner Link</label>
                        <input type="url" className="form-control" id="bannerLink" placeholder="Enter banner link" />
                      </div>
                      <Button variant="primary" type="submit">Add Banner</Button>
                    </form>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm border-0">
                  <Card.Body>
                    <Card.Title className="text-primary mb-4">Existing Banners</Card.Title>
                    <Table hover responsive>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Summer Sale</td>
                          <td>summer-sale.jpg</td>
                          <td>/summer-sale</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                            <Button variant="outline-danger" size="sm">Delete</Button>
                          </td>
                        </tr>
                        <tr>
                          <td>New Collection</td>
                          <td>new-collection.jpg</td>
                          <td>/new-collection</td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                            <Button variant="outline-danger" size="sm">Delete</Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </>
            )}

            {activeTab === "team" && (
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-primary mb-4">Team Members</Card.Title>
                  <p>Manage your team members here. You can add, edit, or remove team members from this section.</p>
                </Card.Body>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Card.Title className="text-primary mb-4">Contact Information</Card.Title>
                  <p>Update your contact information and manage incoming messages from this section.</p>
                </Card.Body>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}