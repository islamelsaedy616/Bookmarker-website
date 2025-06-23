var nameInput = document.getElementById("name");
var urlInput = document.getElementById("email");
var table = document.getElementById("table");
var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));

var allUrl;
if (localStorage.getItem("Url") == null) {
  allUrl = [];
} else {
  allUrl = JSON.parse(localStorage.getItem("Url"));
  display();
}

// Add Url //
function addemail() {
  var url = {
    name: nameInput.value,
    url: urlInput.value,
  };

  console.log(allUrl);

  if (regexName() && regexEmail()) {
    allUrl.push(url);
    localStorage.setItem("Url", JSON.stringify(allUrl));
    display();
  } else {
    showErrorModal();
  }

  clearForm();
}

// Display Url Name //
function display() {
  var box = "";
  for (var i = 0; i < allUrl.length; i++) {
    box += `
        <tr>
            <td>${i}</td>
            <td>${allUrl[i].name}</td>
            <td>
            <a href="${allUrl[i].url}" target="_blank"   class="btn btn-visit">
                <i class="fa-solid fa-eye pe-1"></i> Visit
            </a>
            </td>
            <td>
            <button onclick="deleteUrl(${i})" class="btn btn-delete">
                <i class="fa-solid fa-trash-can pe-1"></i> Delete
            </button>
            </td>
        </tr>
    `;
  }
  table.innerHTML = box;
}

// Delete Url //
function deleteUrl(index) {
  allUrl.splice(index, 1);
  localStorage.setItem("Url", JSON.stringify(allUrl));
  display();
}

// Clear Inputs //
function clearForm() {
  nameInput.value = null;
  urlInput.value = null;

  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}

// Show Error Modal //
function showErrorModal() {
  errorModal.show();
}

// Regex Name //
function regexName() {
  var nameRegex = /^[A-Za-z0-9 _-]{3,}$/;
  var nameValue = nameInput.value;

  if (nameRegex.test(nameValue)) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    return true;
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
    return false;
  }
}

// Regex Email //
function regexEmail() {
  var urlRegex =
    /^(https?:\/\/)?(www\.)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,}(\/\S*)?$/;
  var urlValue = urlInput.value;

  if (urlRegex.test(urlValue)) {
    urlInput.classList.add("is-valid");
    urlInput.classList.remove("is-invalid");
    return true;
  } else {
    urlInput.classList.remove("is-valid");
    urlInput.classList.add("is-invalid");
    return false;
  }
}
