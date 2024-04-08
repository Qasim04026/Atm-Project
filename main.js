#! /usr/bin/env node
import inquirer from "inquirer";
{
    let totalBalance = 10000;
    const pinNumber = 1999;
    try {
        let pinEntered = await inquirer.prompt([
            {
                name: "pin",
                message: "Enter your pin number:",
                type: "number",
            }
        ]);
        if (pinEntered.pin === pinNumber) {
            console.log("Correct Pin Code!!!");
            let exit = false;
            while (!exit) {
                let atmQuestions = await inquirer.prompt([
                    {
                        name: "accountType",
                        message: "Select your account type:",
                        type: "list",
                        choices: ["Current Account", "Saving Account"]
                    },
                    {
                        name: "transMethod",
                        message: "Select your transaction method:",
                        type: "list",
                        choices: ["Cash Withdrawal", "Fast Cash", "Deposit", "Exit"]
                    }
                ]);
                switch (atmQuestions.transMethod) {
                    case "Cash Withdrawal":
                        let cashWithdrawAmount = await inquirer.prompt([
                            {
                                name: "withdrawal",
                                message: "Enter the amount you want to withdraw:",
                                type: "number",
                            }
                        ]);
                        if (totalBalance >= cashWithdrawAmount.withdrawal) {
                            totalBalance -= cashWithdrawAmount.withdrawal;
                            console.log(`Your Total Balance is :${totalBalance}`);
                        }
                        else {
                            console.log('Insufficient Balance');
                        }
                        break;
                    case "Fast Cash":
                        let fastCashAmount = await inquirer.prompt([
                            {
                                name: "fastCash",
                                message: "Select the amount you want to withdraw:",
                                type: "list",
                                choices: ["1000", "3000", "5000"]
                            }
                        ]);
                        let fastCashValue = Number(fastCashAmount.fastCash);
                        if (totalBalance >= fastCashValue) {
                            totalBalance -= fastCashValue;
                            console.log(`Your Total Balance is :${totalBalance}`);
                        }
                        else {
                            console.log('Insufficient Balance');
                        }
                        break;
                    case "Deposit":
                        let depositAmount = await inquirer.prompt([
                            {
                                name: "deposit",
                                message: "Enter the amount you want to deposit:",
                                type: "number",
                            }
                        ]);
                        totalBalance += depositAmount.deposit;
                        console.log(`Your Total Balance is :${totalBalance}`);
                        break;
                    case "Exit":
                        exit = true;
                        console.log("Thank you for using the ATM. Goodbye!");
                        break;
                }
            }
        }
        else {
            console.log("Incorrect Pin Code. Exiting...");
        }
    }
    catch (error) {
        console.error("An error occurred: ", error);
    }
}
