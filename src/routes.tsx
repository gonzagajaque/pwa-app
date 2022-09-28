import React from 'react';
import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Camera from './pages/Camera';
import Main from './pages/Main';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => <Feather name="home" size={20} />
                }}
                    name="Main"
                    component={Main}
                />
                <Tab.Screen options={{
                    tabBarIcon: ({ color }) => <Feather name="camera" size={20} />
                }}
                    name="Camera"
                    component={Camera}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}