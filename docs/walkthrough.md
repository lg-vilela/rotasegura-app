# Walkthrough Completo do Projeto: RotaSegura 🛡️

Este documento fornece uma visão técnica e funcional detalhada de toda a arquitetura desenvolvida para o **RotaSegura**, um MVP de plataforma colaborativa de monitoramento de transporte público.

---

## 1. Visão Geral da Arquitetura

O projeto foi construído utilizando **React Native** com **Expo**, adotando o padrão de roteamento baseado em arquivos do **Expo Router**. A interface foi projetada para ser moderna, responsiva e com um foco agressivo em estética *Dark Mode*.

### Estrutura de Diretórios
- **/app**: Contém a estrutura de navegação e as rotas da aplicação (Expo Router).
- **/src**: Onde reside toda a lógica de negócio e componentes reutilizáveis.
  - **/components**: Componentes de UI modulares e independentes.
  - **/constants**: Arquivos de configuração global (Cores, Estilo do Mapa).
  - **/context**: Provedores de estado global (Tema).
  - **/hooks**: Hooks customizados para abstração de lógica.
  - **/screens**: Implementações detalhadas das telas principais.
  - **/services**: Camada de dados e integração com API.

---

## 2. Navegação e Entrada (App Shell)

### Root Layout (`app/_layout.tsx`)
O arquivo raiz configura os provedores globais:
1. **GestureHandlerRootView**: Necessário para interações de gestos (como o `BottomSheet`).
2. **ThemeProvider**: Gerencia o esquema de cores (Dark/Light).
3. **Onboarding**: Controla se o usuário deve ver a tela de introdução inicial (salvo no `AsyncStorage`).

### Tab Navigation (`app/(tabs)/_layout.tsx`)
Utilizamos uma barra de navegação inferior com 5 abas principais:
- **Explorar**: O mapa central do app.
- **Salvos**: Locais favoritos do usuário.
- **Emergência (Central)**: Um botão de destaque para acesso rápido em situações críticas.
- **Perfil**: Gerenciamento de conta e estatísticas.
- **Alertas**: Lista cronológica de incidentes próximos.

---

## 3. O Core do Mapa (`src/screens/HomeMap.js`)

A tela central é a integração mais complexa do projeto:
- **Google Maps Personalizado**: Utiliza o `react-native-maps` com um estilo "Ultra-Dark" definido em `/src/constants/mapStyle.js`.
- **Filtros Dinâmicos**: `FilterChips` permitem filtrar incidentes por categoria (Perigo, Atrasos, Rotas Seguras).
- **Interatividade**:
  - Clique em incidentes para ver detalhes.
  - Clique em paradas de ônibus/metrô para abrir o `TransitSheet`.
  - **Pesquisa**: Barra de busca integrada para simulação de rotas.

---

## 4. Gerenciamento de Dados (`src/services/api.js`)

Toda a comunicação com dados foi centralizada neste serviço:
- **Mock Data**: Contém simulações realistas de incidentes, linhas de transporte e histórico de usuário.
- **AsyncStorage**: Utilizado para persistir locais salvos e configurações de tema diretamente no dispositivo.
- **Preparado para Backend**: A estrutura já utiliza funções assíncronas e simulação de delay de rede, facilitando a substituição por chamadas `fetch` reais quando o backend for integrado.

---

## 5. UI e UX Design

### Sistema de Cores (`src/constants/colors.js`)
Padronizamos uma paleta de cores vibrantes sobre um fundo azul-petróleo profundo:
- `primary`: Blue (#2563EB)
- `critical`: Red (#EF4444)
- `alert`: Amber (#FBBF24)
- `success`: Green (#22C55E)

### Componentes de Destaque
- **SOSModal**: Um modal intuitivo com botões de chamada rápida (190, 192) e compartilhamento de localização.
- **TransitCarousel**: Exibe as linhas disponíveis na estação mais próxima em um formato de cartões deslizantes.
- **Skeleton**: Usado para transições suaves de carregamento (Shimmer Effect) nas telas de Alertas e Perfil.

---

## 6. Documentação Complementar

Para detalhes específicos de desenvolvimento, consulte os outros planos gerados em `/docs`.

---

Este projeto foi otimizado para ser leve, rápido e profissional, servindo como uma fundação sólida para o crescimento do **RotaSegura**.
