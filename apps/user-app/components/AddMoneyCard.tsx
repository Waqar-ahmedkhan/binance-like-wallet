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
    <Card>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Money</h2>
        <div className="space-y-6">
          <TextInput
            label="Amount (PKR)"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
            error={error}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <Select
              onSelect={handleBankSelect}
              options={SUPPORTED_BANKS.map(bank => ({
                key: bank.name,
                value: bank.name
              }))}
              value={selectedBank.name}
            />
          </div>
          {error && (
            <div className="flex items-center text-red-600">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <div className="flex justify-center">
            <Button
              onClick={handleAddMoney}
              disabled={!!error || !amount}
              className="w-full md:w-auto px-6 py-2"
            >
              Add Money
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};