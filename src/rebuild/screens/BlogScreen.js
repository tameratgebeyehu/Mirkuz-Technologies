import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Theme } from '../theme';
import GlassCard from '../components/GlassCard';
import Background from '../components/Background';

const posts = [
    {
        status: 'Essay direction',
        title: 'Scale versus significance',
        excerpt: 'What changes when software is measured by resilience and usefulness rather than by assumptions imported from better connected markets.'
    },
    {
        status: 'Field reflection',
        title: 'What education products reveal about trust',
        excerpt: 'Designing for students and teachers taught me that confidence, clarity, and continuity are as important as feature lists.'
    },
    {
        status: 'Systems note',
        title: 'Why agricultural transparency is also a product problem',
        excerpt: 'Reliable record-keeping depends on interface decisions, workflow fit, and data practices that people can actually maintain.'
    }
];

const BlogScreen = () => {
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
                    <Text style={styles.label}>Writing and reflection</Text>
                    <Text style={[styles.title, isMobile && styles.titleMobile]}>
                        Ideas I am turning into longer-form writing.
                    </Text>
                    <Text style={styles.subtitle}>
                        This section captures the themes I want my writing to cover: product design under constraint, educational access, agricultural systems, and careful technical optimism.
                    </Text>

                    <View style={styles.list}>
                        {posts.map((post) => (
                            <GlassCard key={post.title} style={styles.card}>
                                <Text style={styles.status}>{post.status}</Text>
                                <Text style={styles.postTitle}>{post.title}</Text>
                                <Text style={styles.excerpt}>{post.excerpt}</Text>
                            </GlassCard>
                        ))}
                    </View>

                    <GlassCard style={styles.noteCard}>
                        <Text style={styles.noteLabel}>Publishing note</Text>
                        <Text style={styles.noteTitle}>The writing layer of this portfolio is still growing.</Text>
                        <Text style={styles.noteBody}>
                            For now, these themes show the kinds of questions I want to keep articulating in public as the work deepens and the portfolio evolves.
                        </Text>
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
    list: {
        gap: 18,
        marginBottom: 22,
    },
    card: {
        padding: 28,
    },
    status: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    postTitle: {
        color: Theme.colors.textMain,
        fontSize: 26,
        fontWeight: '800',
        lineHeight: 32,
        marginBottom: 12,
    },
    excerpt: {
        color: Theme.colors.textMuted,
        fontSize: 16,
        lineHeight: 25,
    },
    noteCard: {
        padding: 28,
    },
    noteLabel: {
        color: Theme.colors.primary,
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
        marginBottom: 10,
    },
    noteTitle: {
        color: Theme.colors.textMain,
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 32,
        marginBottom: 12,
    },
    noteBody: {
        color: Theme.colors.textMuted,
        fontSize: 15,
        lineHeight: 24,
    },
});

export default BlogScreen;
