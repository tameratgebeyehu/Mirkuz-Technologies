import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const sections = [
    {
        title: 'Profile',
        content: [
            'Student software builder from Ethiopia focused on offline-first tools for education and agriculture.',
            'Interested in software engineering and applied mathematics as a way to build durable, context-aware systems.'
        ]
    },
    {
        title: 'Selected work',
        content: [
            'Zemen Academy: built an education-focused product shaped for offline-heavy learning environments.',
            'SindeTrack: explored record-tracking and transparency workflows for agricultural systems.'
        ]
    },
    {
        title: 'Strengthening now',
        content: [
            'Offline-first mobile system design',
            'Applied mathematics foundations',
            'Human-centered product thinking'
        ]
    },
    {
        title: 'Contact',
        content: [
            'Email: tameratgebeyehu@gmail.com',
            'GitHub: github.com/Tame6'
        ]
    }
];

const PrintScreen = () => (
    <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>Tamerat Gebeyehu</Text>
                <Text style={styles.info}>Software builder focused on offline-first systems | Ethiopia</Text>
                <Text style={styles.contact}>tameratgebeyehu@gmail.com | github.com/Tame6</Text>
            </View>

            {sections.map((section) => (
                <View key={section.title} style={styles.section}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.content.map((item) => (
                        <Text key={item} style={styles.body}>
                            - {item}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    scroll: {
        padding: 28,
        backgroundColor: '#f4efe6',
        minHeight: '100%',
    },
    page: {
        maxWidth: 920,
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#fffdf8',
        borderRadius: 24,
        padding: 38,
    },
    header: {
        marginBottom: 28,
        paddingBottom: 18,
        borderBottomWidth: 2,
        borderBottomColor: '#d7cbb5',
    },
    name: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1d2428',
        marginBottom: 8,
    },
    info: {
        fontSize: 16,
        fontWeight: '700',
        color: '#42545d',
        marginBottom: 4,
    },
    contact: {
        fontSize: 14,
        color: '#5b6b74',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#1d2428',
        marginBottom: 10,
        letterSpacing: 0.8,
    },
    body: {
        fontSize: 14,
        color: '#42545d',
        lineHeight: 23,
        marginBottom: 6,
    },
});

export default PrintScreen;
