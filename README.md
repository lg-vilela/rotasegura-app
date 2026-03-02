# SERVIÇO NACIONAL DE APRENDIZAGEM COMERCIAL – SENAC
## Curso de Tecnologia em Análise e Desenvolvimento de Sistemas

**PROJETO INTEGRADOR:** Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseados na Web

### Integrantes do Grupo
* Bernardo Ribeiro Coelho
* Jhonattan Gomes Batista
* Lucas Gabriel Costa Vilela
* Lucas Marinho Zeferino
* Maria Clara dos Santos Pires
* Paola Ribeiro de Andrade
* Vivian Barbosa Pinheiro

**Orientadores:** Gustavo Moreira Calixto e Édson Ceroni  
**Semestre:** 4º Semestre  
**Modalidade:** EAD - Ensino à Distância - 2026

## Projeto RotaSegura

### 1. Visão Geral da Solução
O transporte público brasileiro enfrenta desafios críticos de infraestrutura, superlotação e falta de acessibilidade, tornando a mobilidade urbana uma questão social urgente (EDENRED, 2025). As principais queixas dos usuários concentram-se na precariedade dos veículos, atrasos constantes e falta de segurança (RODRIGUES, 2022; 2023), evidenciando a necessidade de ferramentas que deem voz ativa à população.

### 2. Contextualização e Motivação
A solução proposta é um aplicativo focado na avaliação da qualidade do serviço em tempo real, preenchendo uma lacuna deixada por plataformas como Google Maps® e Moovit®, que priorizam apenas rotas e horários. O diferencial reside no monitoramento detalhado de itens como limpeza, conservação e conforto, permitindo que o usuário atue como um fiscalizador direto do transporte utilizado.

### 3. Visão do Produto
O objetivo central é transformar a insatisfação individual em dados estruturados e acionáveis para órgãos reguladores e mídia, promovendo o engajamento cívico. Ao focar no *crowdsourcing* de dados de infraestrutura, o produto empodera as classes dependentes do sistema, gerando informações precisas para exigir investimentos e melhorias concretas na mobilidade urbana.


### 4. Prova de Conceito (PoC)

A viabilidade técnica e o modelo de engajamento do projeto serão validados através do **Módulo de Auditoria Cidadã**. O objetivo é testar o fluxo principal de coleta e exibição de dados de infraestrutura em tempo real.

#### 4.1 Objetivos e Testes
* **Interface e UX:** Validar se o formulário de avaliação é intuitivo para o usuário em ambiente de movimento.
* **Processamento de Dados:** Demonstrar a capacidade de transformar avaliações individuais em um *score* de qualidade atualizado instantaneamente.
* **Visualização de Feedback:** Garantir que o passageiro consiga visualizar o resumo das condições reais da linha antes do embarque.

#### 4.2 Escopo da Execução
A PoC consistirá em um protótipo funcional contendo:
* **Seleção de Linha:** Identificação específica do veículo ou trajeto.
* **Módulo de Checklist:** Interface rápida com ícones (Bom/Regular/Ruim) para reporte de infraestrutura.
* **Painel de Resultados:** Exibição da média das avaliações das últimas 2 horas, gerando o **"Índice de Conservação"**.
* **Critério de Sucesso:** O sistema deve ser capaz de processar múltiplas avaliações simultâneas e atualizar o índice da linha em tempo real, provando a utilidade do *crowdsourcing* para a comunidade.

### 🛠️ 5. Stack Tecnológica Sugerida
* **Prototipagem (UI/UX):** Figma®.
* **Desenvolvimento Mobile:** Flutter® ou React Native®.
* **Backend e Banco de Dados:** Firebase® (Cloud Firestore® para dados em tempo real).
* **Mapas:** Google Maps SDK®.

## 📚 Referências

* **EDENRED, Gestão de Mobilidade. **Transporte público no Brasil e realidade da jornada casa para o trabalho**. 2025. Disponível em: [Blog Edenred](https://blog.edenredmobilidade.com.br/gestao-mobilidade/transporte-publico-no-brasil/#:~:text=Uma%20pesquisa%20divulgada%20pela%20TVT%20News%20tamb%C3%A9m,atrasos%20constantes%20e%20inseguran%C3%A7a%20como%20principais%20queixas). Acesso em: 28 nov. 2025.

* **RODRIGUES, A. S. **A crise da mobilidade e a infraestrutura do transporte público nas metrópoles brasileiras**. Revista Brasileira de Planejamento Urbano, v. 12, n. 2, p. 45-67, 2022.

* **RODRIGUES, A. S. **Transporte e desigualdade: o impacto da má conservação na rotina do trabalhador**. 2. ed. Rio de Janeiro: Editora Acadêmica, 2023.
