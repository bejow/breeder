/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, View } from 'react-native';
import { ColorSchemeName } from 'react-native';
import ExportButton from '../components/ExportButton/ExportButton';
import ImportButton from '../components/ImportButton/ImportButton';
import styles from './navigation.module.scss';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import EditPlantModal from '../screens/EditPlantModal/EditPlantModal';
import PlantDetailScreen from '../screens/PlantDetailScreen/PlantDetailScreen';
import PlantScreen from '../screens/PlantScreen/PlantScreen';
import SeedScreen from '../screens/SeedScreen/SeedScreen';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { CustomIcon } from '../components/CustomIcon/CustomIcon';
import AddSeedModal from '../screens/AddSeedModal/AddSeedModal';
import { TabBarIcon } from './TabBarIcon';
import SeedDetailScreen from '../screens/SeedDetailScreen/SeedDetailScreen';
import CreateFolderButton from '../components/CreateFolderButton/CreateFolderButton';
import SeedlingIcon from '../assets/icons/SeedlingIcon';
import SeedsIcon from '../assets/icons/SeedsIcon';
import ExportScreen from '../screens/ExportScreen/ExportScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function PlantStack() {
  return (
    <Stack.Navigator screenOptions={{ contentStyle: {backgroundColor: '#fff', paddingHorizontal: 8}}} initialRouteName="PlantScreen">
      <Stack.Screen
        name="PlantScreen"
        component={PlantScreen}
        options={({ navigation }) => ({
          title: 'Plants',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon size={30} name="code" color={color} />,
          headerRight: () => (
            <View style={styles.navigationHeaderContainer}>
              <ExportButton />
              <ImportButton />
              <CreateFolderButton />
              <CustomIcon onPress={() => navigation.navigate('EditPlantModal')} name="plus-circle" />
            </View>
          ),
        })}
      />
      <Stack.Screen name="PlantDetailScreen" component={PlantDetailScreen} initialParams={{ id: '0' }} />
      <Stack.Screen name="EditPlantModal" component={EditPlantModal} />
      <Stack.Screen name="ExportScreen" component={ExportScreen}   options={({ navigation }) => ({
          title: 'Export',})}/>
    </Stack.Navigator>
  );
}

function SeedStack() {
  return (
    <Stack.Navigator initialRouteName="SeedScreen">
      <Stack.Screen name="SeedDetailScreen" component={SeedDetailScreen} initialParams={{ id: '0' }} />
      <Stack.Screen name="AddSeedModal" component={AddSeedModal} options={{ title: 'Add Seeds' }} />
      <Stack.Screen
        name="SeedScreen"
        component={SeedScreen}
        options={({ navigation }) => ({
          title: 'Seeds',
          headerRight: () => (
            <View style={styles.navigationHeaderContainer}>
              <ExportButton />
              <ImportButton />
              <CreateFolderButton />
              <CustomIcon onPress={() => navigation.navigate('AddSeedModal')} name="plus-circle" />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Plants"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Plants"
        component={PlantStack}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <SeedlingIcon width={30} height={30} fill={color} />,
        }}
      />

      <BottomTab.Screen
        name="Seeds"
        component={SeedStack}
        options={{
          tabBarIcon: ({ color }: { color: string }) => <SeedsIcon width={25} height={25} fill={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
