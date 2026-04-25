import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import Svg, { Circle, Rect, Path, Defs, RadialGradient, Stop, Pattern } from 'react-native-svg';
import { Theme } from '../theme';

const Background = () => {
    const { width, height } = useWindowDimensions();
    const anim1 = useRef(new Animated.Value(0)).current;
    const particleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim1, { toValue: 1, duration: 20000, useNativeDriver: true }),
                Animated.timing(anim1, { toValue: 0, duration: 20000, useNativeDriver: true })
            ])
        ).start();

        Animated.loop(
            Animated.timing(particleAnim, { toValue: 1, duration: 30000, useNativeDriver: true })
        ).start();
    }, []);

    const transX = anim1.interpolate({ inputRange: [0, 1], outputRange: [-50, 55] });
    const transY = anim1.interpolate({ inputRange: [0, 1], outputRange: [-24, 24] });
    const rotate = particleAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: Theme.colors.background }]} />

            <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateX: transX }, { translateY: transY }] }]}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <RadialGradient id="g1" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor={Theme.colors.primary} stopOpacity="0.15" />
                            <Stop offset="100%" stopColor={Theme.colors.primary} stopOpacity="0" />
                        </RadialGradient>
                        <RadialGradient id="g2" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor={Theme.colors.secondary} stopOpacity="0.12" />
                            <Stop offset="100%" stopColor={Theme.colors.secondary} stopOpacity="0" />
                        </RadialGradient>
                        <RadialGradient id="g3" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor={Theme.colors.tertiary} stopOpacity="0.1" />
                            <Stop offset="100%" stopColor={Theme.colors.tertiary} stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Circle cx={width * 0.14} cy={height * 0.12} r={width * 0.5} fill="url(#g1)" />
                    <Circle cx={width * 0.84} cy={height * 0.3} r={width * 0.45} fill="url(#g2)" />
                    <Circle cx={width * 0.62} cy={height * 0.82} r={width * 0.38} fill="url(#g3)" />
                </Svg>
            </Animated.View>

            <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ rotate }] }]}>
                <Svg height="100%" width="100%">
                    <Circle cx={width * 0.2} cy={height * 0.16} r="1.5" fill={Theme.colors.primary} opacity="0.38" />
                    <Circle cx={width * 0.73} cy={height * 0.42} r="2" fill={Theme.colors.secondary} opacity="0.26" />
                    <Circle cx={width * 0.28} cy={height * 0.76} r="1.3" fill={Theme.colors.accent} opacity="0.18" />
                    <Circle cx={width * 0.88} cy={height * 0.18} r="1.8" fill={Theme.colors.primaryStrong} opacity="0.28" />
                    <Circle cx={width * 0.58} cy={height * 0.62} r="1.6" fill={Theme.colors.tertiary} opacity="0.22" />
                    <Path
                        d={`M ${width * 0.12} ${height * 0.6} C ${width * 0.28} ${height * 0.52}, ${width * 0.4} ${height * 0.68}, ${width * 0.56} ${height * 0.58}`}
                        stroke={Theme.colors.line}
                        strokeWidth="1"
                        strokeDasharray="6 12"
                        fill="none"
                        opacity="0.35"
                    />
                </Svg>
            </Animated.View>

            <View style={[StyleSheet.absoluteFill, { opacity: 0.05 }]}>
                <Svg width="100%" height="100%">
                    <Defs>
                        <Pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                            <Path d="M 48 0 L 0 0 0 48" fill="none" stroke={Theme.colors.textMain} strokeWidth="0.5" />
                        </Pattern>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#grid)" />
                </Svg>
            </View>

            <View style={styles.vignette} />
        </View>
    );
};

const styles = StyleSheet.create({
    vignette: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
});

export default Background;
