import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import EmptyState from '@/src/components/EmptyState';
import HistoryItem from '@/src/components/HistoryItem';
import ProfileStats from '@/src/components/ProfileStats';
import Skeleton from '@/src/components/Skeleton';
import Toast from '@/src/components/Toast';
import COLORS from '@/src/constants/colors';
import { useTheme } from '@/src/context/ThemeContext';
import api from '@/src/services/api';

export default function PerfilScreen() {
    const { theme, setTheme } = useTheme();
    const toastRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    // Estados para o perfil (agora vindo do "backend")
    const [userInfo, setUserInfo] = useState(null);
    const [history, setHistory] = useState([]);

    const [editData, setEditData] = useState({ name: '', phone: '', email: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const maskPhone = (value) => {
        if (!value) return "";
        let r = value.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 5) {
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            r = r.replace(/^(\d*)/, "($1");
        }
        return r;
    };

    const validateEmail = (mail) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    };

    const isLoginValid = validateEmail(email) && password.length >= 6;
    const isProfileValid = (editData?.name?.length || 0) > 3 &&
        /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(editData?.phone || '');

    const loadProfileData = async () => {
        try {
            const [user, userHistory] = await Promise.all([
                api.getUserProfile(),
                api.getHistory()
            ]);
            setUserInfo(user);
            setEditData({ ...user });
            setHistory(userHistory);
        } catch (error) {
            // Error handled by UI or silent
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            loadProfileData();
        }
    }, [isLoggedIn]);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadProfileData();
        setRefreshing(false);
    };

    const handleSaveProfile = () => {
        if (!isProfileValid) {
            toastRef.current?.show('Verifique os dados informados.', 'error');
            return;
        }

        setUserInfo({ ...editData });
        setIsEditModalVisible(false);
        toastRef.current?.show('Perfil atualizado com sucesso!', 'success');
    };

    const handleLogout = () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair da sua conta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair", onPress: () => {
                        setIsLoggedIn(false);
                        setEmail('');
                        setPassword('');
                        toastRef.current?.show('Você saiu da conta.', 'info');
                    }, style: 'destructive'
                }
            ]
        );
    };

    const handleLogin = () => {
        if (!isLoginValid) return;
        setIsLoggedIn(true);
        // Pequeno delay para o toast aparecer depois da transição de tela
        setTimeout(() => {
            toastRef.current?.show('Bem-vindo de volta!', 'success');
        }, 500);
    };


    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loginContainer}>
                    <View style={styles.loginHeader}>
                        <View style={styles.logoIcon}>
                            <Image
                                source={require('@/assets/images/logo.png')}
                                style={{ width: 60, height: 60 }}
                                contentFit="contain"
                            />
                        </View>
                        <Text style={styles.loginTitle}>Bem-vindo ao RotaSegura</Text>
                        <Text style={styles.loginSubtitle}>Faça login para colaborar e ganhar pontos na comunidade.</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>E-mail</Text>
                            <TextInput
                                style={[styles.input, email.length > 0 && !validateEmail(email) && { borderColor: COLORS.critical }]}
                                placeholder="seu@email.com"
                                placeholderTextColor={COLORS.textSecondary}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            {email.length > 0 && !validateEmail(email) && (
                                <Text style={styles.errorText}>E-mail inválido</Text>
                            )}
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Senha</Text>
                            <TextInput
                                style={[styles.input, password.length > 0 && password.length < 6 && { borderColor: COLORS.critical }]}
                                placeholder="Mínimo 6 caracteres"
                                placeholderTextColor={COLORS.textSecondary}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                            {password.length > 0 && password.length < 6 && (
                                <Text style={styles.errorText}>A senha deve ter pelo menos 6 caracteres</Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[styles.loginButton, !isLoginValid && styles.disabledButton]}
                            onPress={handleLogin}
                            disabled={!isLoginValid}
                        >
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.registerButton}>
                            <Text style={styles.registerButtonText}>Não tem conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
                }
            >
                {/* Top Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <MaterialCommunityIcons name="logout" size={24} color={COLORS.critical} />
                    </TouchableOpacity>
                </View>

                {/* User Info Section */}
                {!userInfo ? (
                    <View style={{ padding: 40, alignItems: 'center' }}>
                        <Skeleton width={100} height={100} borderRadius={50} />
                        <Skeleton width={200} height={20} marginTop={20} />
                        <Skeleton width={150} height={15} marginTop={10} />
                    </View>
                ) : (
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarMain}>
                                <MaterialCommunityIcons name="account" size={60} color={COLORS.textSecondary} />
                            </View>
                            <View style={styles.levelBadge}>
                                <Text style={styles.levelText}>{userInfo.level}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.editBadge}
                                onPress={() => {
                                    setEditData({ ...userInfo });
                                    setIsEditModalVisible(true);
                                }}
                            >
                                <MaterialCommunityIcons name="pencil" size={14} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.userName}>{userInfo.name || 'Usuário'}</Text>

                        {/* XP Progress Bar */}
                        <View style={styles.xpContainer}>
                            <View style={styles.xpHeader}>
                                <Text style={styles.xpLabel}>Nível de Contribuição</Text>
                                <Text style={styles.xpValue}>{userInfo.xp} / {userInfo.maxXp} XP</Text>
                            </View>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${(userInfo.xp / userInfo.maxXp) * 100}%` }]} />
                            </View>
                        </View>
                    </View>
                )}

                {/* Stats Grid */}
                <ProfileStats reportes="24" validacoes="56" impacto="1.2k" />

                {/* Achievements Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderTitle}>
                        <MaterialCommunityIcons name="trophy" size={22} color={COLORS.alert} />
                        <Text style={styles.sectionTitleText}>Conquistas</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsList}>
                        <View style={styles.achievementItem}>
                            <View style={[styles.achievementIcon, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
                                <MaterialCommunityIcons name="shield-check" size={24} color={COLORS.success} />
                            </View>
                            <Text style={styles.achievementLabel}>Pioneiro</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <View style={[styles.achievementIcon, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
                                <MaterialCommunityIcons name="eye" size={24} color={COLORS.primary} />
                            </View>
                            <Text style={styles.achievementLabel}>Observador</Text>
                        </View>
                        <View style={styles.achievementItem}>
                            <View style={[styles.achievementIcon, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                                <MaterialCommunityIcons name="fire" size={24} color={COLORS.critical} />
                            </View>
                            <Text style={styles.achievementLabel}>Ativo</Text>
                        </View>
                    </ScrollView>
                </View>

                {/* Preferences Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderTitle}>
                        <MaterialCommunityIcons name="palette-outline" size={22} color={COLORS.primary} />
                        <Text style={styles.sectionTitleText}>Preferências de UI</Text>
                    </View>
                    <View style={styles.themeToggleContainer}>
                        {[
                            { id: 'light', label: 'Claro', icon: 'white-balance-sunny' },
                            { id: 'dark', label: 'Escuro', icon: 'moon-waning-crescent' },
                            { id: 'system', label: 'Sistema', icon: 'cellphone-cog' }
                        ].map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.themeOption,
                                    theme === item.id && { backgroundColor: COLORS.primary, borderColor: COLORS.primary }
                                ]}
                                onPress={() => setTheme(item.id)}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={18}
                                    color={theme === item.id ? 'white' : COLORS.textSecondary}
                                />
                                <Text style={[
                                    styles.themeOptionText,
                                    theme === item.id && { color: 'white', fontWeight: 'bold' }
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* History Section */}
                <View style={[styles.sectionContainer, { paddingBottom: 100 }]}>
                    <View style={styles.sectionHeaderTitle}>
                        <MaterialCommunityIcons name="history" size={22} color={COLORS.primary} />
                        <Text style={styles.sectionTitleText}>Meu Histórico</Text>
                    </View>

                    {history.length > 0 ? (
                        history.map(item => (
                            <HistoryItem key={item.id} item={item} />
                        ))
                    ) : (
                        <EmptyState
                            icon="map-marker-path"
                            title="Nenhum reporte ainda"
                            description="Sua jornada começa aqui! Ajude a comunidade reportando o que acontece no transporte público."
                        />
                    )}
                </View>
            </ScrollView>

            {/* Edit Profile Modal */}
            <Modal visible={isEditModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Editar Perfil</Text>
                            <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color={COLORS.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <View style={styles.editInputWrapper}>
                                <Text style={styles.editLabel}>Nome Completo</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editData.name}
                                    onChangeText={(text) => setEditData({ ...editData, name: text })}
                                />
                            </View>
                            <View style={styles.editInputWrapper}>
                                <Text style={styles.editLabel}>E-mail</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={editData.email}
                                    onChangeText={(text) => setEditData({ ...editData, email: text })}
                                    keyboardType="email-address"
                                />
                            </View>
                            <View style={styles.editInputWrapper}>
                                <Text style={styles.editLabel}>Telefone</Text>
                                <TextInput
                                    style={[styles.editInput, editData.phone.length > 0 && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(editData.phone) && { borderColor: COLORS.critical }]}
                                    value={editData.phone}
                                    onChangeText={(text) => setEditData({ ...editData, phone: maskPhone(text) })}
                                    keyboardType="phone-pad"
                                    placeholder="(11) 99999-9999"
                                />
                                {editData.phone.length > 0 && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(editData.phone) && (
                                    <Text style={styles.errorText}>Formato inválido: (XX) 99999-9999</Text>
                                )}
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={[styles.saveButton, !isProfileValid && styles.disabledButton]}
                            onPress={handleSaveProfile}
                            disabled={!isProfileValid}
                        >
                            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Toast ref={toastRef} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loginContainer: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
    },
    loginHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    loginTitle: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    loginSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: COLORS.surface,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        color: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    registerButtonText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    errorText: {
        color: COLORS.critical,
        fontSize: 10,
        fontWeight: '600',
        marginTop: 5,
        marginLeft: 5,
    },
    disabledButton: {
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
    },
    logoutButton: {
        padding: 8,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: -10,
    },
    avatarContainer: {
        marginBottom: 15,
        position: 'relative',
    },
    avatarMain: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.surface,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    levelBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        borderWidth: 3,
        borderColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    levelText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '900',
    },
    editBadge: {
        position: 'absolute',
        top: 0,
        right: -5,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    userName: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 20,
    },
    xpContainer: {
        width: '80%',
        marginBottom: 25,
    },
    xpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    xpLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    xpValue: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: COLORS.surface,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 4,
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    sectionHeaderTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitleText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 10,
    },
    achievementsList: {
        paddingBottom: 10,
    },
    achievementItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    achievementIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    achievementLabel: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        height: '70%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        flex: 1,
    },
    editInputWrapper: {
        marginBottom: 20,
    },
    editLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    editInput: {
        backgroundColor: COLORS.surface,
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 15,
        color: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    themeToggleContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 5,
        marginTop: 10,
    },
    themeOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    themeOptionText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 6,
    },
});
