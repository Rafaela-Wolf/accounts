# Accounts

Accounts é um sistema bancário simples feito em Node.js que permite criar contas, consultar saldo, depositar e sacar dinheiro usando o terminal.

## Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)
- [Chalk](https://www.npmjs.com/package/chalk) (para estilizar mensagens no terminal)
- [Inquirer](https://www.npmjs.com/package/inquirer) (para interação com o usuário)
- [File System (fs)](https://nodejs.org/api/fs.html) (para manipulação de arquivos JSON)

## Como Instalar
1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/accounts.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd accounts
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## Como Usar
Para iniciar o sistema, execute o seguinte comando no terminal:
```sh
node index.js
```
O programa oferecerá um menu de opções:
- Criar conta
- Consultar saldo
- Depositar
- Sacar
- Sair

### Criar Conta
Escolha a opção "Criar conta" e forneça um nome para sua conta. O sistema criará um arquivo JSON com um saldo inicial de R$0,00.

### Consultar Saldo
Escolha a opção "Consultar saldo" e informe o nome da conta para visualizar o saldo atual.

### Depositar
Escolha a opção "Depositar", informe o nome da conta e o valor a ser depositado. O saldo será atualizado automaticamente.

### Sacar
Escolha a opção "Sacar", informe o nome da conta e o valor a ser retirado. O saldo será reduzido, desde que haja saldo suficiente.

### Sair
Escolha a opção "Sair" para encerrar o programa.

## Contribuição
Sinta-se à vontade para contribuir com melhorias! Para isso:
1. Fork este repositório
2. Crie uma branch com sua funcionalidade (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Faça o push da branch (`git push origin minha-feature`)
5. Abra um Pull Request