import { useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import Form from "./Form";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amountM, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [accountId, setAccountId] = useState("");
  const [errorFetching, setErrorFetching] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(function () {
    getTransactions();
  }, []);

  async function getAccountBalance(id) {
    const responseB = await fetch(
      `https://infra.devskills.app/api/accounting/accounts/${id}`
    );
    const dataB = await responseB.json();

    if (dataB.error === "account_id must be a valid UUID v4") {
      setErrorFetching(dataB.error);
    }

    setBalance(dataB.balance);
  }

  async function getTransactions() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://infra.devskills.app/api/accounting/transactions"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
      const accountNumber = data[0].account_id;
      getAccountBalance(accountNumber);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
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

      if (!response.ok) {
        setErrorFetching("error");
        return null;
      } else {
        const { account_id, amount, balance } = data;
        console.log("retrun");
        setTransactions([{ account_id, amount, balance }, ...transactions]);
        getAccountBalance(account_id);
        setAccountId("");
        setAmount("");
        setErrorFetching("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex py-5 justify-center gap-20 bg-gray-100 h-screen ">
      <Form
        handleSubmit={handleSubmit}
        balance={balance}
        accountId={accountId}
        amountM={amountM}
        transactions={transactions}
        setBalance={setBalance}
        setAmount={setAmount}
        setAccountId={setAccountId}
        errorFetching={errorFetching}
      />
      <TransactionHistory
        loading={loading}
        transactions={transactions}
        balance={balance}
        errorFetching={errorFetching}
      />
    </div>
  );
}

export default App;
