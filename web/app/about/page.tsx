import React from 'react'

export default function About() {
  return (
    <div className='mb-24 mx-2 flex flex-col items-center'>
      <h1 className='text-center text-5xl mt-8 mb-8 font-light'>About</h1>
      <p className='w-[42em] text-lg'>From 1/27/25 to 2/7/25, I designed and implemented a full-stack ML based app that can analyze and provide insights on a bank statement. This page is here to describe the architecture and technologies that were used and the reasons behind them.</p>
      <h2 className='text-center text-3xl mt-8 mb-4 font-light'>Model Architecture</h2>
      <p className='w-[42em] text-lg'>The first thing I did when I looked at the challenge page, was realize that I didn&apos;t really know what a good or bad bank statement was. I did some research and found that there were many different measures of reliability. I ended up using a linear regression model as it could measure</p>
      <ul className='w-[36em] text-lg my-2'>
        <li className='list-disc'>
          Positive change in balance over time
        </li>
        <li className='list-disc'>
          Consistency in expenses and income
        </li>
      </ul>
      <p className='w-[42em] text-lg'>The model itself would input a matrix where each row represents a transaction, containing the date and balance. This matrix was created from an xlsx file converted using numpy operations. Then the Linear regression model would train on the data, taking in the date as its feature and the balance as its label. After the model was trained four data points were taken.
      </p>
      <ul className='w-[36em] text-lg my-2'>
        <li className='list-disc'>
          Slope of the model - represents the average change in balance over time.
        </li>
        <li className='list-disc'>
          Normalized mean squared error - represents the inconsistency in expenses and income.
        </li>
        <li className='list-disc'>
          Total change in balance - just the last balance minus the first balance.
        </li>
        <li className='list-disc'>
          How many Days the bank statement covers - the more history on the statement, the more reliable its data is.
        </li>
      </ul>
      <p className='w-[42em] text-lg'>
        Then a score would be calculated for the bank statement based on the four points. As such the score is out of 4
      </p>
      <ul className='w-[36em] text-lg my-2'>
        <li className='list-disc'>
          +1, the slope is positive.

        </li>
        <li className='list-disc'>
          +1, the inconsistency is &lt; 1.

        </li>
        <li className='list-disc'>
          +1, the total number of days is &gt; 120.

        </li>
        <li className='list-disc'>
          +1, the total change in balance is positive.
        </li>
      </ul>
      <p className='w-[42em] text-lg'>This score, along with descriptions of each point would help provide insights to the bank.
      </p>
      <h2 className='text-center text-3xl mt-8 mb-4 font-light'>Website Design</h2>
      <p className='w-[42em] text-lg mb-2'>
        The website uses Flask to create a RESTful api and a Next.js/React frontend. Flask was chosen because it provides a relatively quick setup process making it great for prototyping. Next.js/React was chosen, since it also provides a relatively quick and easy way to make beautiful websites.
      </p>
      <p className='w-[42em] text-lg'>
        The app itself is more complicated than just a method to upload statements and get an analysis. Something I&apos;m relatively good at is full-stack development, as well as UI design, so I wanted to highlight that. I created a system where a loan officer at a bank can create or login to an account, see all of their past bank statement analysis, as well as upload new ones. I would go in depth more into the website, but given the fact you're reading this on the website, I'd suggest poking around a bit and checking out what it has to offer.

      </p>
    </div>
  )
}
