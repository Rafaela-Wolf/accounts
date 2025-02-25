const chalk = require("chalk");
const inquirer = require("inquirer");
const fs = require("fs");

operations();

function operations() {

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ]
    }])
    .then((answer) => {
        const action = answer['action'];
        
        if (action === 'Criar conta') {
            createAccount();
        } else if (action === 'Consultar saldo') {
            getAccountBalance();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {

        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black("Obrigado por utilizar o Accounts!"));
            process.exit();
        }
    })
    .catch((error) => console.log(error))
};

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

    buildAccount();
};

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para a sua conta:'
    }])
    .then((answer) => {
        const accountName = answer['accountName'];

        console.info(accountName);

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome!'));
            return buildAccount();
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            JSON.stringify({ "balance": 0 }),
        )

        console.log(chalk.green('Parabéns, sua conta foi criada com sucesso!'));
        operations();
    })
    .catch((error) => console.log(error));
};

function deposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }])
    .then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) {
            return operations();
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja depositar?'
        }]).then((answer) => {
            const amount = parseFloat(answer['amount']);

            if (isNaN(amount) || amount <= 0) {
                console.log(chalk.bgRed.black("Valor inválido, tente novamente!"));
                return deposit();
            }

            addAmount(accountName, amount);

            operations();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

function checkAccount(accountName) {
    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta conta não existe. Tente novamente!'));
        return false;
    }
    return true;
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);
    accountData.balance += amount; 

    fs.writeFileSync(
        `accounts/${accountName}.json`, 
        JSON.stringify(accountData),
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta.`));
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJSON);
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) {
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${accountData.balance}.`));

        operations();
    })
    .catch((error) => console.log(error))
}