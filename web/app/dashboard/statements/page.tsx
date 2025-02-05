import React from 'react'

export interface Statement {
    id: number;
    title: string;
    time_added: Date;
    slope: number;
    consistancy: number;
    change_in_balance: number;
    // user_id: number;
}

export default function StatementsPage() {
  return (
    <div>page</div>
  )
}
