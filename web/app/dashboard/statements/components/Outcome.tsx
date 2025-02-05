import { Statement } from '@/app/dashboard/statements/page'
import React from 'react'

const scoreCalculator = (statement: Statement) => {
    let score: number = 0
    score += statement.slope > 0 ? 1 : 0
    score += statement.consistancy < 1 ? 1 : 0
    score += statement.days > 120 ? 1 : 0
    score += statement.change_in_balance > 0 ? 1 : 0
    return score
}

export default function Outcome({ statement }: { statement: Statement }) {

    let message: string = ""
    const score: number = scoreCalculator(statement)

    switch (score) {
        case 4:
            message = "Excelent Candidate for a Loan"
            break;
        case 3:
            message = "Good Candidate for a Loan"
            break;
        case 2:
            message = "Ok Candidate for a Loan"
            break;
        case 1:
            message = "Poor Candidate for a Loan"
            break;
        default:
            message = "Extremely Poor Candidate for a Loan"
            break;
    }

    return (
        <div>
            {message}
        </div>
    )
}
