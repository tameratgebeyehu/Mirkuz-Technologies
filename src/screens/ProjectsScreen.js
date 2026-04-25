import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const ProjectsScreen = () => {
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
                    <Text style={styles.label}>Portfolio</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Impact-Driven <Text style={{ color: Theme.colors.primary }}>Projects</Text></Text>
                    <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Building software that solves real problems in low-resource environments.</Text>
                </Animated.View>

                <Animated.View style={[styles.projectList, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    <ProjectCard
                        title="Zemen Academy"
                        tag="Educational Mobile App"
                        description="A native Android platform providing offline access to high-quality educational content. Designed to bridge the digital divide for students with limited internet connectivity."
                        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
                        metrics="230+ Active Users • 1.2k Quizzes"
                        isMobile={isMobile}
                    />

                    <ProjectCard
                        title="SindeTrack"
                        tag="Agri-Data System"
                        description="Developing a distributed record-tracking system for wheat production in rural Ethiopia. Focused on transparency and data-driven optimization for local agriculture."
                        image="https://images.unsplash.com/photo-1592982537447-6f29630327f1?q=80&w=1200"
                        metrics="Transforming Local Farming"
                        isMobile={isMobile}
                    />

                    <ProjectCard
                        title="FastCall"
                        tag="Utility & Accessibility"
                        description="Optimizing essential mobile interactions for low-end hardware. A focused tool for rapid communication in critical situations."
                        image="https://images.unsplash.com/photo-1556656793-062ff9878258?q=80&w=1200"
                        metrics="Lightweight Performance"
                        isMobile={isMobile}
                    />
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ProjectCard = ({ title, tag, description, image, metrics, isMobile }) => (
    <GlassCard style={[styles.card, isMobile && styles.cardMobile]}>
        <View style={[styles.imageContainer, isMobile && styles.imageContainerMobile]}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{tag}</Text>
            </View>
        </View>

        <View style={[styles.cardContent, isMobile && styles.cardContentMobile]}>
            <Text style={[styles.cardTitle, isMobile && styles.cardTitleMobile]}>{title}</Text>
            <Text style={styles.cardDescription}>{description}</Text>

            <View style={styles.cardFooter}>
                <View style={styles.metricsBadge}>
                    <Text style={styles.metricsText}>{metrics}</Text>
                </View>
                <TouchableOpacity style={styles.detailBtn}>
                    <Text style={styles.detailBtnText}>View Details →</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 18,
        maxWidth: 600,
        lineHeight: 28,
    },
    subtitleMobile: {
        fontSize: 16,
        lineHeight: 24,
    },
    projectList: {
        gap: 40,
        marginBottom: 60,
    },
    card: {
        padding: 0,
        overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardMobile: {
        flexDirection: 'column',
    },
    imageContainer: {
        flex: 1,
        minWidth: 350,
        height: 400,
        position: 'relative',
    },
    imageContainerMobile: {
        height: 250,
        minWidth: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    tagContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'rgba(10, 15, 29, 0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: Theme.borderRadius.sm,
        backdropFilter: 'blur(8px)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    tagText: {
        color: Theme.colors.textMain,
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    cardContent: {
        flex: 1,
        padding: 40,
        minWidth: 350,
        justifyContent: 'center',
    },
    cardContentMobile: {
        padding: 24,
        minWidth: '100%',
    },
    cardTitle: {
        color: Theme.colors.textMain,
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    cardTitleMobile: {
        fontSize: 24,
        marginBottom: 12,
    },
    cardDescription: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 32,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        flexWrap: 'wrap',
    },
    metricsBadge: {
        backgroundColor: Theme.colors.primaryGlow,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: Theme.borderRadius.full,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    metricsText: {
        color: Theme.colors.primary,
        fontSize: 13,
        fontWeight: '700',
    },
    detailBtnText: {
        color: Theme.colors.textMain,
        fontSize: 15,
        fontWeight: '700',
    },
});

export default ProjectsScreen;
