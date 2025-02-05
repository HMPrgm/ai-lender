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

    const colorOnScore = (score: number) => {
        switch (score) {
            case 4:
                return 'text-green-800'
            case 3:
                return 'text-green-800'
            case 2:
                return ''
            case 1:
                return 'text-red-800'
            default:
                return 'text-red-800'
        }
    }

    return (
        <div className='border py-12 px-12 rounded-xl text-center'>
            <h2 className='text-5xl font-light'>Overall Score</h2>
            <div className={`text-7xl font-medium my-8 ${colorOnScore(score)}`}>{score}/4</div>
            <div className='text-dark_2 text-2xl font-light'>{message}</div>
        </div>
    )
}
