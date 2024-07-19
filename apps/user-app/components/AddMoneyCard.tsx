"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/OnrampbalanceStore";

const SUPPORTED_BANKS = [{
    name: "Meezan bank",
    redirectUrl: "https://www.meezanbank.com/"
}, {
    name: "Habib bank",
    redirectUrl: "https://www.hbl.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [Provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "")
    const [value, setvalue] = useState(0);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(val) => {
            setvalue(Number(val))
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");

        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={async () => {
                window.location.href = redirectUrl || "";""
                await  createOnRampTransaction(Provider, value)
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}