import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Github, CheckCircle2 } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const ContactScreen = () => {
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
                    <Text style={styles.label}>Connection</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Let’s <Text style={{ color: Theme.colors.primary }}>Collaborate</Text></Text>
                    <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Open for research opportunities, university discussions, and high-impact technology projects.</Text>
                </Animated.View>

                <Animated.View style={[
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <View style={[styles.links, isMobile && styles.linksMobile]}>
                        <ContactLink
                            title="Professional Email"
                            value="tameratgebeyehu@gmail.com"
                            icon={<Mail color={Theme.colors.primary} size={24} />}
                            onPress={() => Linking.openURL('mailto:tameratgebeyehu@gmail.com')}
                        />

                        <ContactLink
                            title="Open Source"
                            value="github.com/Tame6"
                            icon={<Github color={Theme.colors.primary} size={24} />}
                            onPress={() => Linking.openURL('https://github.com/Tame6')}
                        />
                    </View>

                    <GlassCard style={styles.availabilityCard}>
                        <CheckCircle2 color="#22c55e" size={20} />
                        <Text style={styles.availabilityText}>Currently seeking Fall 2027 Scholarship Opportunities</Text>
                    </GlassCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ContactLink = ({ title, value, icon, onPress }) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1, minWidth: isMobile ? '100%' : 300 }}>
            <GlassCard style={[styles.linkCard, isMobile && styles.linkCardMobile]}>
                <View style={styles.iconBox}>
                    {icon}
                </View>
                <View style={isMobile && { flex: 1 }}>
                    <Text style={styles.linkTitle}>{title}</Text>
                    <Text style={[styles.linkText, isMobile && styles.linkTextMobile]}>{value}</Text>
                </View>
            </GlassCard>
        </TouchableOpacity>
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
        maxWidth: 900,
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
        fontSize: 18,
        lineHeight: 28,
    },
    subtitleMobile: {
        fontSize: 16,
        lineHeight: 24,
    },
    links: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
        marginBottom: 40,
    },
    linksMobile: {
        flexDirection: 'column',
    },
    linkCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        padding: 32,
    },
    linkCardMobile: {
        padding: 20,
        gap: 16,
    },
    iconBox: {
        width: 56,
        height: 56,
        backgroundColor: Theme.colors.primaryGlow,
        borderRadius: Theme.borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.2)',
    },
    linkTitle: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    linkText: {
        color: Theme.colors.textMain,
        fontSize: 18,
        fontWeight: '700',
    },
    linkTextMobile: {
        fontSize: 15,
    },
    availabilityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: 'rgba(56, 189, 248, 0.3)',
        backgroundColor: 'rgba(56, 189, 248, 0.05)',
    },
    availabilityText: {
        color: Theme.colors.textMain,
        fontSize: 15,
        fontWeight: '600',
    },
});

export default ContactScreen;
