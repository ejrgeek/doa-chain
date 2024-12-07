
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

[English Version](README.md)

# Frontend - dApp DoaChain

### Você pode acessar por aqui: [DoaChain](https://doa-chain.vercel.app/)

Este é o frontend de uma plataforma para criação de campanhas e gerenciamento de doações usando a blockchain. O projeto permite que os usuários criem campanhas, visualizem detalhes sobre campanhas existentes e façam retiradas quando atingirem a meta de arrecadação.

## Tecnologias Usadas
- React - Biblioteca JavaScript para construção da interface de usuário.
- Web3.js - Biblioteca para interação com a blockchain Ethereum (ou Binance Smart Chain).
- Bootstrap - Framework CSS para layout e design responsivo.

## Requisitos
Antes de começar, você precisa ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (versão 14 ou superior) - Instale o Node.js
- [npm (gerenciador de pacotes do Node.js)](https://www.npmjs.com/) - Instalado junto com o Node.js.
- [Metamask](https://metamask.io/)

## Instalação
Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
```bash
git clone git@github.com:ejrgeek/doa-chain.git
cd doa-chain/frontend/dapp-doa-chain/
```

2. **Instale as dependências:** Execute o comando abaixo para instalar as dependências do projeto:
```bash
npm install
```
3. **Configure variáveis de ambiente:** Crie um arquivo ```.env``` na raiz do projeto com as seguintes variáveis de ambiente:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=<contract_address_here>
```
4. **Execute o projeto:** Agora, você pode rodar o projeto localmente com o comando:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## Funcionalidades:
1. Criar Campanha

O usuário pode criar uma nova campanha, preenchendo os seguintes campos:

- Nome do autor
- Título da campanha
- Descrição
- URL do vídeo
- URL da imagem
- Meta de arrecadação (em TBNB)
- Data de término (em dias a partir da data atual)

2. Buscar Campanha

Os usuários podem buscar campanhas informando um Campaign Id único, que será utilizado para recuperar informações sobre a campanha da blockchain. O sistema exibe informações detalhadas da campanha, como título, autor, descrição, data de criação, data de término e o valor arrecadado até o momento.

3. Doação

Após verificar as informações da campanha, os usuários podem fazer uma doação informando o valor em TBNB. O valor da doação é enviado para o contrato inteligente da campanha na blockchain, apoiando o autor da campanha.

4. Verificar se pode Sacar e Sacar

O sistema verifica se a campanha atingiu a meta de arrecadação + taxa de plataforma, permitindo ou não o saque do valor arrecadado.

Caso a campanha tenha atingido a meta de arrecadação e a taxa, o usuário pode solicitar o saque dos fundos diretamente para sua carteira.

5. Feedback ao Usuário

O sistema exibe mensagens sobre o status da doação, incluindo:

- Mensagem de sucesso após a doação ser enviada.
- Mensagens de erro caso algo dê errado durante a transação.


6. Componentes

- CampaignCard: Responsável pela montagem visual das campanhas na listagem
- HeadNext: Responsável por adicionar metadados e título da página.
- Header: Componente que exibe a barra de navegação no topo da página.
- Footer: Exibe o rodapé com informações adicionais.


7. Formatadores

- ethFormatter: Formata os valores de TBNB para uma representação legível.
- dateFormatter: Formata as datas para o formato legível.

## Como Contribuir

- Fork o repositório.
- Crie uma branch para a sua feature (git checkout -b feature/nome-da-feature).
- Faça suas alterações e commit (git commit -am 'Adiciona nova feature').
- Push para sua branch (git push origin feature/nome-da-feature).
- Envie um Pull Request.


## Saiba Mais

Para saber mais sobre Next.js, dê uma olhada nos seguintes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - aprenda sobre os recursos e a API do Next.js.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - um tutorial interativo do Next.js.

Você pode conferir [o repositório Next.js no GitHub](https://github.com/vercel/next.js) - seus comentários e contribuições são bem-vindos!

## Implantar no Vercel

A maneira mais fácil de implementar seu aplicativo Next.js é usar a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de implementação do Next.js](https://nextjs.org/docs/pages/building-your-application/deploying) para mais detalhes.
