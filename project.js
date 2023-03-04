// 1. Deposit the money into slot machine
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Ask to play again

const prompt = require("prompt-sync")();

const deposit = () => {
    while(true){
        const deposit_amount = parseFloat(prompt("Enter a deposit amount: "));
        if(isNaN(deposit_amount) || deposit_amount <= 0){
            console.log("Invalid deposit amount, try again");
        }else{
            return deposit_amount;
        }
    }
};

const get_number_of_lines = () => {
    while(true){
        const number_of_lines = parseFloat(prompt("Enter the number of lines to bet on (1-3): "));
        if(isNaN(number_of_lines) || number_of_lines <= 0 || number_of_lines > 3){
            console.log("Invalid number of lines, please try again");
        }else{
            return number_of_lines;
        }
    }
}

const get_bet_amount = (balance, lines) => {
    while(true){
        const bet_amount = parseFloat(prompt("How much money you want to bet per line: "));
        if(isNaN(bet_amount) || bet_amount <= 0 || bet_amount > balance / lines){
            console.log("Invalid bet amount, please try again");
        }else{
            return bet_amount;
        }
    }
}

const number_of_lines = get_number_of_lines();
let deposit_amount = deposit();
const bet_amount = get_bet_amount(deposit_amount, number_of_lines);

