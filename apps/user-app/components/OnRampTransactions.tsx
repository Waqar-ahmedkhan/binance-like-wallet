import { Card } from "@repo/ui/card";
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: 'completed' | 'pending' | 'failed',
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card>
                <div className="text-center py-8 text-gray-500">
                    No recent transactions
                </div>
            </Card>
        );
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 2
        }).format(amount / 100);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-500';
            case 'pending':
                return 'text-yellow-500';
            case 'failed':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <Card>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
                <div className="space-y-4">
                    {transactions.map((t, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-3">
                            <div className="flex items-center">
                                <div className={`mr-3 p-2 rounded-full ${t.status === 'completed' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {t.status === 'completed' ? (
                                        <ArrowUpRight className="text-green-500" size={20} />
                                    ) : (
                                        <ArrowDownRight className="text-red-500" size={20} />
                                    )}
                                </div>
                                <div>
                                    <div className="font-medium">{t.provider}</div>
                                    <div className="text-sm text-gray-500">
                                        {t.time.toLocaleString('en-PK', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric', 
                                            hour: '2-digit', 
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`font-semibold ${t.status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                                    {t.status === 'completed' ? '+' : '-'} {formatAmount(t.amount)}
                                </div>
                                <div className={`text-xs capitalize ${getStatusColor(t.status)}`}>
                                    {t.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};