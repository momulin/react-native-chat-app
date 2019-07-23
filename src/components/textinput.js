import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default class MyComponent extends React.Component {
	state = {
		text: ''
	};

	onSubmit() {
		this.props.onSubmit(this.state.text);
        this.setState({ text: '' });
	}

	render() {
		return (
			<TextInput
				label="Say"
				value={this.state.text}
				onChangeText={(text) => this.setState({ text })}
				onSubmitEditing={() => this.onSubmit()}
			/>
		);
	}
}
