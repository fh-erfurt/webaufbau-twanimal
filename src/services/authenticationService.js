import { config } from '../config';
import crypto from 'crypto';

/**
 * Verschlüsseln von eingegebenen Daten mit einem reversiblen Verschlüsselungs-Algorithmus
 */
function encryptData(data) {
	let cipher = crypto.createCipheriv('aes-256-cbc', config.jwt.encryptionKey, config.jwt.initialisationVector);
	let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
	encrypted += cipher.final('base64');

	return encrypted;
}

/**
 * Entschlüsseln von eingegebenen Daten mit einem reversiblen Verschlüsselungs-Algorithmus
 */
function decryptData(data) {
	let decipher = crypto.createDecipheriv('aes-256-cbc', config.jwt.encryptionKey, config.jwt.initialisationVector);
	let decrypted = decipher.update(data, 'base64', 'utf8');

	return JSON.parse(decrypted + decipher.final('utf8'));
}

/**
 * Speichern der verschlüsselten Daten im localStorage des Nutzers
 */
function storeSession(data) {
	const encrypted = encryptData(data);

	localStorage.setItem('session', encrypted);
}

/**
 * Abrufen der entschlüsselten Daten aus dem localStorage des Nutzers, wenn vorhanden
 */
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

/**
 * Entfernen der aktuellen Session-Daten aus des localStorage des Nutzers
 */
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
