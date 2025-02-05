import React from 'react'
import { Statement } from '../../statements/page'



export default function StatementProcessor({ statement }: { statement: Statement }) {



    const slopeToOutcome = (slope: number) => {
        return slope > 0 ? "More Income than Expenses" : "More Expenses than Income" 
    }







    return (
        <div>
            <h1>Statement {statement.id}</h1>
            <ul>
                <li>Slope {statement.slope}</li>
                <li>Consistancy {statement.consistancy}</li>
                <li>Slope {statement.slope}</li>
                <li>Days {statement.days}</li>
                <li>Change in Balance {statement.change_in_balance}</li>
            </ul>
        </div>
    )
}
