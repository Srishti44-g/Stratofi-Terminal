import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';

export default function DashboardPreview() {
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleTheme = () => setDarkMode(!darkMode);
  
  return (
    <div className={`${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 min-h-screen fixed ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
          <div className="px-6 py-6">
            <h1 className="text-2xl font-bold">StratoFi Terminal</h1>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-1">
              {['Dashboard', 'Portfolios', 'Strategies', 'Testing Console', 'Analytics', 'Clients'].map((item, index) => (
                <li key={item}>
                  <div className={`flex items-center px-4 py-3 text-sm rounded-md ${index === 0 ? (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900') : ''} cursor-pointer`}>
                    <span className="mr-3">
                      {index === 0 && '📊'}
                      {index === 1 && '💼'}
                      {index === 2 && '🎯'}
                      {index === 3 && '🧪'}
                      {index === 4 && '📈'}
                      {index === 5 && '👥'}
                    </span>
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-auto`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                <span>JD</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Portfolio Manager</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="ml-64 flex-1">
          {/* Header */}
          <header className={`h-16 px-6 flex items-center justify-between ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
            <div className="flex items-center">
              <h2 className="text-lg font-medium">Welcome to StratoFi Terminal</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                🔔
              </button>
              <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                ⚙️
              </button>
            </div>
          </header>
          
          {/* Main Dashboard Content */}
          <main className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-medium mb-4">Portfolio Summary</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Total Portfolios</span>
                  <span className="font-mono text-lg">24</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-500">Real: 14</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-500">Virtual: 10</span>
                    </div>
                  </div>
                  <div className="h-12 w-12">
                    <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Total Capital</span>
                    <span className="font-mono text-lg">$5,280,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Real</span>
                    <span className="font-mono">$4,150,000</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Virtual</span>
                    <span className="font-mono">$1,130,000</span>
                  </div>
                </div>
              </div>
              
              <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-medium mb-4">Risk Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Low', value: 8 },
                        { name: 'Medium', value: 12 },
                        { name: 'High', value: 4 },
                      ]}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                      <XAxis dataKey="name" tick={{ fill: darkMode ? "#ccc" : "#666" }} />
                      <YAxis tick={{ fill: darkMode ? "#ccc" : "#666" }} />
                      <Tooltip contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff" }} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-medium mb-4">Strategy Utilization</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Momentum', value: 10 },
                          { name: 'Mean Reversion', value: 6 },
                          { name: 'Option Selling', value: 5 },
                          { name: 'Delta Neutral', value: 3 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#0088FE" />
                        <Cell fill="#00C49F" />
                        <Cell fill="#FFBB28" />
                        <Cell fill="#FF8042" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Performance Chart */}
            <div className={`rounded-lg shadow-md p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Performance Overview</h3>
                <div className="flex space-x-2">
                  <button className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>1W</button>
                  <button className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'}`}>1M</button>
                  <button className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>3M</button>
                  <button className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>YTD</button>
                  <button className={`px-3 py-1 text-sm rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>1Y</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={Array.from({ length: 30 }, (_, i) => ({
                      date: `Apr ${i + 1}`,
                      real: 4000000 + Math.random() * 400000 + i * 20000,
                      virtual: 1000000 + Math.random() * 200000 + i * 15000,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#444" : "#eee"} />
                    <XAxis dataKey="date" tick={{ fill: darkMode ? "#ccc" : "#666" }} />
                    <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} tick={{ fill: darkMode ? "#ccc" : "#666" }} />
                    <Tooltip 
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                      contentStyle={{ backgroundColor: darkMode ? "#333" : "#fff" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="real" stroke="#0088FE" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="virtual" stroke="#00C49F" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Recent Portfolios */}
            <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Recent Portfolios</h3>
                <button className="text-sm text-blue-500 hover:underline">View All</button>
              </div>
              
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Client</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-right py-3 px-4 font-medium">Capital</th>
                    <th className="text-center py-3 px-4 font-medium">Risk</th>
                    <th className="text-right py-3 px-4 font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Growth Portfolio Alpha", client: "John Smith", type: "REAL", capital: 500000, risk: "MEDIUM", date: "Apr 12, 2025" },
                    { name: "Tech Momentum Strategy", client: "Alice Johnson", type: "VIRTUAL", capital: 350000, risk: "HIGH", date: "Apr 11, 2025" },
                    { name: "Conservative Income", client: "Robert Davis", type: "REAL", capital: 750000, risk: "LOW", date: "Apr 10, 2025" },
                    { name: "Options Strategy Test", client: "Emily Wilson", type: "VIRTUAL", capital: 250000, risk: "MEDIUM", date: "Apr 9, 2025" },
                    { name: "Balanced Global", client: "Michael Brown", type: "REAL", capital: 420000, risk: "MEDIUM", date: "Apr 8, 2025" },
                  ].map((portfolio, i) => (
                    <tr key={i} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'} border-b cursor-pointer`}>
                      <td className="py-3 px-4 text-blue-500 hover:underline">{portfolio.name}</td>
                      <td className="py-3 px-4">{portfolio.client}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          portfolio.type === 'REAL' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                            : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {portfolio.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono">${portfolio.capital.toLocaleString()}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          portfolio.risk === 'LOW' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          portfolio.risk === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {portfolio.risk}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-500">{portfolio.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
