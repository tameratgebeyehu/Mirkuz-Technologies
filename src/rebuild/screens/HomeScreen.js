import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Cpu, MapPinned, Sprout, Users } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Background from '../components/Background';
import HeroIllustration from '../components/HeroIllustration';

const metrics = [
    {
        icon: Users,
        value: '230+',
        label: 'Students reached',
        note: 'Education tools shaped for offline-heavy classrooms.'
    },
    {
        icon: BookOpen,
        value: '1.2k+',
        label: 'Learning activities',
        note: 'Interactive modules designed for clarity and retention.'
    },
    {
        icon: Sprout,
        value: '2',
        label: 'Impact domains',
        note: 'Education and agriculture, both grounded in local realities.'
    }
];

const focusAreas = [
    {
        title: 'Offline-first architecture',
        body: 'I design for unreliable connectivity before I design for ideal conditions.'
    },
    {
        title: 'Human-centered product thinking',
        body: 'Every interface decision starts with user trust, clarity, and practical use.'
    },
    {
        title: 'Math-informed systems',
        body: 'I bring analytical thinking to product design, logistics, and optimization.'
    }
];

const proofPoints = [
    {
        icon: Cpu,
        title: 'Systems builder',
        body: 'I turn constrained environments into clear product requirements and durable technical decisions.'
    },
    {
        icon: MapPinned,
        title: 'Context-driven',
        body: 'My work is rooted in Ethiopian realities rather than borrowed assumptions from high-bandwidth markets.'
    },
    {
        icon: Sprout,
        title: 'Long-horizon learner',
        body: 'I am building toward rigorous academic study while shipping practical software today.'
    }
];

const HomeScreen = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 1024;

    const fadeHero = useRef(new Animated.Value(0)).current;
    const slideHero = useRef(new Animated.Value(30)).current;
    const fadeIllust = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.stagger(160, [
            Animated.parallel([
                Animated.timing(fadeHero, { toValue: 1, duration: 900, useNativeDriver: true }),
                Animated.timing(slideHero, { toValue: 0, duration: 720, useNativeDriver: true })
            ]),
            Animated.timing(fadeIllust, { toValue: 1, duration: 1100, useNativeDriver: true })
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <ScrollView contentContainerStyle={[styles.scroll, isMobile && styles.scrollMobile]} showsVerticalScrollIndicator={false}>
                <View style={[styles.heroGrid, isMobile && styles.heroGridMobile]}>
                    <Animated.View style={[styles.heroContent, { opacity: fadeHero, transform: [{ translateY: slideHero }] }]}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>Fall 2027 applicant from Ethiopia</Text>
                        </View>

                        <Text style={[styles.title, isMobile && styles.titleMobile]}>
                            Designing resilient digital systems for learning, agriculture, and trust.
                        </Text>

                        <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>
                            Software engineering and applied mathematics student building tools that stay useful in low-resource, high-constraint environments.
                        </Text>

                        <GlassCard style={styles.storyCard}>
                            <Text style={styles.storyLabel}>Working thesis</Text>
                            <Text style={styles.storyText}>
                                I believe the strongest technology for emerging markets is not simplified technology. It is thoughtfully designed technology that respects bandwidth, infrastructure, and the daily realities of the people who use it.
                            </Text>
                        </GlassCard>

                        <View style={[styles.focusGrid, isMobile && styles.focusGridMobile]}>
                            {focusAreas.map((item) => (
                                <GlassCard key={item.title} style={styles.focusCard}>
                                    <Text style={styles.focusTitle}>{item.title}</Text>
                                    <Text style={styles.focusBody}>{item.body}</Text>
                                </GlassCard>
                            ))}
                        </View>

                        <View style={styles.actions}>
                            <Button
                                title="Explore projects"
                                caption="See the systems I have built"
                                onPress={() => navigation.navigate('Projects')}
                            />
                            <Button
                                title="Open profile"
                                caption="A concise academic snapshot"
                                type="secondary"
                                onPress={() => navigation.navigate('Print')}
                            />
                        </View>
                    </Animated.View>

                    <Animated.View style={[styles.sideColumn, isMobile && styles.sideColumnMobile, { opacity: fadeIllust }]}>
                        <GlassCard style={styles.illustrationCard}>
                            <HeroIllustration />
                        </GlassCard>

                        <View style={[styles.sideNotes, isMobile && styles.sideNotesMobile]}>
                            <GlassCard style={styles.noteCard}>
                                <Text style={styles.noteEyebrow}>Primary build lens</Text>
                                <Text style={styles.noteTitle}>Useful under constraint</Text>
                                <Text style={styles.noteBody}>Products should still feel intentional when connectivity, devices, and logistics are imperfect.</Text>
                            </GlassCard>
                            <GlassCard style={styles.noteCard}>
                                <Text style={styles.noteEyebrow}>Current direction</Text>
                                <Text style={styles.noteTitle}>Education and agricultural systems</Text>
                                <Text style={styles.noteBody}>I am especially drawn to software that expands access, transparency, and decision quality.</Text>
                            </GlassCard>
                        </View>
                    </Animated.View>
                </View>

                <View style={styles.metricsRow}>
                    {metrics.map((metric, index) => (
                        <MetricCard key={metric.label} {...metric} delay={index * 140} />
                    ))}
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionLabel}>What this portfolio is showing</Text>
                    <Text style={styles.sectionTitle}>A product builder with a long view.</Text>
                </View>

                <View style={[styles.proofGrid, isMobile && styles.proofGridMobile]}>
                    {proofPoints.map((item) => (
                        <GlassCard key={item.title} style={styles.proofCard}>
                            <View style={styles.proofIcon}>
                                <item.icon size={20} color={Theme.colors.primary} />
                            </View>
                            <Text style={styles.proofTitle}>{item.title}</Text>
                            <Text style={styles.proofBody}>{item.body}</Text>
                        </GlassCard>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const MetricCard = ({ icon: Icon, value, label, note, delay }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 700, delay, useNativeDriver: true }),
            Animated.timing(slide, { toValue: 0, duration: 600, delay, useNativeDriver: true })
        ]).start();
    }, [delay, fade, slide]);

    return (
        <Animated.View style={[styles.metricWrap, { opacity: fade, transform: [{ translateY: slide }] }]}>
            <GlassCard style={styles.metricCard}>
                <View style={styles.metricIcon}>
                    <Icon size={22} color={Theme.colors.primary} />
                </View>
                <Text style={styles.metricValue}>{value}</Text>
                <Text style={styles.metricLabel}>{label}</Text>
                <Text style={styles.metricNote}>{note}</Text>
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
        maxWidth: Theme.layout.wide,
        alignSelf: 'center',
        width: '100%',
    },
    scrollMobile: {
        paddingHorizontal: Theme.spacing.containerPaddingMobile,
        paddingTop: 104,
    },
    heroGrid: {
        flexDirection: 'row',
        gap: 30,
        marginBottom: 44,
        alignItems: 'flex-start',
    },
    heroGridMobile: {
        flexDirection: 'column',
    },
    heroContent: {
        flex: 1.12,
        paddingRight: 8,
    },
    sideColumn: {
        flex: 0.88,
        gap: 20,
    },
    sideColumnMobile: {
        width: '100%',
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: Theme.borderRadius.pill,
        borderWidth: 1,
        borderColor: Theme.colors.glassBorder,
        backgroundColor: Theme.colors.primaryMuted,
        marginBottom: 22,
    },
    badgeText: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    title: {
        color: Theme.colors.textMain,
        fontSize: 62,
        fontWeight: '900',
        lineHeight: 70,
        letterSpacing: -2.3,
        marginBottom: 20,
        maxWidth: 720,
    },
    titleMobile: {
        fontSize: 42,
        lineHeight: 48,
        letterSpacing: -1.4,
    },
    subtitle: {
        color: Theme.colors.textMuted,
        fontSize: 21,
        lineHeight: 32,
        marginBottom: 28,
        maxWidth: 720,
    },
    subtitleMobile: {
        fontSize: 18,
        lineHeight: 28,
    },
    storyCard: {
        marginBottom: 22,
        padding: 28,
    },
    storyLabel: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    storyText: {
        color: Theme.colors.textMain,
        fontSize: 19,
        lineHeight: 30,
    },
    focusGrid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 28,
    },
    focusGridMobile: {
        flexDirection: 'column',
    },
    focusCard: {
        flex: 1,
        minHeight: 164,
    },
    focusTitle: {
        color: Theme.colors.textMain,
        fontSize: 17,
        fontWeight: '800',
        marginBottom: 10,
    },
    focusBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
    },
    illustrationCard: {
        paddingVertical: 36,
        paddingHorizontal: 20,
        minHeight: 380,
        justifyContent: 'center',
    },
    sideNotes: {
        flexDirection: 'row',
        gap: 16,
    },
    sideNotesMobile: {
        flexDirection: 'column',
    },
    noteCard: {
        flex: 1,
        minHeight: 168,
    },
    noteEyebrow: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    noteTitle: {
        color: Theme.colors.textMain,
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 8,
    },
    noteBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    metricsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 54,
    },
    metricWrap: {
        flex: 1,
        minWidth: 250,
    },
    metricCard: {
        minHeight: 212,
    },
    metricIcon: {
        width: 50,
        height: 50,
        borderRadius: Theme.borderRadius.md,
        backgroundColor: Theme.colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    metricValue: {
        color: Theme.colors.textMain,
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
        marginBottom: 8,
    },
    metricLabel: {
        color: Theme.colors.textMain,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 10,
    },
    metricNote: {
        color: Theme.colors.textMuted,
        fontSize: 14,
        lineHeight: 22,
    },
    sectionHeader: {
        marginBottom: 20,
    },
    sectionLabel: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.8,
        marginBottom: 10,
    },
    sectionTitle: {
        color: Theme.colors.textMain,
        fontSize: 34,
        fontWeight: '800',
        lineHeight: 40,
        maxWidth: 680,
    },
    proofGrid: {
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap',
    },
    proofGridMobile: {
        flexDirection: 'column',
    },
    proofCard: {
        flex: 1,
        minWidth: 250,
        minHeight: 210,
    },
    proofIcon: {
        width: 44,
        height: 44,
        borderRadius: Theme.borderRadius.md,
        backgroundColor: 'rgba(119, 214, 200, 0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    proofTitle: {
        color: Theme.colors.textMain,
        fontSize: 19,
        fontWeight: '800',
        marginBottom: 10,
    },
    proofBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
});

export default HomeScreen;
