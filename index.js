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
        console.log(action);
    })
    .catch((error) => console.log(error))
}