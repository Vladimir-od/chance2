"use strict";
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import fetch from 'node-fetch';

const csvWriter = createCsvWriter({
    path: 'apiContacts.csv',
    header: [
        { id: 'id', title: 'Id' },
        { id: 'email', title: 'Email' },
        { id: 'first_name', title: 'First_Name' },
        { id: 'last_name', title: 'Last_Name' },
    ]
});
const record = fetch("https://reqres.in/api/users").then(data => {
    return data.json();
}).then(body => {
    return body.data;
});
const record2 = fetch("https://reqres.in/api/users?page=2").then(data => {
    return data.json();
}).then(body => {
    return body.data;
});
async function writeRecords() {
    await csvWriter.writeRecords(await record);
    await csvWriter.writeRecords(await record2);
}
await writeRecords();
