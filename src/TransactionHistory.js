import React from "react";

export default function TransactionHistory({ transactions, balance, loading }) {
  if (loading) {
    return (
      <div className="py-52 px-44">
        <h1 className="text-2xl text-gray-400">Loading transactions ...</h1>
      </div>
    );
  }
  return (
    <div className="border-2 px-6 py-3 h-screen overflow-scroll">
      <h1 className="font-bold pb-6 text-center text-xl ">
        Transaction History
      </h1>
      <div className=" pb-3">
        {transactions.map((transaction, index) => {
          if (transaction.account_id === undefined) {
            return null;
          }
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
                {" "}
                {transaction.amount < 0 ? (
                  <p className="text-red-600">
                    Transferred ${transaction.amount} from account -
                    {transaction.account_id}
                  </p>
                ) : (
                  <p className="text-green-500">
                    Transferred ${transaction.amount} to account -
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
  );
}
