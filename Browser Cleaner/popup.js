// popup.js

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cleanButton").addEventListener("click", function () {
    const date = document.getElementById("dateInput").value;
    const time = document.getElementById("timeInput").value;
    const selectedHistoryTypes = Array.from(
      document.getElementById("historyTypes").selectedOptions
    ).map((option) => option.value);

    const options = {
      since: new Date(`${date} ${time}`).getTime(),
    };

    if (selectedHistoryTypes.length > 0) {
      const historyTypesObject = {};
      selectedHistoryTypes.forEach((type) => {
        historyTypesObject[type] = true;
      });
      options["types"] = historyTypesObject;
    }

    chrome.browsingData.remove(options, function () {
      alert("Browser data cleaned successfully!");
    });
  });
});
