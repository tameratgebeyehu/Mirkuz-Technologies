import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Code, FlaskConical, Layout } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const ResearchScreen = () => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
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
                    <Text style={styles.label}>Applied Science</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Research & <Text style={{ color: Theme.colors.primary }}>Learning</Text></Text>
                    <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Bridging the gap between mathematical theory and social impact.</Text>
                </Animated.View>

                <Animated.View style={[styles.grid, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <GlassCard style={[styles.researchCard, isMobile && styles.researchCardMobile]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={styles.iconBox}>
                                <Code color={Theme.colors.primary} size={24} />
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Software Engineering</Text>
                            </View>
                        </View>
                        <Text style={styles.cardHeader}>Offline-First Architectures</Text>
                        <Text style={styles.cardText}>
                            Deep dives into data structures, algorithms, and distributed systems specifically optimized for
                            low-bandwidth environments. Researching state synchronization models that survive extended
                            periods of total disconnection.
                        </Text>
                    </GlassCard>

                    <GlassCard style={[styles.researchCard, isMobile && styles.researchCardMobile]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={styles.iconBox}>
                                <FlaskConical color={Theme.colors.primary} size={24} />
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Applied Mathematics</Text>
                            </View>
                        </View>
                        <Text style={[styles.cardHeader, isMobile && styles.cardHeaderMobile]}>Agricultural Modeling</Text>
                        <Text style={styles.cardText}>
                            Exploring mathematical modeling for agricultural optimization and educational resource allocation.
                            Applying linear programming and statistical analysis to local farming datasets to predict
                            yield improvements.
                        </Text>
                    </GlassCard>

                    <GlassCard style={[styles.researchCard, isMobile && styles.researchCardMobile]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={styles.iconBox}>
                                <Layout color={Theme.colors.primary} size={24} />
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>Independent Study</Text>
                            </View>
                        </View>
                        <Text style={[styles.cardHeader, isMobile && styles.cardHeaderMobile]}>Low-Resource UX Patterns</Text>
                        <Text style={styles.cardText}>
                            Analyzing how user interfaces should adapt to limited hardware and specific cultural/linguistic
                            nuances in sub-Saharan Africa. Documentation of patterns that reduce cognitive load and data consumption.
                        </Text>
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
        padding: 24,
        paddingTop: 100,
    },
    headerSection: {
        marginBottom: 60,
    },
    headerSectionMobile: {
        marginBottom: 40,
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
        fontSize: 48,
        fontWeight: '900',
        marginBottom: 16,
        letterSpacing: -1,
    },
    titleMobile: {
        fontSize: 32,
        lineHeight: 40,
    },
    subtitle: {
        color: Theme.colors.textMuted,
        fontSize: 19,
        maxWidth: 600,
        lineHeight: 30,
    },
    subtitleMobile: {
        fontSize: 16,
        lineHeight: 24,
    },
    grid: {
        gap: 32,
    },
    researchCard: {
        padding: 40,
    },
    researchCardMobile: {
        padding: 24,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconBox: {
        width: 48,
        height: 48,
        backgroundColor: Theme.colors.primaryGlow,
        borderRadius: Theme.borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.2)',
    },
    badge: {
        backgroundColor: 'rgba(129, 140, 248, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Theme.borderRadius.sm,
        borderWidth: 1,
        borderColor: Theme.colors.secondary,
    },
    badgeText: {
        color: Theme.colors.secondary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    cardHeader: {
        color: Theme.colors.textMain,
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    cardHeaderMobile: {
        fontSize: 22,
        marginBottom: 12,
    },
    cardText: {
        color: Theme.colors.textMuted,
        fontSize: 17,
        lineHeight: 28,
    },
});

export default ResearchScreen;
