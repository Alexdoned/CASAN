import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Settings,
  Plus,
  Edit,
  Trash2,
  Home,
  UserCheck,
  CreditCard,
  Lock,
  Crown
} from "lucide-react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [events, setEvents] = useState([
    { id: 1, title: "Annual Retreat", date: "2024-05-15", attendees: 120, status: "Upcoming" },
    { id: 2, title: "Mass Training", date: "2024-06-20", attendees: 85, status: "Upcoming" },
    { id: 3, title: "Leadership Conference", date: "2024-07-10", attendees: 200, status: "Planning" }
  ]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const [leaders, setLeaders] = useState([
    { id: 1, name: "Fr. John Adebayo", position: "Spiritual Director", diocese: "Lagos", contact: "+234 801 234 5678" },
    { id: 2, name: "Mary Okafor", position: "President", diocese: "Abuja", contact: "+234 802 345 6789" },
    { id: 3, name: "Peter Nwosu", position: "Vice President", diocese: "Port Harcourt", contact: "+234 803 456 7890" }
  ]);
  const [editingLeader, setEditingLeader] = useState(null);
  const [editLeaderName, setEditLeaderName] = useState("");

  const stats = [
    {
      title: "Total Members",
      value: "1,247",
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600"
    },
    {
      title: "Active Events",
      value: "12",
      icon: Calendar,
      bg: "bg-green-100",
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      icon: DollarSign,
      bg: "bg-emerald-100",
      color: "text-emerald-600"
    },
    {
      title: "Active Servers",
      value: "89",
      icon: UserCheck,
      bg: "bg-purple-100",
      color: "text-purple-600"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Lanwebanu@#34") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: "New Event",
      date: new Date().toISOString().split('T')[0],
      attendees: 0,
      status: "Planning"
    };
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const startEditing = (event) => {
    setEditingEvent(event.id);
    setEditTitle(event.title);
  };

  const saveEdit = () => {
    setEvents(events.map(event => 
      event.id === editingEvent ? { ...event, title: editTitle } : event
    ));
    setEditingEvent(null);
    setEditTitle("");
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setEditTitle("");
  };

  const addLeader = () => {
    const newLeader = {
      id: leaders.length + 1,
      name: "New Leader",
      position: "Member",
      diocese: "Diocese",
      contact: "+234 XXX XXX XXXX"
    };
    setLeaders([...leaders, newLeader]);
  };

  const deleteLeader = (id) => {
    setLeaders(leaders.filter(leader => leader.id !== id));
  };

  const startEditingLeader = (leader) => {
    setEditingLeader(leader.id);
    setEditLeaderName(leader.name);
  };

  const saveLeaderEdit = () => {
    setLeaders(leaders.map(leader => 
      leader.id === editingLeader ? { ...leader, name: editLeaderName } : leader
    ));
    setEditingLeader(null);
    setEditLeaderName("");
  };

  const cancelLeaderEdit = () => {
    setEditingLeader(null);
    setEditLeaderName("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-slate-600 mt-2">Enter password to access admin panel</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-500 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "events", label: "Manage Events", icon: Calendar },
    { id: "leaders", label: "Manage Leaders", icon: Crown },
    { id: "members", label: "Members", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl">
        <div className="p-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900">Admin Panel</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                  activeTab === item.id
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="mt-2 text-slate-600">Welcome back! Here's what's happening with your organization.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.title} className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">New member registration</p>
                    <p className="text-sm text-slate-600">Mary Johnson joined the association</p>
                  </div>
                  <span className="text-sm text-slate-500 ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Event created</p>
                    <p className="text-sm text-slate-600">Annual Retreat scheduled for May 15</p>
                  </div>
                  <span className="text-sm text-slate-500 ml-auto">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Manage Events</h1>
                <p className="mt-2 text-slate-600">Create and manage diocesan events and gatherings.</p>
              </div>
              <button 
                onClick={addEvent}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>

            <div className="rounded-3xl bg-white shadow-xl shadow-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Event</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Attendees</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingEvent === event.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                              autoFocus
                            />
                            <button
                              onClick={saveEdit}
                              className="text-green-600 hover:text-green-900 text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="font-medium text-slate-900">{event.title}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {new Date(event.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {event.attendees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEditing(event)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "leaders" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Manage Leaders</h1>
                <p className="mt-2 text-slate-600">Manage diocesan leaders and their contact information.</p>
              </div>
              <button 
                onClick={addLeader}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <Plus className="w-4 h-4" />
                Add Leader
              </button>
            </div>

            <div className="rounded-3xl bg-white shadow-xl shadow-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Position</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Diocese</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {leaders.map((leader) => (
                    <tr key={leader.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingLeader === leader.id ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={editLeaderName}
                              onChange={(e) => setEditLeaderName(e.target.value)}
                              className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                              autoFocus
                            />
                            <button
                              onClick={saveLeaderEdit}
                              className="text-green-600 hover:text-green-900 text-sm font-medium"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelLeaderEdit}
                              className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="font-medium text-slate-900">{leader.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {leader.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {leader.diocese}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {leader.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEditingLeader(leader)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteLeader(leader.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "dashboard" && activeTab !== "events" && activeTab !== "leaders" && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{sidebarItems.find(item => item.id === activeTab)?.label}</h2>
              <p className="text-slate-600">This section is under development.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;