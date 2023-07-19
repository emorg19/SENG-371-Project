import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'; 

//random number generator
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

const less = [
    <Alert severity="error">Prioritize your expenses; rent, food, and utilities are the most important</Alert>,
    <Alert severity="error">Cut unneeded expenses such as eating out or unused subscription services</Alert>,

    <Alert severity="error">Repay any debt as soon as possible</Alert>,

    <Alert severity="error">Use cash instead of credit to avoid high-interest debt</Alert>,

    <Alert severity="error">Build an emergency fund to help with unforseeen expenses</Alert>,
    <Alert severity="error">Find ways to earn extra money</Alert>,

    // 'Prioritize your expenses; rent, food, and utilities are the most important',
    // 'Cut unneeded expenses such as eating out or unused subscription services',
    // 'Repay any debt as soon as possible',
    // 'Use cash instead of credit to avoid high-interest debt',
    // 'Build an emergency fund to help with unforseeen expenses',
    // 'Find ways to earn extra money'
]

const between = [
    <Alert severity="warning">Set financial or savings goals, such as saving for a large purchase or building an emergency fund'</Alert>,
    <Alert severity="warning">Define expense catagories and allocate a portion of your income to each catagory, include both essential and nonessential expenses</Alert>,
    <Alert severity="warning">Track your spending and identify areas to cut back</Alert>,
    <Alert severity="warning">Pay off any debt</Alert>,
    <Alert severity="warning">Save money in a high interest savings account such as a TFSA and create a ling term savings goal</Alert>,
    // 'set financial or savings goals, such as saving for a large purchase or building an emergency fund',
    // 'Define expense catagories and allocate a portion of your income to each catagory, include both essential and nonessential expenses',
    // 'Track your spending and identify areas to cut back',
    // 'Pay off any debt',
    // 'Save money in a high interest savings account such as a TFSA and create a ling term savings goal'
]

const over = [
    <Alert severity="success">Review expenses and identify areas to cut back in</Alert>,
    <Alert severity="success">Increase savings by aiming to save 20% of your income per month</Alert>,
    <Alert severity="success">Invest your money in things such as stocks or mutual funds; talk with a financial advisor to find the best investment oportunities</Alert>,
    <Alert severity="success">Revisit budget monthly to make any adjestments needed</Alert>,
    <Alert severity="success">Set aside money in a TFSA or another high interest savings account</Alert>,
    // 'Review expenses and identify areas to cut back in',
    // 'Increase savings by aiming to save 20% of your income per month',
    // 'Invest your money in things such as stocks or mutual funds; talk with a financial advisor to find the best investment oportunities',
    // 'Revisit budget monthly to make any adjestments needed',
    // 'Set aside money in a TFSA or another high interest savings account'
]

export default function getTips(amount: number): string{
    if(amount < 1000){
        const idx = getRandomInt(6);
        return less[idx];
    }else if (amount >= 1000 && amount < 5000){
        const idx = getRandomInt(5);
        return between[idx];
    }else if (amount >= 5000){
        const idx = getRandomInt(5);
        return over[idx];
    }
    return 'invalid budget';
}