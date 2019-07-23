window.navigator.userAgent = 'react-native';
import io from 'socket.io-client';
console.ignoredYellowBox = [ 'Remote debugger' ];
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

const url = 'ws://chat-room-sc.herokuapp.com/';
const options = {
	transports: [ 'websocket' ]
};
export const socket = io(url, options);
