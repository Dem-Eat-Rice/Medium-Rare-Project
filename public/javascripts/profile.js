// const e = require("express");

document.addEventListener("DOMContentLoaded", async () => {
  const editButton = document.getElementById("profile-button-edit");
  const deleteButton = document.getElementById("profile-button-delete");
  const changePassword = document.getElementById("profile-button-changepassword");

  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    const editUserInfo = document
      .querySelectorAll(".update-user")
      .forEach((input) => input.setAttribute("style", ""));
  });

  const passwordLabel = document.createElement("label")
  passwordLabel.innerHTML = "Enter a new password: ";
  const confirmPasswordLabel = document.createElement("label")
  confirmPasswordLabel.innerHTML = "Confirm your new password: ";

  const form = document.createElement("form");
  form.setAttribute("action", "/users/update-password");
  form.setAttribute("method", "post");

  const password = document.createElement("input");
  password.setAttribute("type", "text");
  password.setAttribute("name", "password");

  const confirmPassword = document.createElement("input");
  confirmPassword.setAttribute("type", "text");
  confirmPassword.setAttribute("name", "confirmPassword");

  const updatePasswordButton = document.createElement("button");
  updatePasswordButton.setAttribute("type", "submit");
  updatePasswordButton.setAttribute("id", "profile-button");
  updatePasswordButton.innerText = "Submit";

  changePassword.addEventListener("click", (event) => {
    event.preventDefault();

    form.appendChild(passwordLabel);
    form.appendChild(password);
    form.appendChild(document.createElement("br"));
    form.appendChild(confirmPasswordLabel);
    form.appendChild(confirmPassword);
    form.appendChild(document.createElement("br"));
    form.appendChild(updatePasswordButton);
    document.getElementById("changePassword").appendChild(form);
  })
});
