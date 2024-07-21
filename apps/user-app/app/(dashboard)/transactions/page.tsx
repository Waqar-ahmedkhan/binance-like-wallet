"use client"

import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from 'react';

// Mock data for demonstration purposes
const transactions = [
  { id: 1, type: 'send', amount: 5000, recipient: 'Ali Hassan', date: '2024-07-20', category: 'Transfer' },
  { id: 2, type: 'receive', amount: 10000, sender: 'Fatima Khan', date: '2024-07-19', category: 'Salary' },
  { id: 3, type: 'billPayment', amount: 2500, recipient: 'K-Electric', date: '2024-07-18', category: 'Utilities' },
  { id: 4, type: 'mobileLoad', amount: 500, recipient: 'Telenor', date: '2024-07-17', category: 'Mobile' },
  { id: 5, type: 'send', amount: 1500, recipient: 'Muhammad Azeem', date: '2024-07-16', category: 'Transfer' },
];

export default function TransactionDashboard() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    return (filter === 'all' || transaction.type === filter) &&
           (transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
           (!startDate || new Date(transaction.date) >= new Date(startDate)) &&
           (!endDate || new Date(transaction.date) <= new Date(endDate));
  });

  const totalIncome = filteredTransactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type !== 'receive').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">Transaction History</h1>
        <p className="text-gray-600">View and manage your financial activities</p>
      </header>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select
            label="Filter by Type"
            options={[
              { value: 'all', label: 'All Transactions' },
              { value: 'send', label: 'Sent' },
              { value: 'receive', label: 'Received' },
              { value: 'billPayment', label: 'Bill Payments' },
              { value: 'mobileLoad', label: 'Mobile Load' },
            ]}
            value={filter}
            onChange={(value) => setFilter(value)}
          />
          <TextInput
            label="Search"
            placeholder="Search by name or category"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
          <TextInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(value) => setStartDate(value)}
          />
          <TextInput
            label="End Date"
            type="date"
            value={endDate}
            onChange={(value) => setEndDate(value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Total Transactions</h2>
          <p className="text-3xl font-bold text-green-600">{filteredTransactions.length}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Total Income</h2>
          <p className="text-3xl font-bold text-green-600">Rs. {totalIncome.toLocaleString()}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Total Expense</h2>
          <p className="text-3xl font-bold text-red-600">Rs. {totalExpense.toLocaleString()}</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Transaction Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'receive' ? 'bg-green-100 text-green-800' : 
                      transaction.type === 'send' ? 'bg-red-100 text-red-800' : 
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type === 'receive' ? 'Received' : 
                       transaction.type === 'send' ? 'Sent' : 
                       transaction.type === 'billPayment' ? 'Bill Payment' : 'Mobile Load'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${transaction.type === 'receive' ? 'text-green-600' : 'text-red-600'}`}>
                      Rs. {transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.recipient || transaction.sender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}