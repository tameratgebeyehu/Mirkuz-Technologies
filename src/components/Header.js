import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Animated, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Menu, X } from 'lucide-react-native';
import { Theme } from '../theme';

const Header = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuAnim = React.useRef(new Animated.Value(-width)).current;

    const links = [
        { name: 'Home', target: 'Home' },
        { name: 'About', target: 'About' },
        { name: 'Projects', target: 'Projects' },
        { name: 'Certificates', target: 'Certificates' },
        { name: 'Research', target: 'Research' },
        { name: 'Blog', target: 'Blog' },
        { name: 'Contact', target: 'Contact' },
    ];

    const toggleMenu = () => {
        const toValue = isMenuOpen ? -width : 0;
        Animated.timing(menuAnim, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateTo = (target) => {
        if (isMenuOpen) toggleMenu();
        navigation.navigate(target);
    };

    return (
        <View style={styles.header}>
            <View style={[styles.container, isMobile && styles.containerMobile]}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}>
                    <Text style={styles.logo}>{isMobile ? 'T.G.' : 'Tamerat.'}</Text>
                </TouchableOpacity>

                {!isMobile ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.navLinks}
                    >
                        {links.map((link) => (
                            <TouchableOpacity
                                key={link.target}
                                onPress={() => navigation.navigate(link.target)}
                                style={styles.linkItem}
                            >
                                <Text style={[
                                    styles.navLink,
                                    route.name === link.target && styles.activeNavLink
                                ]}>
                                    {link.name}
                                </Text>
                                {route.name === link.target && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : (
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                        {isMenuOpen ? (
                            <X color={Theme.colors.textMain} size={28} />
                        ) : (
                            <Menu color={Theme.colors.textMain} size={28} />
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {/* Mobile Menu Overlay */}
            {isMobile && (
                <Animated.View style={[styles.mobileMenu, { transform: [{ translateX: menuAnim }] }]}>
                    <View style={styles.mobileNavLinks}>
                        {links.map((link) => (
                            <TouchableOpacity
                                key={link.target}
                                onPress={() => navigateTo(link.target)}
                                style={styles.mobileLinkItem}
                            >
                                <Text style={[
                                    styles.mobileNavLink,
                                    route.name === link.target && styles.activeNavLink
                                ]}>
                                    {link.name}
                                </Text>
                                {route.name === link.target && <View style={styles.mobileActiveIndicator} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'rgba(10, 15, 29, 0.7)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        maxWidth: 1200,
        alignSelf: 'center',
        width: '100%',
    },
    containerMobile: {
        paddingHorizontal: 24,
    },
    logo: {
        fontSize: 22,
        fontWeight: '800',
        color: Theme.colors.textMain,
        letterSpacing: -0.5,
    },
    navLinks: {
        flexDirection: 'row',
        gap: 32,
        alignItems: 'center',
    },
    linkItem: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    navLink: {
        color: Theme.colors.textMuted,
        fontWeight: '600',
        fontSize: 15,
        transition: 'color 0.2s ease',
    },
    activeNavLink: {
        color: Theme.colors.textMain,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -4,
        width: 12,
        height: 2,
        backgroundColor: Theme.colors.primary,
        borderRadius: 2,
    },
    menuButton: {
        padding: 12,
        marginRight: -12,
        zIndex: 1001,
    },
    mobileMenu: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(10, 15, 29, 1)',
        zIndex: 1000,
        padding: 40,
        backdropFilter: 'blur(20px)',
    },
    mobileNavLinks: {
        gap: 24,
    },
    mobileLinkItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    mobileNavLink: {
        color: Theme.colors.textMuted,
        fontSize: 24,
        fontWeight: '700',
    },
    mobileActiveIndicator: {
        position: 'absolute',
        left: -20,
        top: 24,
        width: 4,
        height: 20,
        backgroundColor: Theme.colors.primary,
        borderRadius: 2,
    }
});

export default Header;
