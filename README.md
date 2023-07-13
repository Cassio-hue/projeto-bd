# BD_UnB 2023.1 PEDRO GARCIA

## Aviso
Para desenvolvimento da aplicação, foi utilizado no WSL 2 do Windows 10, a distribuição Ubuntu 12.15-0ubuntu0.20.04.1

## Passo 1: Configurar o ambiente
### NodeJs
Para rodar a aplicação é necessário ter instalado em sua máquina a versão v18.16.1 NodeJs. Segue o [link](https://nodejs.org/en/download) da página de download.

### Yarn
Com o node já instalado você vai precisar baixar o Yarn (DEPENDENCY MANAGEMENT). A versão utilizada no desenvolvimento foi v1.22.19. Segue o [link](https://classic.yarnpkg.com/en/docs/install#windows-stable) da página de download.

### SGBD (Sistema de Gerenciamento de Banco de Dados)
Na aplicação foi utilizado o SGBD Postgre psql (PostgreSQL)12.15. Segue o [link](https://nodejs.org/en/download).

Acesse o terminal do postgres

Passo 1: Rode o comando abaixo e digite a senha do usuário postgres. Caso não saiba a senha, edite o arquivo pg_hba.conf. Segue [link](https://www.postgresqltutorial.com/postgresql-administration/postgresql-reset-password/) para tutorial.
```
sudo -i -u postgres
```

Passo 2:
```
psql
```

Passo 3: Crie o banco de dados que será utilizado pela aplicação.
```
CREATE DATABASE bd_trabs;
```

## Passo 2: Clonar o repositório
Com o ambiente preparado, você pode clonar o repositório do projeto. Verifique se a branch main é a correta e clone o repositório. No projeto da sua máquina deve conter duas pastas:
- frontend
- backend

### Configure seu arquivo .env no backend
Siga o exemplo do arquivo .env.example; Crie um arquivo .env na raiz do projeto backend. Configure a DB_URL do banco de dados e o JWT_SECRET (gere uma string com 32 caracteres aleatórios com letras e números).

## Passo 3: Baixar as dependências do projeto
Com o ambiente configurado, repositório clonado, variaveis de ambiente configuradas, agora baixe as dependências do backend e fronted.

Acesse a pagina do backend e rode o comando abaixo. Faça o mesmo para o frontend.
```
yarn install
```

Se tudo der certo, será criado uma pasta node_module nas pastas com todas as dependências baixadas.

## Passo 4: Migrations e Seeds
Para criar as tabelas no banco de dados e popula-las, rode os comandos:
```
yarn run create // Cria as tabelas e as popula
```

## Passo 5: Inicie o servidor do backend
Com todas as configurações feitas e banco de dados configurado, rode o comando para iniciar o backend da aplicação:
```
yarn start
```

## Passo 6: Inicie o servidor do frontend
O front não precisa de nenhuma configuração, somente ter as dependências baixadas. Com tudo isso feito, rode o comando para iniciar o frontend da aplicação:
```
yarn dev
```
