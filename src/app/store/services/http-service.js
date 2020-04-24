import { ajax } from 'rxjs/ajax';

import { API_URL } from './config';
import { AuthStorage } from '../ducks/auth-duck/auth-storage';
export class HttpService {

    static get(url, headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthStorage.getToken()}`}) {
        return ajax({
            url: `${API_URL}/api${url}`,
            headers,
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthStorage.getToken()}`}) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'POST',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // post
    static put(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthStorage.getToken()}`}) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'PUT',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // put

    static delete(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AuthStorage.getToken()}`}) {
        return ajax({
            url: `${API_URL}/api${url}`,
            method: 'DELETE',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // delete
}