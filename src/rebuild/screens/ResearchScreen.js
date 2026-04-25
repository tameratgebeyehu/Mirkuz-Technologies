import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const inquiries = [
    {
        title: 'Offline-first architecture',
        why: 'Connectivity gaps should not decide whether a tool is useful. I am interested in synchronization, state durability, and product behavior under interruption.',
        method: 'Studying system design patterns that preserve reliability in low-connectivity environments.'
    },
    {
        title: 'Mathematical thinking for real systems',
        why: 'Applied mathematics gives me a way to reason carefully about optimization, structure, and tradeoffs in complex workflows.',
        method: 'Strengthening foundations in calculus, discrete math, and analytical problem solving alongside software work.'
    },
    {
        title: 'Socio-technical product design',
        why: 'Technology adoption depends on trust, clarity, and context, not technical correctness alone.',
        method: 'Exploring how interface choices, distribution realities, and local constraints shape outcomes.'
    }
];

const studyPlan = [
    'Read deeply enough to translate theory into product choices.',
    'Use projects as laboratories for architectural and UX hypotheses.',
    'Connect technical learning to education and agriculture use cases.',
];

const ResearchScreen = () => {
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
                    <Text style={styles.label}>Research and study</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        Questions I want to keep pursuing with more rigor.
                    </Text>
                    <Text style={styles.subtitle}>
                        I am especially motivated by problems where technical architecture, mathematical reasoning, and human context all matter at the same time.
                    </Text>

                    <View style={styles.stack}>
                        {inquiries.map((item) => (
                            <GlassCard key={item.title} style={styles.card}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <View style={styles.block}>
                                    <Text style={styles.blockLabel}>Why it matters</Text>
                                    <Text style={styles.blockBody}>{item.why}</Text>
                                </View>
                                <View style={styles.block}>
                                    <Text style={styles.blockLabel}>How I am approaching it</Text>
                                    <Text style={styles.blockBody}>{item.method}</Text>
                                </View>
                            </GlassCard>
                        ))}
                    </View>

                    <GlassCard style={styles.planCard}>
                        <Text style={styles.planLabel}>Current cadence</Text>
                        <Text style={styles.planTitle}>Study is feeding practice, and practice is sharpening the next questions.</Text>
                        <View style={styles.planList}>
                            {studyPlan.map((item) => (
                                <View key={item} style={styles.planItem}>
                                    <View style={styles.planDot} />
                                    <Text style={styles.planText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    scroll: {
        paddingHorizontal: Theme.spacing.containerPadding,
        paddingTop: Theme.spacing.pageTop,
        paddingBottom: 72,
        maxWidth: Theme.layout.narrow,
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
    stack: {
        gap: 18,
        marginBottom: 22,
    },
    card: {
        padding: 28,
    },
    cardTitle: {
        color: Theme.colors.textMain,
        fontSize: 25,
        fontWeight: '800',
        marginBottom: 18,
    },
    block: {
        marginBottom: 16,
    },
    blockLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 8,
    },
    blockBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    planCard: {
        padding: 28,
    },
    planLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    planTitle: {
        color: Theme.colors.textMain,
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 32,
        marginBottom: 18,
        maxWidth: 700,
    },
    planList: {
        gap: 12,
    },
    planItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    planDot: {
        width: 8,
        height: 8,
        borderRadius: Theme.borderRadius.pill,
        backgroundColor: Theme.colors.secondary,
        marginTop: 8,
    },
    planText: {
        flex: 1,
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
});

export default ResearchScreen;
