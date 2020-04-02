import { ajax } from 'rxjs/ajax';

import { API_URL } from './config';
export class HttpService {

    static get(url, headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer' }) {
        return ajax({
            url: `${API_URL}${url}`,
            headers,
            method: 'GET',
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer' }) {
        return ajax({
            url: `${API_URL}${url}`,
            method: 'POST',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // post
    static put(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer' }) {
        return ajax({
            url: `${API_URL}${url}`,
            method: 'PUT',
            body,
            headers,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // put

    static delete(url, body, headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer' }) {
        return ajax({
            url: `${API_URL}${url}`,
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