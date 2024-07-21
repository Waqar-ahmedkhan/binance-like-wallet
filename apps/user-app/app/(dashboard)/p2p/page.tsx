"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { SendCard } from "../../../components/SendCard";

// Mock data for demonstration purposes
const recentTransactions = [
  { id: 1, type: 'send', amount: 5000, recipient: 'Ali Hassan', date: '2024-07-20' },
  { id: 2, type: 'receive', amount: 10000, sender: 'Fatima Khan', date: '2024-07-19' },
  { id: 3, type: 'send', amount: 2500, recipient: 'Muhammad Azeem', date: '2024-07-18' },
];

const contacts = [
  { id: 1, name: 'Ali Hassan', number: '03001234567' },
  { id: 2, name: 'Fatima Khan', number: '03009876543' },
  { id: 3, name: 'Muhammad Azeem', number: '03331234567' },
];

export default function P2PDashboard() {
  const [activeTab, setActiveTab] = useState('send');
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setActiveTab('send');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">EasyPaisa P2P Transfers</h1>
        <p className="text-gray-600">Send and receive money quickly and securely</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <div className="mb-4">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-2 px-4 text-center ${activeTab === 'send' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('send')}
                >
                  Send Money
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center ${activeTab === 'request' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('request')}
                >
                  Request Money
                </button>
              </div>
            </div>
            {activeTab === 'send' ? (
              <SendCard initialNumber={selectedContact?.number || ""} />
            ) : (
              <div className="p-4">
                <TextInput placeholder="Recipient's Number" label="Recipient's Number" />
                <TextInput placeholder="Amount" label="Amount" />
                <TextInput placeholder="Reason (Optional)" label="Reason" />
                <div className="pt-4 flex justify-center">
                  <Button>Request Money</Button>
                </div>
              </div>
            )}
          </Card>

          <Card title="Recent Transactions" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'receive' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type === 'receive' ? 'Received' : 'Sent'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">Rs. {transaction.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {transaction.recipient || transaction.sender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="col-span-1">
          <Card title="Quick Contacts">
            <div className="space-y-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  className="w-full text-left p-2 hover:bg-gray-100 rounded"
                  onClick={() => handleContactSelect(contact)}
                >
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.number}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Promotions" className="mt-6">
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">Send money to 5 friends and get Rs. 50 cashback!</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-700">Refer a friend and earn Rs. 100 when they make their first transaction!</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}