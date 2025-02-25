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
            buildAccount();
            return;
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            JSON.stringify({ "balance": 0 }),
            function(error) {
                console.log(chalk.bgRed.black(error));
            }
        )

        console.log(chalk.green('Parabéns, sua conta foi criada com sucesso!'));
        operations();
    })
    .catch((error) => console.log(error));
};