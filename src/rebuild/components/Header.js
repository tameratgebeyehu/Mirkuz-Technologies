import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Animated, Platform } from 'react-native';
import { Menu, X } from 'lucide-react-native';
import { Theme } from '../theme';

const Header = ({ navigation, route }) => {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAnim = useRef(new Animated.Value(0)).current;
    const currentRoute = route?.name;
    const links = ['About', 'Projects', 'Certificates', 'Research', 'Blog', 'Contact'];

    const toggleMenu = () => {
        const toValue = isMenuOpen ? 0 : 1;
        setIsMenuOpen(!isMenuOpen);
        Animated.spring(menuAnim, {
            toValue,
            friction: 8,
            tension: 40,
            useNativeDriver: true
        }).start();
    };

    const navigateTo = (screen) => {
        setIsMenuOpen(false);
        menuAnim.setValue(0);
        navigation.navigate(screen);
    };

    const translateY = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, 0]
    });

    const menuOpacity = menuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <View style={styles.header}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigateTo('Home')}>
                    <View>
                        <Text style={styles.logo}>TAMERAT<Text style={{ color: Theme.colors.primary }}>.</Text></Text>
                        {!isMobile ? <Text style={styles.logoMeta}>Offline-first product builder</Text> : null}
                    </View>
                </TouchableOpacity>

                {isMobile ? (
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuToggle}>
                        {isMenuOpen ? <X color={Theme.colors.textMain} size={28} /> : <Menu color={Theme.colors.textMain} size={28} />}
                    </TouchableOpacity>
                ) : (
                    <View style={styles.nav}>
                        {links.map((link) => (
                            <TouchableOpacity key={link} onPress={() => navigation.navigate(link)} style={styles.navItem}>
                                <Text style={[styles.navLink, currentRoute === link && styles.navLinkActive]}>{link}</Text>
                                <View style={[styles.navUnderline, currentRoute === link && styles.navUnderlineActive]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            {isMobile && (
                <Animated.View style={[styles.mobileOverlay, { opacity: menuOpacity, transform: [{ translateY }] }]}>
                    <View style={styles.mobileNav}>
                        {links.map((link) => (
                            <TouchableOpacity
                                key={link}
                                style={styles.mobileNavLinkBox}
                                onPress={() => navigateTo(link)}
                            >
                                <Text style={[styles.mobileNavLink, currentRoute === link && styles.mobileNavLinkActive]}>{link}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.mobileCta} onPress={() => navigateTo('Print')}>
                            <Text style={styles.mobileCtaTitle}>Academic profile</Text>
                            <Text style={styles.mobileCtaText}>View the concise print version for admissions and scholarship applications.</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 88,
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 18, 24, 0.72)',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.glassBorder,
        ...Platform.select({
            web: { backdropFilter: 'blur(15px)' }
        })
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 28,
        maxWidth: Theme.layout.wide,
        alignSelf: 'center',
        width: '100%',
        zIndex: 1001,
    },
    logo: { color: Theme.colors.textMain, fontSize: 24, fontWeight: '900', letterSpacing: 0.8 },
    logoMeta: { color: Theme.colors.textSoft, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.6, marginTop: 4 },
    nav: { flexDirection: 'row', gap: 32 },
    navItem: { alignItems: 'center', gap: 10 },
    navLink: { color: Theme.colors.textMuted, fontSize: 13, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.4 },
    navLinkActive: { color: Theme.colors.textMain },
    navUnderline: {
        width: 24,
        height: 2,
        borderRadius: Theme.borderRadius.pill,
        backgroundColor: 'transparent',
    },
    navUnderlineActive: {
        backgroundColor: Theme.colors.primary,
    },
    menuToggle: { padding: 4 },
    mobileOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 1100,
        backgroundColor: 'rgba(7, 18, 24, 0.98)',
        paddingTop: 122,
        paddingHorizontal: 24,
        zIndex: 999,
        ...Platform.select({
            web: { backdropFilter: 'blur(30px)' }
        })
    },
    mobileNav: { gap: 24 },
    mobileNavLinkBox: { borderBottomWidth: 1, borderBottomColor: Theme.colors.line, paddingBottom: 16 },
    mobileNavLink: { color: Theme.colors.textMain, fontSize: 30, fontWeight: '800' },
    mobileNavLinkActive: { color: Theme.colors.primary },
    mobileCta: {
        marginTop: 12,
        padding: 22,
        borderRadius: Theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: Theme.colors.glassBorder,
        backgroundColor: Theme.colors.surfaceSoft,
    },
    mobileCtaTitle: { color: Theme.colors.primary, fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 8 },
    mobileCtaText: { color: Theme.colors.textMuted, fontSize: 15, lineHeight: 24 },
});

export default Header;
