# About
Thank you for giving me this opportunity to display my skills. Over the past week I designed and implemented a full-stack ML based app that can analyze and provide insights on a bank statement. This page is here to describe the architecture and technologies that were used and the reasons behind them.
## ML Model Architecture
The first thing I did when I looked at the challenge page, was realize that I didn’t really know what a good or bad bank statement was. I did some research and found that there were many different measures of reliability. I ended up using a linear regression model as it could measure
- Positive change in balance over time
- Consistency in expenses and income
  
The model itself would input a matrix where each row represents a transaction, containing the date and balance. This matrix was created from an xlsx file converted using numpy operations. Then the Linear regression model would train on the data, taking in the date as its feature and the balance as its label. After the model was trained four data points were taken.
- Slope of the model - represents the average change in balance over time.
- Normalized mean squared error - represents the inconsistency in expenses and income.
- Total change in balance - just the last balance minus the first balance.
- How many Days the bank statement covers - the more history on the statement, the more reliable its data is.

Then a score would be calculated for the bank statement based on the four points. As such the score is out of 4
- +1, the slope is positive.
- +1, the inconsistency is <1.
- +1, the total number of days is >120.
- +1, the total change in balance is positive.

This score, along with descriptions of each point would help provide insights to the bank.
## Website Architecture
The website uses Flask to create a RESTful api and a Next.js/React frontend. Flask was chosen because it provides a relatively quick setup process making it great for prototyping. Next.js/React was chosen, since it also provides a relatively quick and easy way to make beautiful websites. 

The app itself is more complicated than just a method to upload statements and get an analysis. Something I’m relatively good at is full-stack development, as well as UI design, so I wanted to highlight that. I created a system where a loan officer at a bank can create or login to an account, see all of their past bank statement analysis, as well as upload new ones. I would go in depth more into the website, but the demo probably shows this better. 

# Instructions

To run this project, you must have python and node.js installed on your machine.

After cloning the repository, open your terminal to the repository, and type `cd ./web` to get into the web folder. Then run the following
```
.../web> npm install
```
to install the necessary node packages. then run
```
.../web> pip install -r requirements.txt
```
to install the necessary python packages.
## Secret Key 
next in the `.../web/api` folder create a new file called `.env`. If you don't have a secret key, you can generate one by running the following python script:
```
import uuid
uuid.uuid4().hex
```
new that you have your key, put the following in your `.env` file
```
FLASK_SECRET_KEY=your_secret_key_here
```
## Run
Now simply run the server by typeing
```
.../web> npm run dev
```
