import React, { useRef } from 'react';
import { StyleSheet, Animated, Platform } from 'react-native';
import { Theme } from '../theme';

const GlassCard = ({ children, style }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onHoverIn = () => {
        if (Platform.OS === 'web') {
            Animated.spring(scaleAnim, { toValue: 1.01, friction: 6, useNativeDriver: true }).start();
        }
    };

    const onHoverOut = () => {
        if (Platform.OS === 'web') {
            Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }).start();
        }
    };

    return (
        <Animated.View
            style={[styles.card, { transform: [{ scale: scaleAnim }] }, style]}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Theme.colors.glassBg,
        borderRadius: Theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: Theme.colors.glassBorder,
        padding: 24,
        overflow: 'hidden',
        ...Theme.shadows.card,
        ...Platform.select({
            web: {
                backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 60px rgba(1, 9, 12, 0.32)',
            }
        })
    },
});

export default GlassCard;
