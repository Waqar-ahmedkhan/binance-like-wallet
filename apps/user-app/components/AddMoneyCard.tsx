"use client"

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { AlertCircle } from 'lucide-react';
import React, { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/OnrampbalanceStore";

const SUPPORTED_BANKS = [
  { name: "Meezan Bank", redirectUrl: "https://www.meezanbank.com/" },
  { name: "Habib Bank", redirectUrl: "https://www.hbl.com/" }
];

export const AddMoney: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState(SUPPORTED_BANKS[0]);
  const [amount, setAmount] = useState<number | string>('');
  const [error, setError] = useState<string | null>(null);

  const handleAmountChange = (value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) {
      setError("Please enter a valid positive number");
    } else {
      setError(null);
    }
    setAmount(value);
  };

  const handleBankSelect = (bankName: string) => {
    const bank = SUPPORTED_BANKS.find(b => b.name === bankName);
    if (bank) setSelectedBank(bank);
  };

  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    try {
      await createOnRampTransaction(selectedBank.name, Number(amount));
      window.location.href = selectedBank.redirectUrl;
    } catch (err) {
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-2xl font-semibold text-white">Add Money to Your Account</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (PKR)</label>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              error={error}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <Select
              onSelect={handleBankSelect}
              options={SUPPORTED_BANKS.map(bank => ({
                key: bank.name,
                value: bank.name
              }))}
              value={selectedBank.name}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          {error && (
            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <div>
            <Button
              onClick={handleAddMoney}
              disabled={!!error || !amount}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Add Money
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};