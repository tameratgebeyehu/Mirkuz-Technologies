import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';

const BlogScreen = () => {
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

    const posts = [
        // ... same posts
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollContent, isMobile && styles.scrollContentMobile]}>
                <Animated.View style={[
                    styles.headerSection,
                    isMobile && styles.headerSectionMobile,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
                ]}>
                    <Text style={styles.label}>Journal</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>Blog & <Text style={{ color: Theme.colors.primary }}>Reflections</Text></Text>
                    <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Documenting my technical growth and reflections on building software.</Text>
                </Animated.View>

                <Animated.View style={[styles.list, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                    {posts.map((post, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.8}>
                            <GlassCard style={[styles.postCard, isMobile && styles.postCardMobile]}>
                                <Text style={styles.postDate}>{post.date}</Text>
                                <Text style={[styles.postTitle, isMobile && styles.postTitleMobile]}>{post.title}</Text>
                                <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                                <View style={styles.footer}>
                                    <Text style={styles.readMore}>Read Full Post →</Text>
                                </View>
                            </GlassCard>
                        </TouchableOpacity>
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
    list: {
        gap: 32,
        marginBottom: 60,
    },
    postCard: {
        padding: 40,
    },
    postCardMobile: {
        padding: 24,
    },
    postDate: {
        color: Theme.colors.primary,
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    postTitle: {
        color: Theme.colors.textMain,
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 16,
        lineHeight: 34,
    },
    postTitleMobile: {
        fontSize: 20,
        lineHeight: 28,
    },
    postExcerpt: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 24,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        paddingTop: 24,
    },
    readMore: {
        color: Theme.colors.textMain,
        fontSize: 15,
        fontWeight: '700',
    },
});

export default BlogScreen;
