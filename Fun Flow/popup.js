document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generate");
  const categorySelect = document.getElementById("category");
  const contentContainer = document.getElementById("content");

  generateButton.addEventListener("click", function () {
    const category = categorySelect.value;
    fetchContent(category);
  });

  function fetchContent(category) {
    let apiUrl;

    switch (category) {
      case "joke":
        apiUrl = "https://v2.jokeapi.dev/joke/Any";
        break;
      case "shayari":
        apiUrl = "https://api.countapi.xyz/hit/shayariapi.com";
        break;
      case "motivation":
        apiUrl = "https://api.quotable.io/random";
        break;
      default:
        contentContainer.textContent = "Invalid category selected.";
        return;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let content;

        switch (category) {
          case "joke":
            content =
              data.type === "twopart"
                ? `${data.setup} ${data.delivery}`
                : data.joke;
            break;
          case "shayari":
            content = data.shayari;
            break;
          case "motivation":
            content = `${data.content} - ${data.author}`;
            break;
        }

        contentContainer.textContent = content;
      })
      .catch((error) => {
        console.error(`Error fetching ${category}:`, error);
        contentContainer.textContent = `Failed to fetch ${category}. Please try again.`;
      });
  }
});
