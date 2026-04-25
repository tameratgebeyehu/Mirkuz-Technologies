import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, BookOpen, Rocket } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import BackgroundIllustration from '../components/BackgroundIllustration';

const HomeScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    const metricsAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(metricsAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <BackgroundIllustration />
            <ScrollView contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]}>
                <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <View style={[
                        styles.gridHero,
                        isMobile && styles.gridHeroMobile,
                        { justifyContent: isMobile ? 'center' : 'space-between' }
                    ]}>
                        <View style={[
                            styles.heroTextContent,
                            { alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }
                        ]}>
                            <View style={[
                                styles.labelContainer,
                                { alignSelf: isMobile ? 'center' : 'flex-start' }
                            ]}>
                                <Text style={styles.heroLabel}>Fall 2027 Applicant</Text>
                            </View>
                            <Text style={[
                                styles.title,
                                isMobile && styles.titleMobile,
                                { textAlign: isMobile ? 'center' : 'left' }
                            ]}>
                                Building <Text style={styles.gradientText}>Offline-First</Text> Technology for Ethiopia
                            </Text>
                            <Text style={[
                                styles.subtitle,
                                isMobile && styles.subtitleMobile,
                                { textAlign: isMobile ? 'center' : 'left' }
                            ]}>
                                Software Engineering & Applied Mathematics
                            </Text>

                            <GlassCard style={styles.identityCard}>
                                <Text style={styles.identityText}>
                                    "Student developer and educator building tech for education and agriculture, focused on
                                    expanding access in low-resource communities."
                                </Text>
                            </GlassCard>

                            <View style={[
                                styles.actions,
                                { justifyContent: isMobile ? 'center' : 'flex-start' }
                            ]}>
                                <TouchableOpacity
                                    style={styles.buttonPrimary}
                                    onPress={() => navigation.navigate('Projects')}
                                >
                                    <Text style={styles.buttonText}>Explore Projects</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonSecondary}
                                    onPress={() => navigation.navigate('Print')}
                                >
                                    <Text style={styles.buttonTextSecondary}>View PDF Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.illustrationContainer, isMobile && styles.illustrationContainerMobile]}>
                            <View style={styles.glowCircle} />
                            <Image
                                source={{ uri: 'https://raw.githubusercontent.com/Tame6/portfolio/main/images/hero.svg' }}
                                style={[styles.illustration, isMobile && styles.illustrationMobile]}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </Animated.View>

                <Animated.View style={[styles.metricsGrid, { opacity: metricsAnim, transform: [{ translateY: metricsAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }]}>
                    <MetricCard number="230+" label="Active Users" icon={<Users color={Theme.colors.primary} size={32} />} />
                    <MetricCard number="1.2k+" label="Curriculum Quizzes" icon={<BookOpen color={Theme.colors.primary} size={32} />} />
                    <MetricCard number="2" label="Production Apps" icon={<Rocket color={Theme.colors.primary} size={32} />} />
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const MetricCard = ({ number, label, icon }) => (
    <GlassCard style={styles.metricCard}>
        <View style={styles.iconContainer}>{icon}</View>
        <View>
            <Text style={styles.metricNumber}>{number}</Text>
            <Text style={styles.metricLabel}>{label}</Text>
        </View>
    </GlassCard>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: 32,
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
        paddingTop: 160, // Increased for premium feel
    },
    scrollContentMobile: {
        padding: 24,
        paddingTop: 120,
    },
    hero: {
        marginBottom: 100,
    },
    gridHero: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 80,
        alignItems: 'center',
    },
    gridHeroMobile: {
        flexDirection: 'column',
        gap: 50,
    },
    heroTextContent: {
        flex: 1.4,
        minWidth: 320,
    },
    labelContainer: {
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        alignSelf: 'flex-start',
    },
    heroLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    title: {
        color: Theme.colors.textMain,
        fontSize: 68,
        fontWeight: '900',
        lineHeight: 76,
        marginBottom: 28,
        letterSpacing: -2,
    },
    titleMobile: {
        fontSize: 42,
        lineHeight: 48,
        letterSpacing: -1.2,
    },
    gradientText: {
        color: Theme.colors.primary,
    },
    subtitle: {
        color: Theme.colors.textMuted,
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 40,
        letterSpacing: -0.6,
        opacity: 0.8,
    },
    subtitleMobile: {
        fontSize: 20,
        lineHeight: 28,
    },
    identityCard: {
        marginBottom: 48,
        padding: 28,
        backgroundColor: 'rgba(30, 41, 59, 0.3)',
        borderLeftWidth: 2,
        borderLeftColor: Theme.colors.primary,
        maxWidth: 600,
    },
    identityText: {
        color: Theme.colors.textMain,
        fontSize: 19,
        fontWeight: '500',
        lineHeight: 30,
        opacity: 0.85,
    },
    actions: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
    },
    buttonPrimary: {
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 12,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    buttonSecondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        paddingHorizontal: 40,
        paddingVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    buttonTextSecondary: {
        color: Theme.colors.textMain,
        fontSize: 17,
        fontWeight: '700',
    },
    illustrationContainer: {
        flex: 1,
        minWidth: 400,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: '100%',
        height: 500,
        zIndex: 2,
    },
    illustrationMobile: {
        height: 320,
    },
    glowCircle: {
        position: 'absolute',
        width: 400,
        height: 400,
        backgroundColor: Theme.colors.primaryGlow,
        borderRadius: 200,
        filter: 'blur(120px)',
        zIndex: 1,
        opacity: 0.6,
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 28,
        marginBottom: 80,
    },
    metricCard: {
        flex: 1,
        minWidth: 280,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        padding: 32,
    },
    iconContainer: {
        width: 64,
        height: 64,
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.2)',
    },
    metricNumber: {
        color: Theme.colors.textMain,
        fontSize: 38,
        fontWeight: '900',
        marginBottom: 4,
        letterSpacing: -1,
    },
    metricLabel: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default HomeScreen;
