import React from 'react';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const TransactionHistory = () => {
  // Sample data - replace with your actual data
  const transactions = [
    {
      id: "TRX-001",
      date: "2025-02-22",
      cost: 150.00,
      doctorName: "Dr. Smith"
    },
    {
      id: "TRX-002",
      date: "2025-02-21",
      cost: 75.50,
      doctorName: "Dr. Johnson"
    },
    {
      id: "TRX-003",
      date: "2025-02-20",
      cost: 200.00,
      doctorName: "Dr. Williams"
    },
    {
        id: "TRX-003",
        date: "2025-02-20",
        cost: 200.00,
        doctorName: "Dr. Williams"
    },
      {
        id: "TRX-003",
        date: "2025-02-20",
        cost: 200.00,
        doctorName: "Dr. Williams"
      },
      {
        id: "TRX-003",
        date: "2025-02-20",
        cost: 200.00,
        doctorName: "Dr. Williams"
      },
      {
          id: "TRX-003",
          date: "2025-02-20",
          cost: 200.00,
          doctorName: "Dr. Williams"
      },
        {
          id: "TRX-003",
          date: "2025-02-20",
          cost: 200.00,
          doctorName: "Dr. Williams"
        },
        {
          id: "TRX-003",
          date: "2025-02-20",
          cost: 200.00,
          doctorName: "Dr. Williams"
        },
        {
            id: "TRX-003",
            date: "2025-02-20",
            cost: 200.00,
            doctorName: "Dr. Williams"
        },
          {
            id: "TRX-003",
            date: "2025-02-20",
            cost: 200.00,
            doctorName: "Dr. Williams"
          }
  ];

  // Calculate totals
  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.cost, 0);
  const totalTransactions = transactions.length;

  return (
    <>
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Transaction History</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Stats Row */}
      {/* Total Transactions Box */}
      <Card className="bg-green-50">
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {totalTransactions}
            </p>
          </CardContent>
        </Card>

        {/* Money Spent Box */}
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Total Money Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              ${totalSpent.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
  <CardHeader>
    <CardTitle>Transaction Details</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-medium">Transaction ID</th>
            <th className="px-4 py-2 text-left font-medium">Date</th>
            <th className="px-4 py-2 text-left font-medium">Cost</th>
            <th className="px-4 py-2 text-left font-medium">Doctor Name</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="px-4 py-2 font-medium">{transaction.id}</td>
              <td className="px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">${transaction.cost.toFixed(2)}</td>
              <td className="px-4 py-2">{transaction.doctorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </CardContent>
    </Card>
      </div>
      </>
  );
};

export default TransactionHistory;