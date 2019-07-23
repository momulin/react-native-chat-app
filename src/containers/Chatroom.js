import React, { Component } from 'react';
import { NativeRouter, Route, Link } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import Roomlist from './chatroom/Roomlist';
import Room from './chatroom/Room';
class Chatroom extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<NativeRouter>
				<View style={styles.container}>
					<Route exact path="/" component={Roomlist} />
					<Route path="/room" component={Room} />
				</View>
			</NativeRouter>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Chatroom;

