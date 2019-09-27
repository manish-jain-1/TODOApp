// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import { api } from './api';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
// import {
//     SafeAreaView,
//     StyleSheet,
//     ScrollView,
//     Platform,
//     View,
//     Text,
//     Button,
//     StatusBar,
//     FlatList,
//     TouchableWithoutFeedback,
//     TouchableOpacity,
//     TouchableHighlight,
//     KeyboardAvoidingView
// } from 'react-native';

// class AddTodo extends Component {

//   static propTypes = {
//     componentId: PropTypes.string,
//     postToUpdate: PropTypes.object
//   };

//   constructor(props) {
//     super(props);
//     Navigation.events().bindComponent(this);
//     const {postToUpdate} = this.props;
//     this.state =  {
//       title: postToUpdate && postToUpdate.title,
//       text: postToUpdate && postToUpdate.text
//     }
//   }

//   onChangeTitle = title => {
//     this.setState({title});
//     Presenter.onChangeTitle({
//       componentId: this.props.componentId,
//       title
//     });
//   };

//   onChangeText = text => {
//     this.setState({text})
//   };

//   onSavePressed = () => {
//     const {componentId, postToUpdate} = this.props;
//     Presenter.onSavePressed({
//       componentId: componentId,
//       title: this.state.title,
//       text: this.state.text,
//       postToUpdate
//     });
//   };

//   render() {
//     return (
//       <View>
//         <Text>Add ToDo Screen</Text>
//         <TextInput
//           value={this.state.title}
//           onChangeText={this.onChangeTitle}
//         />
//         <TextInput
//           value={this.state.text}
//           onChangeText={this.onChangeText}
//         />
//       </View>
//     );
//   }
// }

// export default AddPost;