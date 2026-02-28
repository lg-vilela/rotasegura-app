# Backend Integration Checklist - RotaSegura

Este documento detalha o que é necessário para transformar o MVP atual (baseado em dados simulados) em um aplicativo conectado a um serviço real.

## 1. Infraestrutura de Comunicação
- [x] **Criação de Services**: Centralizado em `src/services/api.js`.
- [ ] **Configuração de Ambiente**: Criar um arquivo `.env` para armazenar a `API_BASE_URL`.
- [ ] **Cliente API**: Instalar e configurar o `axios`.

## 2. Autenticação e Usuário
- [x] **Estrutura de Perfil**: Telas prontas para receber dados dinâmicos.
- [ ] **Fluxo de Login Real**: Integrar com `/auth/login`.
- [ ] **Persistência de Token**: Salvar no `AsyncStorage`.

## 3. Mapas e Incidentes
- [ ] **Fetch de Incidentes**: Substituir `mockIncidents` na `HomeMap` por uma chamada `GET /incidents` filtrada pela região visível.
- [ ] **Envio de Reportes**: Implementar o envio real no `handleSendReport` (`POST /incidents`).
- [ ] **Paradas de Transporte**: Buscar paradas reais via API ou integração com serviços externos (como Google Transit).

## 4. Alertas e Notificações
- [ ] **Lista de Alertas**: Conectar a tela de `Alertas` ao endpoint `GET /alerts`.
- [ ] **Push Notifications**: Configurar Firebase Cloud Messaging (FCM) ou Expo Notifications para alertas de segurança em tempo real.

## 5. Emergência e SOS
- [ ] **Compartilhamento de Localização**: No botão "Conteúdo de Localização", implementar o streaming das coordenadas (`Location.watchPositionAsync`) para o backend via WebSockets ou polling frequente.
- [ ] **Contatos de Emergência**: CRUD para salvar contatos de segurança no banco de dados.

## Resumo Técnico (Endpoints Necessários)
| Funcionalidade | Método | Endpoint |
| :--- | :--- | :--- |
| Login | POST | `/api/v1/auth/login` |
| Lista de Incidentes | GET | `/api/v1/incidents?lat=&lng=&radius=` |
| Criar Incidente | POST | `/api/v1/incidents` |
| Perfil do Usuário | GET | `/api/v1/user/profile` |
| Enviar SOS | POST | `/api/v1/emergency/sos` |
