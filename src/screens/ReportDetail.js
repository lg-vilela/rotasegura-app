import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';
import api from '../services/api';

const ReportDetail = ({ type, onBack, onSend }) => {
    // 1. Estados Consolidados
    const [transportType, setTransportType] = useState('bus'); // 'bus', 'train', 'metro'
    const [line, setLine] = useState('');
    const [prefix, setPrefix] = useState('');
    const [selectedOption, setSelectedOption] = useState(null); // Para categorias de seleção única
    const [selectedOptions, setSelectedOptions] = useState([]); // Para categorias de seleção múltipla
    const [driverDidntStop, setDriverDidntStop] = useState(false);
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isLinePickerVisible, setIsLinePickerVisible] = useState(false);
    const [availableLines, setAvailableLines] = useState([]);

    React.useEffect(() => {
        if (transportType !== 'bus') {
            api.getTransportLines(transportType).then(setAvailableLines);
        }
    }, [transportType]);

    // Configurações das Categorias
    const categoryConfig = {
        'crowd': {
            title: 'Lotação',
            icon: 'account-group',
            color: COLORS.primary,
            multiSelect: false,
            options: [
                { id: 'vazio', label: 'Vazio', icon: 'account-outline' },
                { id: 'cheio', label: 'Cheio (em pé)', icon: 'account-group-outline' },
                { id: 'lotado', label: 'Superlotado', icon: 'account-multiple-remove-outline', critical: true },
            ]
        },
        'breakdown': {
            title: 'Avaria',
            icon: 'bus-alert',
            color: COLORS.alert,
            multiSelect: true,
            options: [
                { id: 'seat', label: 'Assento Quebrado', icon: 'seat-recline-extra' },
                { id: 'dirt', label: 'Sujeira Extrema', icon: 'trash-can-outline' },
                { id: 'mechanical', label: 'Problema Mecânico', icon: 'engine-off-outline', critical: true },
                { id: 'access', label: 'Acessibilidade Ruim', icon: 'wheelchair-accessibility' },
            ]
        },
        'ac': {
            title: 'Ar / Clima',
            icon: 'air-conditioner',
            color: COLORS.success,
            multiSelect: false,
            options: [
                { id: 'hot', label: 'Muito Quente / Sem Ar', icon: 'thermometer-plus', critical: true },
                { id: 'cold', label: 'Muito Frio', icon: 'thermometer-minus' },
                { id: 'dripping', label: 'Ar pingando água', icon: 'water-alert' },
                { id: 'no_vent', label: 'Janelas travadas', icon: 'window-closed-variant' },
            ]
        },
        'security': {
            title: 'Segurança',
            icon: 'shield-alert',
            color: '#EF4444', // Vermelho custom para segurança
            multiSelect: true,
            options: [
                { id: 'robbery', label: 'Assalto / Furto', icon: 'hand-back-right-off', critical: true },
                { id: 'harassment', label: 'Assédio', icon: 'account-alert-outline', critical: true },
                { id: 'vandalism', label: 'Vandalismo', icon: 'format-paint', critical: true },
                { id: 'dark_stop', label: 'Ponto deserto/escuro', icon: 'lightbulb-off-outline' },
            ]
        },
    };

    const config = categoryConfig[type] || categoryConfig['crowd'];

    // Utils
    const toggleOption = (id) => {
        if (config.multiSelect) {
            setSelectedOptions(prev =>
                prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            );
        } else {
            setSelectedOption(id);
        }
    };

    const isSelected = (id) => config.multiSelect ? selectedOptions.includes(id) : selectedOption === id;

    const isFormValid = line.trim().length > 0 && (selectedOption || selectedOptions.length > 0);

    const handleSend = () => {
        const data = {
            type,
            transportType,
            line,
            prefix: transportType === 'bus' ? prefix : null,
            options: config.multiSelect ? selectedOptions : [selectedOption],
            driverDidntStop: transportType === 'bus' ? driverDidntStop : false,
            description,
            isAnonymous
        };
        onSend(data);
    };

    const renderLinePicker = () => {
        const lines = availableLines;
        return (
            <Modal visible={isLinePickerVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Selecione a Linha</Text>
                            <TouchableOpacity onPress={() => setIsLinePickerVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={lines}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.lineItem}
                                    onPress={() => {
                                        setLine(item.name);
                                        setIsLinePickerVisible(false);
                                    }}
                                >
                                    <View style={[styles.lineBadge, { backgroundColor: item.color }]} />
                                    <Text style={styles.lineText}>{item.name}</Text>
                                    {line === item.name && (
                                        <MaterialCommunityIcons name="check" size={20} color={COLORS.primary} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.white} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerSubtitle}>Reportar</Text>
                    <Text style={styles.headerTitle}>{config.title}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* SELEÇÃO DE MODAL */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>TIPO DE TRANSPORTE</Text>
                    <View style={styles.transportRow}>
                        {[
                            { id: 'bus', label: 'Ônibus', icon: 'bus' },
                            { id: 'train', label: 'Trem', icon: 'train' },
                            { id: 'metro', label: 'Metrô', icon: 'subway' },
                        ].map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.transportChip,
                                    transportType === item.id && styles.transportChipActive
                                ]}
                                onPress={() => {
                                    setTransportType(item.id);
                                    setLine('');
                                    setPrefix('');
                                }}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={20}
                                    color={transportType === item.id ? '#FFF' : '#94a3b8'}
                                />
                                <Text style={[
                                    styles.transportChipLabel,
                                    transportType === item.id && styles.transportChipLabelActive
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* 1. CABEÇALHO PADRÃO (CONDICIONAL) */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>DADOS DO VEÍCULO</Text>
                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1.5, marginRight: transportType === 'bus' ? 10 : 0 }]}>
                            <Text style={styles.inputLabel}>Linha *</Text>
                            {transportType === 'bus' ? (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Ex: 856R"
                                    placeholderTextColor="#64748b"
                                    value={line}
                                    onChangeText={setLine}
                                />
                            ) : (
                                <TouchableOpacity
                                    style={styles.pickerTrigger}
                                    onPress={() => setIsLinePickerVisible(true)}
                                >
                                    <Text style={[styles.pickerText, !line && { color: '#64748b' }]}>
                                        {line || 'Selecione a linha...'}
                                    </Text>
                                    <MaterialCommunityIcons name="chevron-down" size={20} color="#64748b" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {transportType === 'bus' && (
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.inputLabel}>Prefixo</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Opcional"
                                    placeholderTextColor="#64748b"
                                    value={prefix}
                                    onChangeText={setPrefix}
                                    keyboardType="numeric"
                                />
                            </View>
                        )}
                    </View>
                </View>

                {/* 2. OPÇÕES ESPECÍFICAS */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>O QUE ESTÁ ACONTECENDO?</Text>
                    <View style={styles.chipsContainer}>
                        {config.options.map((opt) => (
                            <TouchableOpacity
                                key={opt.id}
                                style={[
                                    styles.chip,
                                    isSelected(opt.id) && { borderColor: config.color, backgroundColor: config.color + '15' }
                                ]}
                                onPress={() => toggleOption(opt.id)}
                                activeOpacity={0.7}
                            >
                                <MaterialCommunityIcons
                                    name={opt.icon}
                                    size={20}
                                    color={isSelected(opt.id) ? config.color : '#94a3b8'}
                                />
                                <Text style={[
                                    styles.chipLabel,
                                    isSelected(opt.id) && { color: config.color, fontWeight: '700' }
                                ]}>
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Extras por categoria */}
                    {type === 'crowd' && transportType === 'bus' && (
                        <TouchableOpacity
                            style={styles.checkboxRow}
                            onPress={() => setDriverDidntStop(!driverDidntStop)}
                        >
                            <MaterialCommunityIcons
                                name={driverDidntStop ? "checkbox-marked" : "checkbox-blank-outline"}
                                size={24}
                                color={driverDidntStop ? config.color : '#64748b'}
                            />
                            <Text style={styles.checkboxLabel}>Motorista não parou no ponto</Text>
                        </TouchableOpacity>
                    )}

                    {type === 'breakdown' && (
                        <TouchableOpacity style={styles.photoButton}>
                            <MaterialCommunityIcons name="camera" size={20} color={config.color} />
                            <Text style={[styles.photoButtonText, { color: config.color }]}>Adicionar Foto da Avaria</Text>
                        </TouchableOpacity>
                    )}

                    {type === 'security' && (
                        <View style={styles.securityWarning}>
                            <MaterialCommunityIcons name="phone-in-talk" size={20} color="#EF4444" />
                            <Text style={styles.securityWarningText}>
                                Em caso de emergência imediata, ligue <Text style={{ fontWeight: 'bold' }}>190</Text>.
                            </Text>
                        </View>
                    )}
                </View>

                {/* 3. RODAPÉ PADRÃO */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>MAIS INFORMAÇÕES</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Descrição (Opcional)"
                        placeholderTextColor="#64748b"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <View style={styles.switchRow}>
                        <View>
                            <Text style={styles.switchTitle}>Reportar anonimamente</Text>
                            <Text style={styles.switchSubtitle}>Seu nome não será exibido no alerta</Text>
                        </View>
                        <Switch
                            value={isAnonymous}
                            onValueChange={setIsAnonymous}
                            trackColor={{ false: '#334155', true: '#22C55E' }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        !isFormValid && styles.disabledButton,
                        isFormValid && { backgroundColor: '#22C55E' }
                    ]}
                    onPress={handleSend}
                    disabled={!isFormValid}
                >
                    <Text style={styles.submitButtonText}>ENVIAR ALERTA</Text>
                </TouchableOpacity>
            </View>

            {renderLinePicker()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.surface,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1E293B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.white,
    },
    scrollContent: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#64748b',
        marginBottom: 15,
        letterSpacing: 1,
    },
    transportRow: {
        flexDirection: 'row',
        backgroundColor: '#1E293B',
        padding: 4,
        borderRadius: 12,
        gap: 4,
    },
    transportChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        gap: 6,
    },
    transportChipActive: {
        backgroundColor: COLORS.primary,
    },
    transportChipLabel: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
    },
    transportChipLabelActive: {
        color: '#FFF',
    },
    row: {
        flexDirection: 'row',
    },
    inputGroup: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 13,
        color: '#94a3b8',
        marginBottom: 8,
        fontWeight: '600',
    },
    textInput: {
        backgroundColor: COLORS.surface,
        height: 52,
        borderRadius: 14,
        paddingHorizontal: 16,
        color: COLORS.white,
        borderWidth: 1.1,
        borderColor: '#334155',
        fontSize: 15,
    },
    pickerTrigger: {
        backgroundColor: COLORS.surface,
        height: 52,
        borderRadius: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.1,
        borderColor: '#334155',
    },
    pickerText: {
        color: COLORS.white,
        fontSize: 15,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#334155',
    },
    chipLabel: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: COLORS.surface,
        padding: 15,
        borderRadius: 14,
    },
    checkboxLabel: {
        color: COLORS.white,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '600',
    },
    photoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 14,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        marginTop: 15,
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    photoButtonText: {
        fontWeight: 'bold',
        marginLeft: 8,
    },
    securityWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
    },
    securityWarningText: {
        color: '#EF4444',
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
    },
    textArea: {
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: 16,
        color: COLORS.white,
        minHeight: 120,
        textAlignVertical: 'top',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        paddingHorizontal: 5,
    },
    switchTitle: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
    },
    switchSubtitle: {
        color: '#64748b',
        fontSize: 12,
    },
    footer: {
        padding: 20,
        backgroundColor: COLORS.background,
    },
    submitButton: {
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#1E293B',
        opacity: 0.5,
    },
    submitButtonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
    },
    modalTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    lineItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1E293B',
    },
    lineBadge: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 15,
    },
    lineText: {
        color: COLORS.white,
        fontSize: 16,
        flex: 1,
    }
});

export default ReportDetail;
