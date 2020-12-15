"use strict";
import express from "express";
import fetch from 'node-fetch';
let app = express();
const port = 3000;
app.use(express.static("public"));
app.set("view engine", "hbs");
app.get("/", function (request, response) {
  fetch("https://reqres.in/api/users")
    .then(data => {
      return data.json()
    })
    .then(contacts => {
      const html = contacts.data.map(contactTemplate).join("");
      response.render("contact.hbs", { content: html });

    });
});
app.get("/users/2", function (request, response) {
  fetch("https://reqres.in/api/users?page=2")
    .then(data => {
      return data.json();
    })
    .then(body => {
      response.send(body);
    });
});
function contactTemplate(user) {
  return `
  <div class="col mb-4">
  <div class="card ">
    <img src="${user.avatar}" class="card-img-top img-thumbnail" alt="...">
    <div class="card-body">
      <h5 class="card-title">Name</h5>
      <p class="card-text">${user.first_name}</p>
      <h5 class="card-title">Email</h5>
      <p class="card-text">${user.email}</p>
    </div>
  </div>
</div>`;
}
app.listen(port, console.log(`server is listening on ${port}`));
