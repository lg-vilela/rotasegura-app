# Documento de Entrega Técnica (Backend Handover) - RotaSegura

Este documento serve como guia para o desenvolvedor de backend integrar os serviços reais ao frontend do RotaSegura. O aplicativo já foi preparado arquiteturalmente para essa transição.

## 1. Arquitetura de Integração
Toda a lógica de comunicação com dados está centralizada em:
`src/services/api.js`

As telas **não** fazem chamadas diretas ou possuem dados fixos. Elas consomem os métodos do objeto `api`.

## 2. Contrato de API Esperado (Endpoints)

Baseado nos mocks atuais, os seguintes endpoints são necessários:

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Incidentes** | GET | `/incidents` | Retorna lista de ocorrências próximas. |
| **Alertas** | GET | `/alerts` | Alertas criticos/avisos recentes. |
| **Perfil** | GET | `/user/profile` | Dados do usuário logado (XP, Nível). |
| **Histórico** | GET | `/user/history` | Log de contribuições do usuário. |
| **Linhas** | GET | `/lines?type=` | Listagem de linhas de Trem/Metrô. |
| **Itinerário** | GET | `/lines/:id/itinerary` | Pontos de uma linha específica. |
| **Reportar** | POST | `/reports` | Envio de novo feedback/reporte. |

## 3. Passo a Passo para o Backend
1.  **Configurar URL Base**: Adicionar a URL do servidor em um arquivo `.env` ou constante global.
2.  **Substituir Delays**: No `api.js`, substituir a função `delay()` e os `MOCK_DATA` por chamadas reais usando `fetch` ou `axios`.
3.  **Tratamento de Erros**: O frontend já espera que as funções da `api` sejam assíncronas e tratem erros (usamos `try/catch` nas telas).
4.  **Autenticação**: Configurar o envio do Token JWT nos headers das requisições via interceptor.

## 4. Persistência Local
O app já utiliza `AsyncStorage` para:
- Preferência de Tema (Claro/Escuro/Sistema).
- Locais Salvos (Casa, Trabalho, etc).

---
**Status Atual**: Frontend 100% desacoplado e pronto para conexão via `src/services/api.js`.
