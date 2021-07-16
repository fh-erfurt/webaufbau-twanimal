import config from '../config';
import crypto from 'crypto';

function encryptData(data) {
	let cipher = crypto.createCipheriv('aes-256-cbc', config.jwt.encryptionKey, config.jwt.initialisationVector);
	let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
	encrypted += cipher.final('base64');

	return encrypted;
}

function decryptData(data) {
	let decipher = crypto.createDecipheriv('aes-256-cbc', config.jwt.encryptionKey, config.jwt.initialisationVector);
	let decrypted = decipher.update(data, 'base64', 'utf8');

	return JSON.parse(decrypted + decipher.final('utf8'));
}

function storeSession(data) {
	const encrypted = encryptData(data);

	localStorage.setItem('session', encrypted);
}

function getSession() {
	const data = localStorage.getItem('session');
	if (!data) return null;

	const decrypted = decryptData(data);
	if (!decrypted) return null;

	return decrypted;
}

function getUser() {
	const session = getSession();
	if (session) return session.user;
	return null;
}

function getAPIToken() {
	const session = getSession();
	if (session) return session.apiToken;
	return null;
}

function isAuthenticated() {
	return getUser() != null;
}

function logout() {
	localStorage.removeItem('session');
}

export const authenticationService = {
	storeSession,
	getSession,
	getUser,
	getAPIToken,
	isAuthenticated,
	logout,
};
