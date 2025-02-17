 "use client"
import { Card } from "@repo/ui/card";
import { useEffect } from 'react';

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    useEffect(() => {
        console.log('BalanceCard rendered with:', { amount, locked });
    }, [amount, locked]);

    return (
        <Card title={"Balance"}>
            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>
                    Unlocked balance
                </div>
                <div>
                    {amount / 100} PKR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {locked / 100} PKR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Balance
                </div>
                <div>
                    {(locked + amount) / 100} PKR
                </div>
            </div>
        </Card>
    );
}