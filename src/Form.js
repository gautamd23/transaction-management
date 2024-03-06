import React from 'react'

export default function Form({handleSubmit,
    balance,
    accountId,
    amountM,
    transactions,
    setBalance,
    setAmount,
    setAccountId}) {
  return (
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
  )
}
