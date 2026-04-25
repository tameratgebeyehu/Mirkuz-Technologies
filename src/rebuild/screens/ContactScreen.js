import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Linking, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, Github, Mail } from 'lucide-react-native';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const channels = [
    {
        label: 'Email',
        value: 'tameratgebeyehu@gmail.com',
        helper: 'Best for admissions, scholarship, and collaboration inquiries.',
        url: 'mailto:tameratgebeyehu@gmail.com',
        icon: Mail,
    },
    {
        label: 'GitHub',
        value: 'github.com/Tame6',
        helper: 'Where I share code and technical artifacts.',
        url: 'https://github.com/Tame6',
        icon: Github,
    }
];

const interests = [
    'University admissions and scholarship opportunities',
    'Product and software conversations around offline-first systems',
    'Collaborative work in education or agricultural technology'
];

const ContactScreen = () => {
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
                    <Text style={styles.label}>Contact</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        Open to admissions conversations, thoughtful collaboration, and mission-aligned opportunities.
                    </Text>
                    <Text style={styles.subtitle}>
                        If you are interested in my work, the easiest path is to reach out directly by email. I am especially interested in conversations where technology and social impact genuinely intersect.
                    </Text>

                    <View style={styles.channelList}>
                        {channels.map((item) => (
                            <TouchableOpacity key={item.label} onPress={() => Linking.openURL(item.url)}>
                                <GlassCard style={styles.channelCard}>
                                    <View style={styles.channelIcon}>
                                        <item.icon size={22} color={Theme.colors.primary} />
                                    </View>
                                    <View style={styles.channelText}>
                                        <Text style={styles.channelLabel}>{item.label}</Text>
                                        <Text style={styles.channelValue}>{item.value}</Text>
                                        <Text style={styles.channelHelper}>{item.helper}</Text>
                                    </View>
                                    <ArrowUpRight size={18} color={Theme.colors.primary} />
                                </GlassCard>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <GlassCard style={styles.interestCard}>
                        <Text style={styles.interestLabel}>Especially glad to discuss</Text>
                        <View style={styles.interestList}>
                            {interests.map((item) => (
                                <View key={item} style={styles.interestItem}>
                                    <View style={styles.interestDot} />
                                    <Text style={styles.interestText}>{item}</Text>
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
    },
    channelList: {
        gap: 18,
        marginBottom: 22,
    },
    channelCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        padding: 24,
    },
    channelIcon: {
        width: 48,
        height: 48,
        borderRadius: Theme.borderRadius.md,
        backgroundColor: Theme.colors.primaryMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    channelText: {
        flex: 1,
    },
    channelLabel: {
        color: Theme.colors.textSoft,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 6,
    },
    channelValue: {
        color: Theme.colors.textMain,
        fontSize: 19,
        fontWeight: '800',
        marginBottom: 6,
    },
    channelHelper: {
        color: Theme.colors.textMuted,
        fontSize: 14,
        lineHeight: 22,
    },
    interestCard: {
        padding: 28,
    },
    interestLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 14,
    },
    interestList: {
        gap: 12,
    },
    interestItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    interestDot: {
        width: 8,
        height: 8,
        borderRadius: Theme.borderRadius.pill,
        backgroundColor: Theme.colors.secondary,
        marginTop: 8,
    },
    interestText: {
        flex: 1,
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
});

export default ContactScreen;
