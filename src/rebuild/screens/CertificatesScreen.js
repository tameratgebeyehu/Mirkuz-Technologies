import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Linking, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, Award } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const credentials = [
    {
        name: 'Google IT Support Professional Certificate',
        issuer: 'Google / Coursera',
        angle: 'Technical support, systems literacy, and structured troubleshooting.',
        url: 'https://www.coursera.org/professional-certificates/google-it-support'
    },
    {
        name: 'HP LIFE Entrepreneurship',
        issuer: 'HP Foundation',
        angle: 'Business thinking, initiative, and execution mindset.',
        url: 'https://www.life-global.org/'
    },
    {
        name: 'Blue Ocean Strategy',
        issuer: 'Blue Ocean Global Network',
        angle: 'Strategic differentiation and problem framing beyond crowded defaults.',
        url: 'https://www.blueoceanstrategy.com/'
    }
];

const learningNow = [
    'Applied mathematics foundations',
    'Offline-first mobile system design',
    'Human-centered product communication',
    'Technology for education and agriculture'
];

const CertificatesScreen = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 860;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: true }).start();
    }, [fade]);

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <ScrollView contentContainerStyle={[styles.scroll, isMobile && styles.scrollMobile]} showsVerticalScrollIndicator={false}>
                <Animated.View style={{ opacity: fade }}>
                    <Text style={styles.label}>Credentials and coursework</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        Learning signals that reinforce the direction of the work.
                    </Text>
                    <Text style={styles.subtitle}>
                        Certifications are one part of the story. What matters most is how they support better technical judgment, clearer thinking, and stronger execution.
                    </Text>

                    <View style={[styles.grid, isMobile && styles.gridMobile]}>
                        {credentials.map((item, index) => (
                            <CredentialCard key={item.name} item={item} delay={index * 140} />
                        ))}
                    </View>

                    <GlassCard style={styles.learningCard}>
                        <Text style={styles.learningLabel}>Currently strengthening</Text>
                        <Text style={styles.learningTitle}>A foundation built for depth, not just collection.</Text>
                        <View style={styles.learningWrap}>
                            {learningNow.map((item) => (
                                <View key={item} style={styles.learningPill}>
                                    <Text style={styles.learningText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const CredentialCard = ({ item, delay }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 700, delay, useNativeDriver: true }),
            Animated.timing(slide, { toValue: 0, duration: 620, delay, useNativeDriver: true })
        ]).start();
    }, [delay, fade, slide]);

    return (
        <Animated.View style={[styles.cardWrap, { opacity: fade, transform: [{ translateY: slide }] }]}>
            <GlassCard style={styles.card}>
                <View style={styles.iconWrap}>
                    <Award size={22} color={Theme.colors.primary} />
                </View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.issuer}>{item.issuer}</Text>
                <Text style={styles.angle}>{item.angle}</Text>
                <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL(item.url)}>
                    <Text style={styles.linkText}>Open source page</Text>
                    <ArrowUpRight size={16} color={Theme.colors.primary} />
                </TouchableOpacity>
            </GlassCard>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    scroll: {
        paddingHorizontal: Theme.spacing.containerPadding,
        paddingTop: Theme.spacing.pageTop,
        paddingBottom: 72,
        maxWidth: Theme.layout.content,
        alignSelf: 'center',
        width: '100%',
    },
    scrollMobile: {
        paddingHorizontal: Theme.spacing.containerPaddingMobile,
        paddingTop: 104,
    },
    label: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        marginBottom: 12,
    },
    title: {
        color: Theme.colors.textMain,
        fontSize: 48,
        fontWeight: '900',
        lineHeight: 54,
        letterSpacing: -1.4,
        marginBottom: 16,
        maxWidth: 840,
    },
    titleMobile: {
        fontSize: 38,
        lineHeight: 44,
    },
    subtitle: {
        color: Theme.colors.textMuted,
        fontSize: 18,
        lineHeight: 29,
        marginBottom: 30,
        maxWidth: 760,
    },
    grid: {
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
        marginBottom: 22,
    },
    gridMobile: {
        flexDirection: 'column',
    },
    cardWrap: {
        flex: 1,
        minWidth: 260,
    },
    card: {
        minHeight: 268,
        padding: 28,
    },
    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: Theme.borderRadius.md,
        backgroundColor: Theme.colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    name: {
        color: Theme.colors.textMain,
        fontSize: 20,
        fontWeight: '800',
        lineHeight: 28,
        marginBottom: 8,
    },
    issuer: {
        color: Theme.colors.primaryStrong,
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
        marginBottom: 12,
    },
    angle: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 18,
    },
    linkRow: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    linkText: {
        color: Theme.colors.primary,
        fontSize: 14,
        fontWeight: '800',
    },
    learningCard: {
        padding: 30,
    },
    learningLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    learningTitle: {
        color: Theme.colors.textMain,
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 32,
        marginBottom: 18,
        maxWidth: 660,
    },
    learningWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    learningPill: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: Theme.borderRadius.pill,
        borderWidth: 1,
        borderColor: Theme.colors.line,
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
    },
    learningText: {
        color: Theme.colors.textMuted,
        fontSize: 13,
        fontWeight: '700',
    },
});

export default CertificatesScreen;
