import { useEffect, useState } from "react";


function App() {
  const [transactions, setTransactions] = useState([]);
  const [amountM, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountId, setAccountId] = useState("");

  useEffect(function () {
    getTransactions();
  }, []);

  async function getTransactions() {
    const response = await fetch(
      "https://infra.devskills.app/api/accounting/transactions"
    );
    const data = await response.json();
    setTransactions(data);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(
      "https://infra.devskills.app/api/accounting/transactions",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          account_id: accountId,
          amount: parseFloat(amountM),
        }),
      }
    );
    const data = await response.json();
    const { account_id, amount, balance } = data;

    const responseB = await fetch(
      `https://infra.devskills.app/api/accounting/accounts/${account_id}`
    );
    const dataB = await responseB.json();
    console.log(dataB);

    setBalance(dataB.balance);

    setTransactions([{ account_id, amount, balance }, ...transactions]);

    setAccountId("");
    setAmount("");
  }

  return (
    <div className="flex py-5 justify-center gap-20 bg-gray-100 ">
      <div className="">
        <h1 className="font-bold pb-6 text-center text-2xl pt-3">
          Submit New Transaction
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 px-10 py-5 border-2"
        >
          <label className="font-bold">Account ID</label>
          <input
            className="w-full py-2 px-4  bg-slate-200 outline-none"
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            data-type="account-id"
            required
          />
          <label className="font-bold">Amount</label>
          <input
            type="number"
            className="w-full py-2 px-4 bg-slate-200 outline-none"
            value={amountM}
            onChange={(e) => setAmount(e.target.value)}
            data-type="amount"
            required
          />
          <div className="py-4">
            <button
              className="py-3 px-10 bg-black text-white "
              type="submit"
              data-type="transaction-submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="border-2 px-6 py-3 h-screen overflow-scroll">
        <h1 className="font-bold pb-6 text-center text-xl ">
          Transaction History
        </h1>
        <div className=" pb-3">
          {transactions.map((transaction, index) => {
            return (
              <>
                <div
                  className="py-3"
                  key={index}
                  data-type="transaction"
                  data-account-id={transaction.account_id}
                  data-amount={transaction.amount}
                  data-balance={transaction.balance}
                >
                  {transaction.amount < 0 ? (
                    <p className="text-red-600">
                      Transferred ${transaction.amount} from account $
                      {transaction.account_id}
                    </p>
                  ) : (
                    <p className="text-green-500">
                      Transferred ${transaction.amount} to account $
                      {transaction.account_id}
                    </p>
                  )}

                  {index === 0 && (
                    <p className="font-bold">Current Balance: {balance}</p>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
