import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/rebuild/screens/HomeScreen';
import AboutScreen from './src/rebuild/screens/AboutScreen';
import ProjectsScreen from './src/rebuild/screens/ProjectsScreen';
import CertificatesScreen from './src/rebuild/screens/CertificatesScreen';
import ContactScreen from './src/rebuild/screens/ContactScreen';
import ResearchScreen from './src/rebuild/screens/ResearchScreen';
import BlogScreen from './src/rebuild/screens/BlogScreen';
import PrintScreen from './src/rebuild/screens/PrintScreen';
import Header from './src/rebuild/components/Header';
import { Theme } from './src/rebuild/theme';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    header: (props) => <Header {...props} />,
                    contentStyle: { backgroundColor: Theme.colors.background }
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerTransparent: true }} />
                <Stack.Screen name="About" component={AboutScreen} />
                <Stack.Screen name="Projects" component={ProjectsScreen} />
                <Stack.Screen name="Certificates" component={CertificatesScreen} />
                <Stack.Screen name="Contact" component={ContactScreen} />
                <Stack.Screen name="Research" component={ResearchScreen} />
                <Stack.Screen name="Blog" component={BlogScreen} />
                <Stack.Screen name="Print" component={PrintScreen} options={{ header: () => null }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
