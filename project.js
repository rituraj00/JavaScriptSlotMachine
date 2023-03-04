// 1. Deposit the money into slot machine
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Ask to play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const deposit = () => {
  while (true) {
    const deposit_amount = parseFloat(prompt("Enter a deposit amount: "));
    if (isNaN(deposit_amount) || deposit_amount <= 0) {
      console.log("Invalid deposit amount, try again");
    } else {
      return deposit_amount;
    }
  }
};

const get_number_of_lines = () => {
  while (true) {
    const number_of_lines = parseFloat(
      prompt("Enter the number of lines to bet on (1-3): ")
    );
    if (isNaN(number_of_lines) || number_of_lines <= 0 || number_of_lines > 3) {
      console.log("Invalid number of lines, please try again");
    } else {
      return number_of_lines;
    }
  }
};

const get_bet_amount = (balance, lines) => {
  while (true) {
    const bet_amount = parseFloat(
      prompt("How much money you want to bet per line: ")
    );
    if (isNaN(bet_amount) || bet_amount <= 0 || bet_amount > balance / lines) {
      console.log("Invalid bet amount, please try again");
    } else {
      return bet_amount;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let j = 0; j < COLS; j++) {
    reels.push([]);
    const reel_symbols = [...symbols];
    for (let k = 0; k < ROWS; k++) {
      const random_index = Math.floor(Math.random() * reel_symbols.length);
      const selected_symbol = reel_symbols[random_index];
      reels[j].push(selected_symbol);
      reel_symbols.splice(random_index, 1);
    }
  }

  return reels;
};

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }

  return rows;
};

const print_rows = (rows) => {
  for (const row of rows) {
    let row_string = "";
    for (const [i, symbol] of row.entries()) {
      row_string += symbol;
      if (i != row.length - 1) {
        row_string += " | ";
      }
    }
    console.log(row_string);
  }
};

const get_winnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let all_same = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        all_same = false;
        break;
      }
    }

    if (all_same) {
      winnings += bet * SYMBOLS_VALUES[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let deposit_amount = deposit();

  while (true) {
    console.log("You have a balance of $" + deposit_amount);
    const number_of_lines = get_number_of_lines();
    const bet_amount = get_bet_amount(deposit_amount, number_of_lines);
    deposit_amount -= bet_amount * number_of_lines;
    const reels = spin();
    const rows = transpose(reels);
    print_rows(rows);
    const winnings = get_winnings(rows, bet_amount, number_of_lines);
    deposit_amount += winnings;
    console.log("You won, $" + winnings.toString()); 

    if (deposit_amount <= 0) {
        console.log("You are broke!");
        break;
    }

    const play_again = prompt("Do you want to play again (y/n)? ");

    if (play_again != "y") break;
  }
};

game();