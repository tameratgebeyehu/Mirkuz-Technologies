import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Path, G, Defs, LinearGradient, Stop, Circle, Rect } from 'react-native-svg';
import { Theme } from '../theme';

const AnimatedG = Animated.createAnimatedComponent(G);

const HeroIllustration = ({ style }) => {
    const floatAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
                Animated.timing(floatAnim, { toValue: 0, duration: 4000, useNativeDriver: true })
            ])
        ).start();

        Animated.loop(
            Animated.timing(rotateAnim, { toValue: 1, duration: 20000, useNativeDriver: true })
        ).start();
    }, []);

    const translateY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
    });

    return (
        <View style={[styles.container, style]}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Svg width="400" height="400" viewBox="0 0 400 400">
                    <Defs>
                        <LinearGradient id="gradWarm" x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="0%" stopColor={Theme.colors.primary} />
                            <Stop offset="100%" stopColor={Theme.colors.secondary} />
                        </LinearGradient>
                        <LinearGradient id="gradCool" x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="0%" stopColor={Theme.colors.secondary} />
                            <Stop offset="100%" stopColor={Theme.colors.tertiary} />
                        </LinearGradient>
                    </Defs>

                    <AnimatedG transform={{ rotation: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 360] }), originX: 200, originY: 200 }}>
                        <G opacity="0.75">
                            <Path
                                d="M 200 72 L 306 132 L 306 252 L 200 316 L 94 252 L 94 132 Z"
                                fill="none"
                                stroke="url(#gradWarm)"
                                strokeWidth="3"
                            />
                            <Circle cx="200" cy="192" r="54" fill="url(#gradWarm)" opacity="0.2" />
                        </G>
                    </AnimatedG>

                    <Rect x="126" y="124" width="148" height="128" rx="26" fill="rgba(9, 22, 29, 0.9)" stroke={Theme.colors.glassBorder} />
                    <Rect x="150" y="148" width="100" height="18" rx="9" fill="url(#gradWarm)" opacity="0.8" />
                    <Rect x="150" y="181" width="64" height="10" rx="5" fill={Theme.colors.textMuted} opacity="0.85" />
                    <Rect x="150" y="202" width="86" height="10" rx="5" fill={Theme.colors.textSoft} opacity="0.65" />
                    <Rect x="150" y="226" width="54" height="36" rx="12" fill="rgba(244, 184, 96, 0.14)" stroke={Theme.colors.glassBorder} />
                    <Rect x="214" y="226" width="36" height="36" rx="12" fill="rgba(119, 214, 200, 0.12)" stroke="rgba(119, 214, 200, 0.18)" />
                    <Circle cx="108" cy="154" r="10" fill={Theme.colors.primary} opacity="0.95" />
                    <Circle cx="304" cy="248" r="12" fill={Theme.colors.secondary} opacity="0.9" />
                    <Circle cx="196" cy="332" r="8" fill={Theme.colors.accent} opacity="0.75" />
                    <Path
                        d="M 200 72 L 108 154 M 306 132 L 304 248 M 200 316 L 196 332"
                        stroke={Theme.colors.glassBorder}
                        strokeWidth="1"
                        strokeDasharray="6,6"
                        fill="none"
                    />
                    <Path
                        d="M 120 298 C 152 266, 238 266, 276 298"
                        stroke="url(#gradCool)"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.65"
                    />
                    <Path
                        d="M 96 120 C 154 88, 250 88, 308 120"
                        stroke={Theme.colors.line}
                        strokeWidth="1.5"
                        fill="none"
                    />
                </Svg>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HeroIllustration;
