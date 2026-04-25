import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Theme } from '../theme';

const Button = ({ title, onPress, type = 'primary', caption }) => (
    <TouchableOpacity
        style={[
            styles.btn,
            type === 'secondary' ? styles.secondary : type === 'ghost' ? styles.ghost : styles.primary
        ]}
        onPress={onPress}
    >
        <View style={styles.content}>
            <Text
                style={[
                    styles.text,
                    type === 'secondary' || type === 'ghost' ? styles.textSecondary : styles.textPrimary
                ]}
            >
                {title}
            </Text>
            {caption ? (
                <Text
                    style={[
                        styles.caption,
                        type === 'secondary' || type === 'ghost' ? styles.captionSecondary : styles.captionPrimary
                    ]}
                >
                    {caption}
                </Text>
            ) : null}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btn: {
        minHeight: 58,
        paddingHorizontal: 22,
        paddingVertical: 14,
        borderRadius: Theme.borderRadius.md,
        justifyContent: 'center',
        borderWidth: 1,
    },
    primary: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
        ...Theme.shadows.card,
    },
    secondary: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderColor: Theme.colors.glassBorder,
    },
    ghost: {
        backgroundColor: 'transparent',
        borderColor: Theme.colors.line,
    },
    content: {
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: 0.4,
    },
    caption: {
        marginTop: 2,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    textPrimary: { color: '#132027' },
    textSecondary: { color: Theme.colors.textMain },
    captionPrimary: { color: 'rgba(19, 32, 39, 0.72)' },
    captionSecondary: { color: Theme.colors.textSoft },
});

export default Button;
