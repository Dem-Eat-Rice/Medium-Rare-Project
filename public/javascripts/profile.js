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

  const form = document.getElementById("update-password-form");

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

  const lineBreak = document.createElement("br");


  changePassword.addEventListener("click", (event) => {
    event.preventDefault();

    form.appendChild(lineBreak);
    form.appendChild(passwordLabel);
    form.appendChild(password);
    form.appendChild(lineBreak);
    form.appendChild(confirmPasswordLabel);
    form.appendChild(confirmPassword);
    form.appendChild(lineBreak);
    form.appendChild(updatePasswordButton);
    document.getElementById("changePassword").appendChild(form);
  })
});
