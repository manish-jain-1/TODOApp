/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, Fragment } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { api } from './api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Platform,
    View,
    Text,

    Button,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
    KeyboardAvoidingView,
    TextInput,
    Linking
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const tasks1 = 
    [{
            id: '1',
            title: 'get banana',
            completed: 0,
            assignedTo: 'manish',
            dueBy: '1/1/2019'
        },
        {
          id: '2',
          title: 'get oragne',
          completed: 0,
          assignedTo: 'manish',
          dueBy: '1/1/2019'
        }
    ];

function Separator() {
  return <View style={styles.separator} />;
}

function Item({ props, id, title, dueBy, assignedTo }) {
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
  
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
      this.setState({
        avatarSource: source,
      });
    }
  });
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Details',  {
          id: id,
          otherParam: {id, title, dueBy, assignedTo},
        })} style={styles.item}>
          <View>
          <View style={styles.cellContainer}>
          <Text>Task:</Text><Text style={[styles.subTitle, styles.mt5]}>{title}</Text>
          </View>
          <Separator />
          <View style={styles.cellContainer}>
          <Text>Due By:</Text><Text style={[styles.subTitle, styles.mt5]}>{dueBy}</Text>
          <Text>Assigned To:</Text><Text style={[styles.subTitle, styles.mt5]}>{assignedTo}</Text>
          </View>
          </View>
        </TouchableOpacity>
    );
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  };
  async componentDidMount() {
    let tasks = await api.getTasks();  
    this.setState((prevState, props) => (
      {
        tasks: tasks
      }
    )
    );
  };
 
  render() {
    Geolocation.getCurrentPosition(info => console.log(info));
      return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.tasks}
                        renderItem={({ item }) => <Item props={this.props} title={item.title} dueBy={item.dueBy} assignedTo={item.assignedTo}/>}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
            </ScrollView>
            // {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            // <Text>Home Screen</Text>
            // <Button
            // title="Go to Details"
            // onPress={() => this.props.navigation.navigate('Details')}
            // />
            // </View> */}
      );
    }
  }
  
  class DetailsScreen extends React.Component {
    setDate = (event, date) => {
      if (date !== undefined) {
        // timeSetAction
      }
    }
    render() {
      const { navigation } = this.props;
      const id = navigation.getParam('id', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', null);
      const d = new Date(otherParam.dueBy);

      return (
        <KeyboardAvoidingView style={styles.detailContainer}>
          <Text style={styles.title}>Details Screen</Text>
          <Text style={styles.marginTop}>Task:</Text><TextInput style={styles.formfield}>{otherParam.title}</TextInput>
          <Text style={styles.marginTop}>Due By:</Text>
          <DateTimePicker value={d}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate}/>
          {/* <TextInput style={styles.formfield}>{otherParam.dueBy}</TextInput> */}
          <Text style={styles.marginTop}>Assigned To:</Text><TextInput style={styles.formfield}>{otherParam.assignedTo}</TextInput>
        <View style={styles.marginTop}>
          <View style={styles.formfield}>
          <WebView
       source={{ uri: 'https://infinite.red' }}
       style={{ marginTop: 20, height: 100 }}
      />
        </View>
        <View style={styles.marginTop}>
 
 <Button title='Click Here To Open Website URL' onPress={ ()=> Linking.openURL('https://reactnativecode.com') } />

</View>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        /></View>
        </KeyboardAvoidingView>
      );
    }
  }
  
  const RootStack = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);
  
  export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tasks: []
      }
    }

    async componentDidMount() {
      //  
    };
    render() {
      return <AppContainer />;
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    detailContainer: { 
      flex: 1, 
      marginTop: 20,
      alignItems: 'stretch', 
      justifyContent: 'flex-start' 
    },
    cellContainer: { 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-between' 
    },
    item: {
      backgroundColor: 'lightgrey',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    formfield: {
      // flex: 1,
      // flexDirection: 'row',
      marginTop: 10,
      borderColor: 'gray',
      borderWidth: 1,
      height: 40,
      // width: 320

    },
    title: {
      fontSize: 32,
    },
    subTitle: {
      fontSize: 20,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    buttonGoBack: {
      marginTop: 30
    },
    marginTop: {
      marginTop: 20
    },
    mt5: {
      marginTop: -5
    }
  });

// const App = () => {
//   return (
//     <Fragment>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;