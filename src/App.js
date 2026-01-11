import React, { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Droplets, Hospital, Trash2, Activity, TrendingUp, Clock, CheckCircle, Bell } from 'lucide-react';

const BueaHealthSystem = () => {
  const [activeTab, setActiveTab] = useState('report');
  const [reports, setReports] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    type: 'health',
    category: '',
    description: '',
    location: '',
    severity: 'medium',
    contactName: '',
    contactPhone: ''
  });

  useEffect(() => {
    const sampleResources = [
      { id: 1, name: 'Regional Hospital Buea', type: 'hospital', lat: 4.1560, lng: 9.2320, services: 'Emergency, General Medicine, Surgery' },
      { id: 2, name: 'Buea Health Center', type: 'clinic', lat: 4.1580, lng: 9.2340, services: 'Primary Care, Vaccinations' },
      { id: 3, name: 'Community Sanitation Point A', type: 'sanitation', lat: 4.1545, lng: 9.2310, services: 'Waste Collection, Drainage' },
      { id: 4, name: 'Mobile Clinic Station', type: 'clinic', lat: 4.1600, lng: 9.2360, services: 'Mobile Health Services' },
      { id: 5, name: 'Sanitation Depot B', type: 'sanitation', lat: 4.1570, lng: 9.2330, services: 'Waste Management, Recycling' }
    ];

    const sampleReports = [
      {
        id: 1,
        type: 'sanitation',
        category: 'blocked_drain',
        description: 'Major drainage blockage causing flooding',
        location: 'Molyko Junction',
        severity: 'high',
        status: 'pending',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lat: 4.1565,
        lng: 9.2325
      },
      {
        id: 2,
        type: 'health',
        category: 'disease_symptoms',
        description: 'Multiple cases of fever and rash reported',
        location: 'Great Soppo',
        severity: 'high',
        status: 'investigating',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        lat: 4.1555,
        lng: 9.2315
      },
      {
        id: 3,
        type: 'sanitation',
        category: 'waste_overflow',
        description: 'Overflowing waste bins attracting pests',
        location: 'Mile 16',
        severity: 'medium',
        status: 'resolved',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        lat: 4.1590,
        lng: 9.2350
      }
    ];

    setResources(sampleResources);
    setReports(sampleReports);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReport = () => {
    if (!formData.category || !formData.description || !formData.location || !formData.contactName || !formData.contactPhone) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newReport = {
      id: reports.length + 1,
      ...formData,
      status: 'pending',
      timestamp: new Date().toISOString(),
      lat: 4.1560 + (Math.random() - 0.5) * 0.01,
      lng: 9.2320 + (Math.random() - 0.5) * 0.01
    };

    setReports(prev => [newReport, ...prev]);
    setFormData({
      type: 'health',
      category: '',
      description: '',
      location: '',
      severity: 'medium',
      contactName: '',
      contactPhone: ''
    });
    
    alert('Report submitted successfully! Authorities have been notified.');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'blocked_drain': return <Droplets className="w-5 h-5" />;
      case 'waste_overflow': return <Trash2 className="w-5 h-5" />;
      case 'disease_symptoms': return <Activity className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'hospital': return <Hospital className="w-6 h-6 text-red-500" />;
      case 'clinic': return <Activity className="w-6 h-6 text-blue-500" />;
      case 'sanitation': return <Droplets className="w-6 h-6 text-green-500" />;
      default: return <MapPin className="w-6 h-6" />;
    }
  };

  const calculateStats = () => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const resolved = reports.filter(r => r.status === 'resolved').length;
    const highPriority = reports.filter(r => r.severity === 'high').length;
    
    return { total, pending, resolved, highPriority };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="bg-white shadow-md border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500 p-2 rounded-lg">
                <Hospital className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Buea Health & Sanitation System</h1>
                <p className="text-sm text-gray-600">Community Health Monitoring & Response</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'report' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Report Issue
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'map' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Resource Map
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'dashboard' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Authority Dashboard
          </button>
        </div>

        {activeTab === 'report' && (
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Health or Sanitation Issue</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="health">Health Issue</option>
                    <option value="sanitation">Sanitation Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select category...</option>
                    {formData.type === 'health' ? (
                      <>
                        <option value="disease_symptoms">Disease Symptoms</option>
                        <option value="outbreak">Disease Outbreak</option>
                        <option value="other_health">Other Health Concern</option>
                      </>
                    ) : (
                      <>
                        <option value="blocked_drain">Blocked Drain</option>
                        <option value="waste_overflow">Waste Overflow</option>
                        <option value="stagnant_water">Stagnant Water</option>
                        <option value="other_sanitation">Other Sanitation Issue</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Molyko Junction"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <select
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High - Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+237 XXX XXX XXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Please provide detailed information about the issue..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                onClick={handleSubmitReport}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center space-x-2"
              >
                <AlertCircle className="w-5 h-5" />
                <span>Submit Report</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="mt-6 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Community Health Resources Map</h2>
              
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg p-8 mb-4 relative" style={{ height: '400px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Interactive Map View</p>
                    <p className="text-sm text-gray-500">Buea, Southwest Region</p>
                  </div>
                </div>
                
                {resources.map((resource, idx) => (
                  <div
                    key={resource.id}
                    className="absolute bg-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition"
                    style={{
                      top: `${20 + idx * 15}%`,
                      left: `${30 + idx * 10}%`
                    }}
                    onClick={() => setSelectedLocation(resource)}
                  >
                    {getResourceIcon(resource.type)}
                  </div>
                ))}
              </div>

              {selectedLocation && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <div className="flex items-start space-x-3">
                    {getResourceIcon(selectedLocation.type)}
                    <div>
                      <h3 className="font-bold text-gray-800">{selectedLocation.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{selectedLocation.services}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Location: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                  <div className="flex items-start space-x-3">
                    {getResourceIcon(resource.type)}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{resource.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.services}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          resource.type === 'hospital' ? 'bg-red-100 text-red-700' :
                          resource.type === 'clinic' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
                  </div>
                  <AlertCircle className="w-12 h-12 text-blue-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-12 h-12 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                  </div>
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">High Priority</p>
                    <p className="text-3xl font-bold text-red-600">{stats.highPriority}</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Incident Reports</h2>
              <div className="space-y-3">
                {reports.map(report => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getCategoryIcon(report.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-bold text-gray-800">
                              {report.category.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(report.status)}`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(report.severity)}`}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{report.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(report.timestamp).toLocaleString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {report.status === 'pending' && (
                          <button
                            onClick={() => {
                              setReports(prev => prev.map(r => 
                                r.id === report.id ? { ...r, status: 'investigating' } : r
                              ));
                            }}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                          >
                            Investigate
                          </button>
                        )}
                        {report.status === 'investigating' && (
                          <button
                            onClick={() => {
                              setReports(prev => prev.map(r => 
                                r.id === report.id ? { ...r, status: 'resolved' } : r
                              ));
                            }}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BueaHealthSystem;