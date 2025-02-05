import React from 'react'

export const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

export default function Change({change_in_balance}:{change_in_balance: number}) {

    
  return (
    <div className={change_in_balance < 0 ? 'text-red-800' : 'text-green-800'}>
        Change in balance over period was {change_in_balance < 0 ? 'negative' : (change_in_balance > 0 ? 'positive' : 'zero')}
    </div>
  )
}
