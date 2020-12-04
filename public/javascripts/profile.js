// const editButton = document.getElementById("profile-button");
// const editFields = document.querySelector("update-user");

document.addEventListener("DOMContentLoaded", async () => {
  const editButton = document.getElementById("profile-button-edit");
  editButton.addEventListener("click", (event) => {
    const editUserInfo = document
      .querySelectorAll(".update-user")
      .forEach((input) => input.setAttribute("style", ""));
  });
});
