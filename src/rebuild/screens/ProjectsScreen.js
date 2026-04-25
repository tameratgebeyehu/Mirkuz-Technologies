import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const projects = [
    {
        phase: 'Education',
        title: 'Zemen Academy',
        role: 'Founder and lead developer',
        summary: 'A localized learning platform designed to help students access educational material in environments where stable connectivity cannot be assumed.',
        problem: 'Students needed reliable educational access without depending on constant internet availability or high-end devices.',
        solution: 'Built a mobile-first experience with practical performance constraints in mind, organized learning content for clarity, and emphasized usability for sustained classroom and individual use.',
        outcomes: ['Reached 230+ learners', 'Designed 1,200+ learning interactions', 'Focused on offline-heavy use patterns'],
        stack: ['React Native', 'Android thinking', 'Product design', 'Offline-first UX']
    },
    {
        phase: 'Agriculture',
        title: 'SindeTrack',
        role: 'Developer',
        summary: 'A record-tracking system aimed at improving transparency and decision-making in agricultural workflows.',
        problem: 'Agricultural logistics often suffer from fragmented records, delayed information flow, and limited visibility across stakeholders.',
        solution: 'Explored a system structure that makes record-keeping more accessible, strengthens traceability, and creates a foundation for more trustworthy operational data.',
        outcomes: ['Focused on wheat-production workflows', 'Framed transparency as a systems problem', 'Connected technical design to local logistics'],
        stack: ['Data modeling', 'Workflow design', 'Mobile interfaces', 'Applied math perspective']
    }
];

const ProjectsScreen = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 900;
    const fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: true }).start();
    }, [fade]);

    return (
        <SafeAreaView style={styles.container}>
            <Background />
            <ScrollView contentContainerStyle={[styles.scroll, isMobile && styles.scrollMobile]} showsVerticalScrollIndicator={false}>
                <Animated.View style={{ opacity: fade }}>
                    <Text style={styles.label}>Portfolio of work</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        Projects built around access, trust, and usable systems.
                    </Text>
                    <Text style={styles.subtitle}>
                        These projects are not only technical exercises. Each one starts from a concrete problem shaped by real infrastructure, people, and operational constraints.
                    </Text>

                    <View style={styles.projectList}>
                        {projects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} delay={index * 160} />
                        ))}
                    </View>

                    <GlassCard style={styles.directionCard}>
                        <Text style={styles.directionLabel}>Current product direction</Text>
                        <Text style={styles.directionTitle}>Keep building software that remains trustworthy when conditions are imperfect.</Text>
                        <Text style={styles.directionBody}>
                            The thread connecting my work is simple: software should keep being useful when bandwidth is low, logistics are messy, and users need clarity more than complexity.
                        </Text>
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ProjectCard = ({ project, delay }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 760, delay, useNativeDriver: true }),
            Animated.timing(slide, { toValue: 0, duration: 620, delay, useNativeDriver: true })
        ]).start();
    }, [delay, fade, slide]);

    return (
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
            <GlassCard style={styles.projectCard}>
                <View style={styles.projectHeader}>
                    <View>
                        <Text style={styles.phase}>{project.phase}</Text>
                        <Text style={styles.projectTitle}>{project.title}</Text>
                    </View>
                    <View style={styles.roleTag}>
                        <Text style={styles.roleText}>{project.role}</Text>
                    </View>
                </View>

                <Text style={styles.summary}>{project.summary}</Text>

                <View style={styles.detailGrid}>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Problem</Text>
                        <Text style={styles.detailBody}>{project.problem}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Approach</Text>
                        <Text style={styles.detailBody}>{project.solution}</Text>
                    </View>
                </View>

                <View style={styles.outcomesRow}>
                    {project.outcomes.map((item) => (
                        <View key={item} style={styles.outcomePill}>
                            <Text style={styles.outcomeText}>{item}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.stackRow}>
                    {project.stack.map((item) => (
                        <View key={item} style={styles.stackTag}>
                            <Text style={styles.stackText}>{item}</Text>
                        </View>
                    ))}
                </View>
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
        maxWidth: 860,
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
    projectList: {
        gap: 22,
        marginBottom: 22,
    },
    projectCard: {
        padding: 30,
    },
    projectHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 18,
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    phase: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    projectTitle: {
        color: Theme.colors.textMain,
        fontSize: 30,
        fontWeight: '800',
        marginBottom: 4,
    },
    roleTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: Theme.borderRadius.pill,
        borderWidth: 1,
        borderColor: Theme.colors.glassBorder,
        backgroundColor: Theme.colors.primaryMuted,
    },
    roleText: {
        color: Theme.colors.primaryStrong,
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    summary: {
        color: Theme.colors.textMain,
        fontSize: 18,
        lineHeight: 30,
        marginBottom: 22,
    },
    detailGrid: {
        flexDirection: 'row',
        gap: 18,
        flexWrap: 'wrap',
        marginBottom: 22,
    },
    detailCol: {
        flex: 1,
        minWidth: 260,
        padding: 18,
        borderRadius: Theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: Theme.colors.line,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    detailLabel: {
        color: Theme.colors.textSoft,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.3,
        marginBottom: 8,
    },
    detailBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
    outcomesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 20,
    },
    outcomePill: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: Theme.borderRadius.pill,
        backgroundColor: 'rgba(119, 214, 200, 0.12)',
        borderWidth: 1,
        borderColor: 'rgba(119, 214, 200, 0.18)',
    },
    outcomeText: {
        color: Theme.colors.secondary,
        fontSize: 13,
        fontWeight: '700',
    },
    stackRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    stackTag: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: Theme.borderRadius.pill,
        borderWidth: 1,
        borderColor: Theme.colors.line,
    },
    stackText: {
        color: Theme.colors.textMuted,
        fontSize: 12,
        fontWeight: '700',
    },
    directionCard: {
        padding: 30,
    },
    directionLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    directionTitle: {
        color: Theme.colors.textMain,
        fontSize: 26,
        fontWeight: '800',
        lineHeight: 34,
        marginBottom: 12,
        maxWidth: 700,
    },
    directionBody: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        lineHeight: 25,
        maxWidth: 760,
    },
});

export default ProjectsScreen;
