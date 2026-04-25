import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const principles = [
    {
        title: 'Build for the real environment',
        body: 'Connectivity, hardware quality, and user confidence are not edge cases in my context. They are core product constraints.'
    },
    {
        title: 'Let users feel capable',
        body: 'I care about interfaces that lower stress and help people trust what the system is doing.'
    },
    {
        title: 'Tie engineering to outcomes',
        body: 'I want code to unlock access, transparency, and practical progress, not just technical novelty.'
    }
];

const timeline = [
    {
        period: 'Early foundation',
        title: 'Learning from scarcity',
        body: 'Growing up in Ethiopia made the digital divide tangible. Missing access was never abstract; it shaped what students and communities could do.'
    },
    {
        period: 'Product direction',
        title: 'Choosing applied software',
        body: 'I was drawn to software because it scales ideas into tools. It can keep working for people long after one conversation or classroom session ends.'
    },
    {
        period: 'Academic aim',
        title: 'Preparing for deeper study',
        body: 'I am building a foundation in software engineering and applied mathematics to keep expanding both technical depth and social usefulness.'
    }
];

const capabilities = [
    'React Native and mobile product flows',
    'Kotlin and Android-oriented thinking',
    'Applied mathematics for structured reasoning',
    'Offline-first data and sync design',
    'Product storytelling for admissions and partnerships',
];

const AboutScreen = () => {
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
                    <Text style={styles.label}>Identity and motivation</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        The personal context behind the technical direction.
                    </Text>
                    <Text style={styles.subtitle}>
                        My portfolio is not only about what I have built. It is also about why I choose these problems and the kind of engineer I am becoming.
                    </Text>

                    <View style={[styles.topGrid, isMobile && styles.topGridMobile]}>
                        <GlassCard style={styles.storyCard}>
                            <Text style={styles.cardEyebrow}>Short story</Text>
                            <Text style={styles.storyText}>
                                Growing up in Ethiopia taught me that lack of access is rarely a single problem. It is usually a chain of constraints: infrastructure, affordability, limited resources, and systems that were never designed with local realities in mind.
                            </Text>
                            <Text style={styles.storyText}>
                                That is why I care about offline-first education tools, practical interfaces, and software systems that still make sense when conditions are uneven. I want my work to expand what people can do, not merely imitate products built for completely different environments.
                            </Text>
                        </GlassCard>

                        <GlassCard style={styles.snapshotCard}>
                            <Text style={styles.cardEyebrow}>Current snapshot</Text>
                            <View style={styles.snapshotGroup}>
                                <Text style={styles.snapshotLabel}>Base</Text>
                                <Text style={styles.snapshotValue}>Ethiopia</Text>
                            </View>
                            <View style={styles.snapshotGroup}>
                                <Text style={styles.snapshotLabel}>Academic direction</Text>
                                <Text style={styles.snapshotValue}>Software Engineering and Applied Mathematics</Text>
                            </View>
                            <View style={styles.snapshotGroup}>
                                <Text style={styles.snapshotLabel}>Design lens</Text>
                                <Text style={styles.snapshotValue}>Resilient systems for low-resource communities</Text>
                            </View>
                        </GlassCard>
                    </View>

                    <View style={[styles.middleGrid, isMobile && styles.middleGridMobile]}>
                        <GlassCard style={styles.principlesCard}>
                            <Text style={styles.sectionTitle}>Principles I keep returning to</Text>
                            <View style={styles.stack}>
                                {principles.map((item) => (
                                    <View key={item.title} style={styles.stackItem}>
                                        <Text style={styles.stackTitle}>{item.title}</Text>
                                        <Text style={styles.stackBody}>{item.body}</Text>
                                    </View>
                                ))}
                            </View>
                        </GlassCard>

                        <GlassCard style={styles.timelineCard}>
                            <Text style={styles.sectionTitle}>Trajectory</Text>
                            <View style={styles.stack}>
                                {timeline.map((item) => (
                                    <View key={item.title} style={styles.timelineItem}>
                                        <Text style={styles.timelinePeriod}>{item.period}</Text>
                                        <Text style={styles.stackTitle}>{item.title}</Text>
                                        <Text style={styles.stackBody}>{item.body}</Text>
                                    </View>
                                ))}
                            </View>
                        </GlassCard>
                    </View>

                    <GlassCard style={styles.capabilitiesCard}>
                        <Text style={styles.sectionTitle}>Capabilities being strengthened right now</Text>
                        <View style={styles.capabilityWrap}>
                            {capabilities.map((item) => (
                                <View key={item} style={styles.capabilityPill}>
                                    <Text style={styles.capabilityText}>{item}</Text>
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
        marginBottom: 18,
        maxWidth: 820,
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
    topGrid: {
        flexDirection: 'row',
        gap: 22,
        marginBottom: 22,
    },
    topGridMobile: {
        flexDirection: 'column',
    },
    storyCard: {
        flex: 1.35,
        padding: 30,
    },
    snapshotCard: {
        flex: 0.85,
        padding: 30,
    },
    cardEyebrow: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.6,
        marginBottom: 12,
    },
    storyText: {
        color: Theme.colors.textMain,
        fontSize: 18,
        lineHeight: 30,
        marginBottom: 18,
    },
    snapshotGroup: {
        marginBottom: 18,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
    },
    snapshotLabel: {
        color: Theme.colors.textSoft,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 8,
    },
    snapshotValue: {
        color: Theme.colors.textMain,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
    },
    middleGrid: {
        flexDirection: 'row',
        gap: 22,
        marginBottom: 22,
        alignItems: 'flex-start',
    },
    middleGridMobile: {
        flexDirection: 'column',
    },
    principlesCard: {
        flex: 1.05,
        padding: 30,
    },
    timelineCard: {
        flex: 0.95,
        padding: 30,
    },
    sectionTitle: {
        color: Theme.colors.textMain,
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 18,
    },
    stack: {
        gap: 18,
    },
    stackItem: {
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
    },
    timelineItem: {
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
    },
    timelinePeriod: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.3,
        marginBottom: 8,
    },
    stackTitle: {
        color: Theme.colors.textMain,
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
    },
    stackBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    capabilitiesCard: {
        padding: 30,
    },
    capabilityWrap: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    capabilityPill: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: Theme.borderRadius.pill,
        borderWidth: 1,
        borderColor: Theme.colors.glassBorder,
        backgroundColor: Theme.colors.primaryMuted,
    },
    capabilityText: {
        color: Theme.colors.primaryStrong,
        fontSize: 13,
        fontWeight: '700',
    },
});

export default AboutScreen;
