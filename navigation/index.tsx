/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { ColorSchemeName, Pressable } from 'react-native';
import ExportButton from '../components/ExportButton/ExportButton';
import ImportButton from '../components/ImportButton/ImportButton';
import styles from './navigation.module.scss'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddPlantModal from '../screens/AddPlantModal/AddPlantModal';
import EditPlantModal from '../screens/EditPlantModal/EditPlantModal';
import NotFoundScreen from '../screens/NotFoundScreen';
import { PlantDetailScreen } from '../screens/PlantDetailScreen/PlantDetailScreen';
import PlantScreen from '../screens/PlantScreen/PlantScreen';
import PropertyModal from '../screens/PropertyModal/PropertyModal';
import SeedScreen from '../screens/SeedScreen/SeedScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { CustomIcon } from '../components/CustomIcon/CustomIcon';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} initialParams={{ id: '0' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="AddPlantModal" component={AddPlantModal} options={{title: "Add a new Plant"}}/>
        <Stack.Screen name="EditPlantModal" component={EditPlantModal}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Plants"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Plants"
        component={PlantScreen}
        options={({ navigation }: RootTabScreenProps<'Plants'>) => ({
          title: 'Plants',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View style={styles.navigationHeaderContainer}>
            <ExportButton/>
              <ImportButton/>

              
              <CustomIcon onPress={() => navigation.navigate('AddPlantModal')}  name="plus-circle" marginRight={15}/>

            </View>
          ),
        })}
      />

      <BottomTab.Screen
        name="Seeds"
        component={SeedScreen}
        options={{
          title: 'Seeds',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; onPress: (() => void) | undefined}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
