import { useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import Form from "./Form";

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
      <Form
        handleSubmit={handleSubmit}
        balance={balance}
        accountId={accountId}
        amountM={amountM}
        transactions={transactions}
        setBalance={setBalance}
        setAmount={setAmount}
        setAccountId={setAccountId}
      />
      <TransactionHistory transactions={transactions} balance={balance} />
    </div>
  );
}

export default App;
