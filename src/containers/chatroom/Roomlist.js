import React, { Component } from 'react';
import { Text, List, IconButton, Colors } from 'react-native-paper';
import { socket } from '../../shared/socketconnect';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import Searchbar from '../../components/searchbar';
import { Redirect } from 'react-router-native';
import DialogInput from 'react-native-dialog-input';

class Roomlist extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		rooms: [],
		refreshingroom: false,
		enteringroom: false,
        isDialogVisible: false,
        enterroomname: '',
        firstQuery: ''
	};
	
	componentDidMount() {
        this.refreshroomlist();
    }

    _onRefresh = () => {
        this.setState({ refreshingroom: true });
        this.refreshroomlist();
    };

    _onEnterroom(room) {
		this.setState({ enteringroom: true, enterroomname: room });
	}

	_onShowDialog(isshow) {
		this.setState({ isDialogVisible: isshow });
	}

	refreshroomlist() {
		const that = this;
		socket.emit('getRoomList', function(rooms) {
			that.setState({ rooms, refreshingroom: false });
		});
	}

	render() {
		if (this.state.enteringroom) {
			return (
				<Redirect
					to={{
						pathname: '/room',
						state: { id: this.state.enterroomname }
					}}
				/>
			);
		}
		const { firstQuery } = this.state;
		const listroom = this.state.rooms
			.filter((room) => room.includes(firstQuery))
			.map((room) => (	
				<List.Item
					style={styles.items}
					key={room}
					title={room}
					left={(props) => <List.Icon {...props} icon="favorite" />}
					onPress={() => this._onEnterroom(room)}
				/>
			));
			
		return (
			<View style={styles.container}>
				<Searchbar
					onChangeText={(query) => {
						this.setState({ firstQuery: query });
					}}
					value={firstQuery}
				/>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={this.state.refreshingroom} onRefresh={this._onRefresh} />
					}
				>
					{listroom}
				</ScrollView>
				<IconButton
					style={styles.addbtn}
					icon="add-circle"
					size={30}
					onPress={() => this._onShowDialog(true)}
				/>
				<DialogInput
					isDialogVisible={this.state.isDialogVisible}
					title={'請輸入房名'}
					submitInput={(inputText) => {
						this._onEnterroom(inputText);
					}}
					closeDialog={() => {
						this._onShowDialog(false);
					}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	items: {
		padding: 0
	},
	addbtn: {
		alignSelf: 'flex-end'
	}
});
export default Roomlist;
