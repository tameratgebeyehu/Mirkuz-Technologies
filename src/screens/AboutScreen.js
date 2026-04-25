import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const AboutScreen = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideAnim = React.useRef(new Animated.Value(20)).current;

    React.useEffect(() => {
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
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]}>
                <Animated.View style={[
                    styles.headerSection,
                    isMobile && styles.headerSectionMobile,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <Text style={styles.label}>My Story</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Why I <Text style={{ color: Theme.colors.primary }}>Build</Text></Text>
                </Animated.View>

                <Animated.View style={[
                    styles.grid,
                    isMobile && styles.gridMobile,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <GlassCard style={[styles.mainContent, isMobile && styles.mainContentMobile]}>
                        <Text style={styles.quote}>
                            "My journey from Dodola, Ethiopia, to becoming a software engineer and educator."
                        </Text>
                        <Text style={styles.paragraph}>
                            Growing up in Ethiopia with limited access to digital tools, I quickly realized the gap
                            between technological potential and everyday reality. The internet was a luxury, and
                            educational resources were scarce. This dynamic wasn't just an inconvenience; it was a systemic barrier to progress.
                        </Text>
                        <Text style={styles.paragraph}>
                            I build out of necessity and a deep sense of responsibility. By developing offline-first technology like
                            Zemen Academy, I aim to solve real local problems—expanding access, transparency, and learning
                            opportunities in communities that need them most.
                        </Text>
                    </GlassCard>

                    <View style={styles.sideContent}>
                        <GlassCard style={styles.sideCard}>
                            <Text style={styles.cardTitle}>Languages</Text>
                            <View style={styles.skillList}>
                                <SkillItem label="Amharic: Native" />
                                <SkillItem label="English: Intermediate" />
                                <SkillItem label="Afaan Oromo: Intermediate" />
                            </View>
                        </GlassCard>

                        <GlassCard style={styles.sideCard}>
                            <Text style={styles.cardTitle}>Technical Stack</Text>
                            <View style={styles.techPills}>
                                <TechPill label="React Native" />
                                <TechPill label="Kotlin" />
                                <TechPill label="Firebase" />
                                <TechPill label="UI Design" />
                                <TechPill label="HTML/CSS/JS" />
                            </View>
                        </GlassCard>

                        <GlassCard style={styles.impactCard}>
                            <Text style={styles.impactNumber}>18</Text>
                            <Text style={styles.impactLabel}>Years Old & Building with Purpose</Text>
                        </GlassCard>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const SkillItem = ({ label }) => (
    <View style={styles.skillItem}>
        <View style={styles.dot} />
        <Text style={styles.skillLabel}>{label}</Text>
    </View>
);

const TechPill = ({ label }) => (
    <View style={styles.techPill}>
        <Text style={styles.techLabel}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: 32,
        paddingTop: 120,
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    scrollContentMobile: {
        padding: 20,
        paddingTop: 100,
    },
    headerSection: {
        marginBottom: 48,
    },
    headerSectionMobile: {
        marginBottom: 32,
    },
    label: {
        color: Theme.colors.primary,
        fontSize: 13,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 12,
    },
    title: {
        color: Theme.colors.textMain,
        fontSize: 44,
        fontWeight: '900',
        letterSpacing: -1,
    },
    titleMobile: {
        fontSize: 32,
        lineHeight: 40,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
    },
    gridMobile: {
        flexDirection: 'column',
    },
    mainContent: {
        flex: 2,
        minWidth: 350,
    },
    mainContentMobile: {
        minWidth: '100%',
        padding: 24,
    },
    sideContent: {
        flex: 1,
        minWidth: 300,
        gap: 24,
    },
    quote: {
        color: Theme.colors.textMain,
        fontSize: 22,
        fontWeight: '700',
        fontStyle: 'italic',
        marginBottom: 24,
        lineHeight: 32,
        opacity: 0.95,
    },
    paragraph: {
        color: Theme.colors.textMuted,
        fontSize: 17,
        lineHeight: 28,
        marginBottom: 20,
    },
    cardTitle: {
        color: Theme.colors.textMain,
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 20,
    },
    skillList: {
        gap: 12,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Theme.colors.primary,
    },
    skillLabel: {
        color: Theme.colors.textMain,
        fontSize: 15,
        fontWeight: '600',
    },
    techPills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    techPill: {
        backgroundColor: Theme.colors.primaryGlow,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.2)',
    },
    techLabel: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '700',
    },
    sideCard: {
        padding: 24,
    },
    impactCard: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        borderWidth: 2,
        borderColor: Theme.colors.primaryGlow,
    },
    impactNumber: {
        color: Theme.colors.primary,
        fontSize: 48,
        fontWeight: '900',
        marginBottom: 4,
    },
    impactLabel: {
        color: Theme.colors.textMuted,
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center',
    },
});

export default AboutScreen;
