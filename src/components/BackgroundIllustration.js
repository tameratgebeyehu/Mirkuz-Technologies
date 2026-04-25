import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, useWindowDimensions, Animated } from 'react-native';
import Svg, { Circle, Rect, Path, Defs, RadialGradient, Stop } from 'react-native-svg';
import { Theme } from '../theme';

const BackgroundIllustration = () => {
    const { width, height } = useWindowDimensions();

    // Animation valves for subtle movement
    const anim1 = useRef(new Animated.Value(0)).current;
    const anim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const createLoop = (val) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(val, {
                        toValue: 1,
                        duration: 8000 + Math.random() * 4000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(val, {
                        toValue: 0,
                        duration: 8000 + Math.random() * 4000,
                        useNativeDriver: true,
                    })
                ])
            ).start();
        };

        createLoop(anim1);
        createLoop(anim2);
    }, []);

    const trans1 = anim1.interpolate({
        inputRange: [0, 1],
        outputRange: [-40, 40],
    });

    const trans2 = anim2.interpolate({
        inputRange: [0, 1],
        outputRange: [30, -30],
    });

    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: Theme.colors.background }]} />

            <Animated.View style={[
                StyleSheet.absoluteFill,
                {
                    opacity: 0.6,
                    transform: [{ translateX: trans1 }, { translateY: trans2 }]
                }
            ]}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <RadialGradient id="glow1" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor={Theme.colors.primary} stopOpacity="0.15" />
                            <Stop offset="100%" stopColor={Theme.colors.primary} stopOpacity="0" />
                        </RadialGradient>
                        <RadialGradient id="glow2" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor={Theme.colors.secondary} stopOpacity="0.1" />
                            <Stop offset="100%" stopColor={Theme.colors.secondary} stopOpacity="0" />
                        </RadialGradient>
                        <RadialGradient id="glow3" cx="50%" cy="50%" rx="50%" ry="50%">
                            <Stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
                            <Stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>

                    {/* Mesh Gradient Effect with Large Blurred Circles */}
                    <Circle cx={width * 0.2} cy={height * 0.2} r={Math.max(width, height) * 0.5} fill="url(#glow1)" />
                    <Circle cx={width * 0.8} cy={height * 0.7} r={Math.max(width, height) * 0.4} fill="url(#glow2)" />
                    <Circle cx={width * 0.5} cy={height * 0.4} r={Math.max(width, height) * 0.3} fill="url(#glow3)" />
                </Svg>
            </Animated.View>

            {/* Subtle Grid Overlay */}
            <View style={[StyleSheet.absoluteFill, { opacity: 0.03 }]}>
                <Svg width="100%" height="100%">
                    <Defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <Path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#grid)" />
                </Svg>
            </View>
        </View>
    );
};

export default BackgroundIllustration;
