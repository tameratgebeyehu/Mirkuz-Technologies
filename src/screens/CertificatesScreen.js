import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const CertificatesScreen = () => {
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

    const certificates = [
        {
            id: 'google-it',
            name: 'Google IT Support Professional',
            issuer: 'Google',
            url: 'https://coursera.org/verify/google-it-support',
        },
        {
            id: 'hp-life',
            name: 'HP LIFE Entrepreneurship training',
            issuer: 'HP Foundation',
            url: 'https://life-global.org/',
        },
        {
            id: 'blue-ocean',
            name: 'Blue Ocean Strategy Professional Certification',
            issuer: 'Blue Ocean Strategy',
            url: 'https://blueoceanstrategy.com/',
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]}>
                <Animated.View style={[
                    styles.headerSection,
                    isMobile && styles.headerSectionMobile,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <Text style={styles.label}>Credentials</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Professional <Text style={{ color: Theme.colors.primary }}>Certifications</Text></Text>
                </Animated.View>

                <Animated.View style={[
                    styles.grid,
                    isMobile && styles.gridMobile,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    {certificates.map((cert) => (
                        <GlassCard key={cert.id} style={styles.certCard}>
                            <View style={styles.iconBox}>
                                <Award color={Theme.colors.primary} size={28} />
                            </View>
                            <Text style={styles.certName}>{cert.name}</Text>
                            <Text style={styles.issuer}>Verified by {cert.issuer}</Text>
                            <View style={styles.line} />
                            <TouchableOpacity onPress={() => Linking.openURL(cert.url)}>
                                <Text style={styles.viewLink}>View Certificate →</Text>
                            </TouchableOpacity>
                        </GlassCard>
                    ))}
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
        gap: 20,
    },
    gridMobile: {
        flexDirection: 'column',
    },
    certCard: {
        flex: 1,
        minWidth: 300,
        maxWidth: 380,
    },
    iconBox: {
        width: 60,
        height: 60,
        backgroundColor: Theme.colors.primaryGlow,
        borderRadius: Theme.borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    certName: {
        color: Theme.colors.textMain,
        fontSize: 19,
        fontWeight: '800',
        lineHeight: 26,
        marginBottom: 8,
    },
    issuer: {
        color: Theme.colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 20,
    },
    line: {
        height: 1,
        backgroundColor: Theme.colors.border,
        marginBottom: 20,
    },
    viewLink: {
        color: Theme.colors.primary,
        fontSize: 14,
        fontWeight: '700',
    },
});

export default CertificatesScreen;
