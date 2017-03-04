import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import CookieManager from 'react-native-cookies';
import { connect } from 'react-redux';

import { obtainAccessToken } from '../../actions/mainActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
});

class LoginRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit() {
    this.props.onObtainAccessToken(this.state.username, this.state.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={this.state.username}
          onChangeText={(text) => { this.setState({ username: text }) }}/>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(text) => { this.setState({ password: text }) }}/>
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.main.accessToken,
});

const mapDispatchToProps = {
  onObtainAccessToken: obtainAccessToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);
