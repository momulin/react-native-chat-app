import React, { Component } from 'react';
import { Appbar, Text, List } from 'react-native-paper';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Redirect } from 'react-router-native';
import { socket } from '../../shared/socketconnect';
import moment from 'moment';
import Textinput from '../../components/textinput';
class Room extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
		backtolist: false,
		messages: []
	};

	onBacktolist() {
		const that = this;
		socket.emit('leave', function() {
			that.setState({ backtolist: true, messages: [] });
			socket.removeAllListeners('newMessage');
		});
	}

	onSendmessage(msg) {
		socket.emit('createMessage', { text: msg }, function() {});
	}

	componentDidMount() {
		const params = { name: 'anonymous', room: this.props.location.state.id };

		socket.emit('join', params, function(err) {
			if (err) {
				alert(err);
			}
		});

		socket.on('newMessage', (getmessage) => {
			const formattedTime = moment(getmessage.createdAt).utcOffset(+8).format('h:mm a');
			const message = {
				from: getmessage.from,
				text: getmessage.text,
				createAt: formattedTime
			};
			let tempmsg = this.state.messages;
			tempmsg.push(message);
			this.setState({ messages: tempmsg });
		});
	}

	render() {
		const { messages } = this.state;
		if (this.state.backtolist) {
			return <Redirect to="/" />;
		}
		const chatmessages = messages.map((msg, index) => (
			<List.Item
				title={msg.text}
				key={index}
				description={msg.from + ' ' + msg.createAt}
				left={(props) => <List.Icon {...props} icon="person" />}
				onPress={() => {}}
			/>
		));

		return (
			<View style={styles.container}>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => this.onBacktolist()} />
					<Appbar.Content title={this.props.location.state.id} />
				</Appbar.Header>
				<ScrollView
					ref={(ref) => (this.scrollView = ref)}
					onContentSizeChange={(contentWidth, contentHeight) => {
						this.scrollView.scrollToEnd({ animated: true });
					}}
				>
					{chatmessages}
				</ScrollView>
				<Textinput style={styles.textinput} onSubmit={(msg) => this.onSendmessage(msg)} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	textinput: {
		alignSelf: 'flex-end'
	}
});

export default Room;
