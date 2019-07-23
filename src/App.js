/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider as PaperProvider, Text, BottomNavigation, Appbar } from 'react-native-paper';
import Chatroom from './containers/Chatroom.js';

const ChatroomRoute = () => <Chatroom />;
const ContactsRoute = () => <Text>Contacts</Text>;
const SettingsRoute = () => <Text>Settings</Text>;

class App extends Component {
	state = {
		index: 0,
		routes: [
			{ key: 'chatroom', title: 'Chatroom', icon: 'chat' },
			{ key: 'contacts', title: 'Contacts', icon: 'contacts' },
			{ key: 'settings', title: 'Settings', icon: 'settings' }
		]
	};
	_handleIndexChange = (index) => this.setState({ index });

	_renderScene = BottomNavigation.SceneMap({
		chatroom: ChatroomRoute,
		contacts: ContactsRoute,
		settings: SettingsRoute
	});

	render() {
		return (
			<PaperProvider>
				<BottomNavigation
					navigationState={this.state}
					onIndexChange={this._handleIndexChange}
					renderScene={this._renderScene}
				/>
			</PaperProvider>
		);
	}
}

export default App;
