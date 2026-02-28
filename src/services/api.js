import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../constants/colors';

// Simulação de delay de rede
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_INCIDENTS = [
    { id: 1, type: 'Avaria', lat: -23.5505, lng: -46.6333, title: 'Trem Parado', desc: 'Falha técnica na Linha 1-Azul' },
    { id: 2, type: 'Lotação', lat: -23.5489, lng: -46.6388, title: 'Supervotação', desc: 'Estação Sé com acesso restringido' },
    { id: 3, type: 'Segurança', lat: -23.5550, lng: -46.6350, title: 'Assalto Relampago', desc: 'Ocorrência próxima à saída A' },
    { id: 4, type: 'Avaria', lat: -23.5450, lng: -46.6310, title: 'Semáforo Quebrado', desc: 'Cruzamento com Av. Paulista' },
    { id: 5, type: 'Lotação', lat: -23.5611, lng: -46.6558, title: 'Ônibus Cheio', desc: 'Linha 875P-10' },
    { id: 6, type: 'Segurança', lat: -23.5520, lng: -46.6400, title: 'Vandalismo', desc: 'Ponto de ônibus depredado' },
    { id: 8, type: 'Seguro', lat: -23.5420, lng: -46.6200, title: 'Caminho Seguro', desc: 'Rotas bem movimentadas e claras' },
];

const MOCK_STOPS = [
    { id: 's1', type: 'bus', lat: -23.5515, lng: -46.6350, name: 'Parada Sé - Direita' },
    { id: 's2', type: 'subway', lat: -23.5505, lng: -46.6333, name: 'Estação Sé' },
    { id: 's3', type: 'bus', lat: -23.5600, lng: -46.6580, name: 'Parada MASP' },
    { id: 's4', type: 'bus', lat: -23.5620, lng: -46.6540, name: 'Parada Gazeta' },
];

const MOCK_ALERTS = [
    {
        id: 1,
        type: 'critical',
        category: 'Segurança',
        title: 'Assalto Recente - Ponto 12',
        desc: 'Relato de atividade suspeita próximo à entrada do metrô. Evite a área se possível.',
        icon: 'shield-alert',
        time: 'há 2 min'
    },
    {
        id: 2,
        type: 'warning',
        category: 'Lotação',
        title: 'Lotação Alta - Linha 404',
        desc: 'Ônibus operando com capacidade máxima. Previsão de espera de 15 minutos.',
        icon: 'account-group',
        time: 'há 5 min'
    }
];

const MOCK_USER = {
    name: 'Usuário',
    email: 'usuario@email.com',
    phone: '(11) 98765-4321',
    level: 12,
    xp: 2840,
    maxXp: 5000,
};

const MOCK_HISTORY = [
    {
        id: 1,
        title: 'Lotação – Linha 404',
        location: 'Av. Paulista, 1500',
        time: 'Há 2 horas',
        status: 'Ativo',
        icon: 'account-group',
        color: COLORS.primary,
        likes: 12,
        views: 45
    },
    {
        id: 2,
        title: 'Atraso – Linha 875A',
        location: 'Term. Perdizes',
        time: 'Ontem, 18:30',
        status: 'Resolvido',
        icon: 'bus-clock',
        color: COLORS.alert,
        likes: 8,
        verified: true
    }
];

const MOCK_METRO_LINES = [
    { id: 'l1', name: 'Linha 1 - Azul', color: '#005599' },
    { id: 'l2', name: 'Linha 2 - Verde', color: '#007C5F' },
    { id: 'l3', name: 'Linha 3 - Vermelha', color: '#EF4123' },
    { id: 'l4', name: 'Linha 4 - Amarela', color: '#FFF000' },
    { id: 'l5', name: 'Linha 5 - Lilás', color: '#9B3894' },
    { id: 'l15', name: 'Linha 15 - Prata', color: '#9E9E9E' },
];

const MOCK_TREM_LINES = [
    { id: 'l7', name: 'Linha 7 - Rubi', color: '#A61324' },
    { id: 'l8', name: 'Linha 8 - Diamante', color: '#999A9E' },
    { id: 'l9', name: 'Linha 9 - Esmeralda', color: '#00A78E' },
    { id: 'l10', name: 'Linha 10 - Turquesa', color: '#0082A0' },
    { id: 'l11', name: 'Linha 11 - Coral', color: '#E87D1C' },
    { id: 'l12', name: 'Linha 12 - Safira', color: '#034888' },
    { id: 'l13', name: 'Linha 13 - Jade', color: '#33BCAD' },
];

const MOCK_ITINERARY = [
    { id: '1', name: 'Terminal Lapa', time: 'Passou', status: 'past' },
    { id: '2', name: 'Rua Clélia', time: 'Passou', status: 'past' },
    { id: '3', name: 'Sesc Pompéia', time: 'Agora', status: 'current' },
    { id: '4', name: 'Metrô Sumaré', time: '4 min', status: 'future' },
    { id: '5', name: 'Av. Paulista (MASP)', time: '10 min', status: 'future' },
    { id: '6', name: 'Metrô Ana Rosa', time: '15 min', status: 'future' },
];

export const api = {
    getIncidents: async () => {
        await delay(800);
        return MOCK_INCIDENTS;
    },
    getStops: async () => {
        await delay(500);
        return MOCK_STOPS;
    },
    getAlerts: async () => {
        await delay(1500);
        return MOCK_ALERTS;
    },
    getUserProfile: async () => {
        await delay(1000);
        return MOCK_USER;
    },
    getHistory: async () => {
        await delay(1200);
        return MOCK_HISTORY;
    },
    getLineItinerary: async (lineId) => {
        await delay(800);
        return MOCK_ITINERARY;
    },
    getTransportLines: async (type) => {
        await delay(300);
        return type === 'metro' ? MOCK_METRO_LINES : MOCK_TREM_LINES;
    },
    sendReport: async (reportData) => {
        await delay(2000);
        return { success: true, id: Math.random().toString(36).substr(2, 9) };
    },
    // Saved Places Logic
    getSavedPlaces: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@rotasegura_saved_places');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            throw e;
        }
    },
    saveSavedPlaces: async (places) => {
        try {
            const jsonValue = JSON.stringify(places);
            await AsyncStorage.setItem('@rotasegura_saved_places', jsonValue);
            return true;
        } catch (e) {
            throw e;
        }
    }
};

export default api;
