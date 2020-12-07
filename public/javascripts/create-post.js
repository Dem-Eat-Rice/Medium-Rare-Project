const handleResponse = async (res) => {
  if (!res.ok) {
    throw res;
  }
  const data = await res.json();
  console.log(data);
  return data;
};

document.addEventListener("DOMContentLoaded", async () => {
  const newPostSubmitButton = document.getElementById("create-post-button");

  const newPostForm = document.querySelector(".new-post");

  newPostSubmitButton.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(newPostForm);

    const title = formData.get("postTitle");
    const postBody = formData.get("createNewPostTextArea");

    const res = await fetch("http://localhost:3000/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, postBody }),
    });

    handleResponse(res);

    newPostForm.reset();
  });
});
