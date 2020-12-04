document.addEventListener("DOMContentLoaded", async () => {
  const editButton = document.getElementById("profile-button-edit");
  const deleteButton = document.getElementById("profile-button-delete");
  const username = document.getElementById("username").innerHTML;

  editButton.addEventListener("click", (event) => {
    const editUserInfo = document
      .querySelectorAll(".update-user")
      .forEach((input) => input.setAttribute("style", ""));
  });

  // deleteButton.addEventListener("click", event => {

  // });
});
