import inquirer from "inquirer";

interface IBankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    getBalance(): number;
}

class BankAccount implements IBankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`You have withdrawn ${amount} from your account. Your Current Balance is ${this.balance}`);
        } else {
            console.log("Insufficient Balance");
        }
    }

    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`You have deposited ${amount} to your account. Your Current Balance is ${this.balance}`);
    }

    getBalance(): number {
        console.log(`Your Current Balance is: ${this.balance}`);
        return this.balance;
    }
}

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    accounts: BankAccount;
    mobileNo: number;

    constructor(firstName: string, lastName: string, gender: string, age: number, accountNo: BankAccount, mobileNo: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.accounts = accountNo;
        this.mobileNo = mobileNo;
    }
}

const accounts: BankAccount[] = [
    new BankAccount(1000, 1000),
    new BankAccount(1001, 2000),
    new BankAccount(1002, 3000),
];

const customers: Customer[] = [
    new Customer("Daniyal", "Tariq", "Male", 20, accounts[0], 123),
    new Customer("Omair", "Tariq", "Male", 20, accounts[1], 1234),
    new Customer("Junaid", "Tariq", "Male", 20, accounts[2], 12345),
];

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "AccountNumber",
            type: "number",
            message: "Enter Account Number",
        });

        const customer = customers.find(customer => customer.accounts.accountNumber === accountNumberInput.AccountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const action = await inquirer.prompt([{
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Withdraw",
                    "Deposit",
                    "Check Balance",
                    "Exit",
                ],
            }]);

            switch (action.action) {
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much would you like to withdraw?",
                    });
                    customer.accounts.withdraw(withdrawAmount.amount);
                    break;
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "How much would you like to deposit?",
                    });
                    customer.accounts.deposit(depositAmount.amount);
                    break;
                case "Check Balance":
                    customer.accounts.getBalance();
                    break;
                case "Exit":
                    return;
            }
        } else {
            console.log("Account not found. Please try again.");
        }
    } while (true);
}

service();
