import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const { width } = Dimensions.get('window');

const slides = [
    {
        icon: 'handshake',
        title: 'Comunidade Vigilante',
        desc: 'O RotaSegura é feito por pessoas como você. Reporte o que acontece na sua linha e ajude milhares de passageiros.',
        color: COLORS.primary
    },
    {
        icon: 'shield-check',
        title: 'Sua Segurança Primeiro',
        desc: 'Receba alertas em tempo real sobre ocorrências de segurança, lotação e problemas técnicos.',
        color: COLORS.success
    },
    {
        icon: 'map-marker-pulse',
        title: 'Rotas Inteligentes',
        desc: 'Escolha o melhor trajeto baseado em dados reais de quem já está no transporte público agora.',
        color: COLORS.alert
    }
];

const Onboarding = ({ onFinish }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onFinish();
        }
    };

    const slide = slides[currentSlide];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={[styles.iconContainer, { backgroundColor: slide.color + '20' }]}>
                    <MaterialCommunityIcons name={slide.icon} size={100} color={slide.color} />
                </View>

                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.desc}>{slide.desc}</Text>

                <View style={styles.indicatorContainer}>
                    {slides.map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.indicator,
                                i === currentSlide ? { width: 30, backgroundColor: slide.color } : { backgroundColor: COLORS.border }
                            ]}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: slide.color }]}
                    onPress={handleNext}
                >
                    <Text style={styles.buttonText}>
                        {currentSlide === slides.length - 1 ? 'Começar Agora' : 'Próximo'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 16,
    },
    desc: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    indicatorContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    indicator: {
        height: 6,
        width: 10,
        borderRadius: 3,
        marginHorizontal: 4,
    },
    footer: {
        padding: 40,
    },
    button: {
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Onboarding;
