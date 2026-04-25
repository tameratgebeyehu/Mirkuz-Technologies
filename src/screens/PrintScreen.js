import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrintScreen = () => {
    useEffect(() => {
        // In a web environment, we can trigger the print dialog automatically
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.printHeader}>
                    <Text style={styles.name}>TAMERAT GEBEYEHU</Text>
                    <Text style={styles.role}>Student Software Developer | Applied Mathematics</Text>
                    <Text style={styles.location}>Dodola, Ethiopia | tameratgebeyehu@gmail.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile Summary</Text>
                    <Text style={styles.bodyText}>
                        Dedicated student developer focused on building high-impact technology for education and agriculture
                        in low-resource communities. Specialized in offline-first architectures.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Key Projects</Text>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>Zemen Academy - Educational Platform</Text>
                        <Text style={styles.itemMeta}>230+ Active Users | 1,200+ Quizzes</Text>
                        <Text style={styles.bodyText}>Developed a native Android application providing offline access to educational content for Ethiopian students.</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.itemTitle}>SindeTrack - Agri-Record System</Text>
                        <Text style={styles.bodyText}>Building a data-driven tracking system for wheat production to optimize agricultural output in local districts.</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                    <Text style={styles.bodyText}>• AI Fundamentals (Google)</Text>
                    <Text style={styles.bodyText}>• AI for Business Professionals (HP LIFE / HP Foundation)</Text>
                    <Text style={styles.bodyText}>• Professional Networking for Career Growth (HP LIFE / HP Foundation)</Text>
                    <Text style={styles.bodyText}>• Blue Ocean Student Entrepreneurs Mini-Course (Blue Ocean / CredsVerse)</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Generated from Personal Portfolio Website</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // White background for printing
    },
    scrollContent: {
        padding: 40,
    },
    printHeader: {
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        paddingBottom: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000',
        marginBottom: 4,
    },
    role: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 4,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    item: {
        marginBottom: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    itemMeta: {
        fontSize: 13,
        color: '#444',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    bodyText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    footer: {
        marginTop: 40,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 11,
        color: '#999',
    },
});

export default PrintScreen;
