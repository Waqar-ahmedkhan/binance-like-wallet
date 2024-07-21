
// Mock data for demonstration purposes
const recentTransactions = [
  { id: 1, type: 'send', amount: 5000, recipient: 'Ali Hassan', date: '2024-07-20' },
  { id: 2, type: 'receive', amount: 10000, sender: 'Fatima Khan', date: '2024-07-19' },
  { id: 3, type: 'billPayment', amount: 2500, bill: 'Electricity', date: '2024-07-18' },
];

const quickActions = [
  { id: 'send', label: 'Send Money', icon: '💸' },
  { id: 'mobile', label: 'Mobile Load', icon: '📱' },
  { id: 'bills', label: 'Pay Bills', icon: '📄' },
  { id: 'qr', label: 'Scan QR', icon: '📷' },
];

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">Welcome to EasyPaisa</h1>
        <p className="text-gray-600">Your one-stop solution for all financial needs</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-3xl mb-2">{action.icon}</span>
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
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
                          transaction.type === 'receive' ? 'bg-green-100 text-green-800' : 
                          transaction.type === 'send' ? 'bg-red-100 text-red-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type === 'receive' ? 'Received' : 
                           transaction.type === 'send' ? 'Sent' : 'Bill Payment'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">Rs. {transaction.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500">
                          {transaction.recipient || transaction.sender || transaction.bill}
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
          </section>
        </div>

        <div className="col-span-1">
          <section className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
            <div className="text-3xl font-bold text-green-600">Rs. 25,000</div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
              Add Money
            </button>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Promotions</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-sm text-yellow-700">Get 5% cashback on your next bill payment!</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-sm text-blue-700">Refer a friend and earn Rs. 100!</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}