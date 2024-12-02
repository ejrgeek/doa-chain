# Smart Contract - DoaChain

[English Version](README.md)

DoaChain é um **smart contract** para uma plataforma de doações, 
projetada para atender diversas necessidades de arrecadação, 
como campanhas de ONGs, crowdfunding individual e emergencial.

## Recursos do Contrato

### 1. Criação de Campanhas
- Validações automáticas para garantir a qualidade e integridade das campanhas:
  - Nome do autor, título, descrição e metas financeiras.
  - Data de término calculada com base nos parâmetros fornecidos.
- IDs gerados automaticamente via `keccak256`.

### 2. Doações
- Qualquer usuário pode doar ETH para campanhas ativas.
- Doações registradas no contrato com detalhes:
  - **ID da campanha**, **carteira do doador**, **valor doado** e **timestamp**.

### 3. Saques
- Criadores de campanhas podem sacar os valores arrecadados caso:
  - A meta financeira seja atingida.
  - Todas as condições de validação sejam cumpridas.
- Uma taxa fixa (`campaignFee`) é cobrada pela plataforma e transferida ao criador do contrato, possível alteração no futuro.

### 4. Retorno de Doações
- Se a campanha não atingir a meta financeira até a data de término, os valores doados podem ser devolvidos automaticamente aos doadores.

### 5. Monitoramento Automático de Campanhas
- O contrato verifica e atualiza automaticamente o status das campanhas com base na data de término.

### 6. Listagem e Consulta
- Funções para:
  - Consultar campanhas por ID.
  - Consultar campanhas por Carteira do Criado.
  - Listar todas as campanhas existentes.
  - Retornar IDs de campanhas registradas.

---

## Medidas de Segurança

- **Validações em Múltiplas Funções**: Garantem que apenas usuários autorizados ou com permissões específicas possam realizar ações importantes.
- **Proteção contra Reentrancy**: Embora a proteção não esteja explícita, as funções críticas utilizam abordagens que reduzem esse risco. **(Sujeito à análise futura)**.
- **Controle de Fluxo**: Restrições claras para saques, devoluções e interações com campanhas inativas ou finalizadas.

---

## Implantação

### Rede de Deploy
Atualmente, a DoaChain está configurada para ser utilizada em um nó local, com deploy planejado em uma **testnet** Ethereum no futuro.

### Requisitos de Deploy Local
- **Truffle** para compilação e deploy.
- **Foundry** para testes e simulação em um ambiente local.

---

## Uso do Contrato

### Criação de Campanhas
Usuários podem criar campanhas com os seguintes parâmetros:
- Nome do autor.
- Título e descrição.
- URL de vídeo e imagem relacionados à campanha.
- Meta financeira e duração em dias.

### Doações
- Os doadores podem enviar ETH para qualquer campanha ativa.
- O valor mínimo para doação está definido no contrato. **[Ver código para detalhes](contracts/DoaChain.sol)**.

### Saques e Retornos
- Criadores podem sacar fundos caso atinjam a meta.
- Doações são devolvidas automaticamente caso a campanha não atinja a meta até a data de término.

---

## Plano de Testes para DoaChain

### 🧪 Testes Estruturados

Os testes cobrirão os seguintes cenários:

1. Criação de Campanhas:
    - Verificar se uma campanha é criada corretamente com os dados fornecidos.
    - Testar as validações (ex.: título curto, objetivo menor que 0, etc.).

2. Doações
    - Garantir que as doações sejam adicionadas ao total arrecadado.
    - Testar o saldo mínimo para doação.
    - Confirmar que doações para campanhas inativas sejam rejeitadas.

3. Saque de Fundos
    - Testar se o criador da campanha pode sacar quando a meta é atingida.
    - Verificar se o valor restante é transferido corretamente para o criador e o administrador.

4. Validações de Estado
    - Verificar se campanhas inativas ou expiradas são corretamente identificadas.
    - Testar a lógica de reembolso no caso de campanhas que não atingiram a meta.

5. Testes de Segurança
    - Garantir que usuários mal-intencionados não possam:
        - Criar campanhas inválidas.
        - Fazer saques indevidos.
        - Manipular valores fora das restrições.

6. Configurar Auditoria:
    - Usar ferramentas como [MythX](https://mythx.io/) ou [Slither](https://github.com/crytic/slither) para auditoria automatizada do contrato.
---

## Créditos

- **Ferramentas utilizadas**:
  - [Solidity](https://soliditylang.org/)
  - [Truffle](https://trufflesuite.com/)
  - [Foundry](https://getfoundry.sh/)
- Desenvolvedor: *Erlon Dantas da Nobrega Junior*

