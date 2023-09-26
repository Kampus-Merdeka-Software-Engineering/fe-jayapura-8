const orderForm = document.getElementById("orderForm");
const productsData = [
  {
    id: 1,
    name: "Anggur",
    imageSrc: "img/anggur.png",
    price: "$3.99",
    stars: 5,
    categories: ["all"],
  },
  {
    id: 2,
    name: "Fresh Orange",
    imageSrc: "img/jeruk.png",
    price: "$3.99",
    stars: 5,
    categories: ["all", "new"],
  },
  {
    id: 3,
    name: "Watermelon",
    imageSrc: "img/semangka.png",
    price: "$3.99",
    stars: 4.5,
    categories: ["all", "new", "best-sellers"],
  },
  {
    id: 4,
    name: "Salak",
    imageSrc: "img/salak.png",
    price: "$4.99",
    stars: 4,
    categories: ["all", "new", "best-sellers", "specials"],
  }
];

//Function untuk add row dalam table items yang ingin dibeli user
function addRow() {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");

  // Create an empty string to store the options HTML
  let optionsHTML = '';

  // Iterate through the productsData array and generate options with 'id' as value
  for (const product of productsData) {
    optionsHTML += `<option value="${product.name}">${product.name}</option>`;
  }

  newRow.innerHTML = `
    <td>
      <select class="select-product-ordered" name="product_ordered" class="form-control">
        ${optionsHTML} <!-- Insert generated options here -->
      </select>
    </td>
    <td>
      <input class="form-control" type="number" name="quantity"
        required oninvalid="this.setCustomValidity('Data yang diisikan belum lengkap, silahkan lengkapi terlebih dahulu')" oninput="setCustomValidity('')">
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteRow(this)">-</button>
    </td>
  `;

  // newRow.innerHTML = `
  //   <td>
  //     <select class="select-product-ordered" name="product_ordered" class="form-control">
  //       <option value="apple">Apple</option>
  //       <option value="banana">Banana</option>
  //       <option value="cherry">Cherry</option>
  //       <option value="grape">Grape</option>
  //       <option value="orange">Orange</option>
  //       <option value="buahbuahbuahbuahhhh">buahbuahbuahbuahhhh</option>
  //     </select>
  //   </td>
  //   <td>
  //     <input class="form-control" type="number" name="quantity"
  //       required oninvalid="this.setCustomValidity('Data yang diisikan belum lengkap, silahkan lengkapi terlebih dahulu')" oninput="setCustomValidity('')">
  //   </td>
  //   <td>
  //     <button class="btn btn-danger" onclick="deleteRow(this)">-</button>
  //   </td>
  // `;

  tableBody.appendChild(newRow);
}

// Function untuk delete row dari table items yang ingin dibeli user
function deleteRow(button) {
  const tableRow = button.parentElement.parentElement;
  tableRow.remove();
}

// Function untuk handle submisi form (ketika user klik tombol checkout)
function handleSubmit(event) {
  event.preventDefault(); // mencegah default form submission

  // memasukan personal info yang dimasukkan user ke dalam "personalInfo"
  const personalInfo = {
    firstName: document.getElementById("id_first_name").value,
    lastName: document.getElementById("id_last_name").value,
    email: document.getElementById("id_email").value,
    phoneNumber: document.getElementById("id_phone_number").value,
    address: document.getElementById("id_address").value,
    country: document.getElementById("id_country").value,
    city: document.getElementById("id_city").value,
    zip: document.getElementById("id_zip").value,
  };

  // memasukan items yang dipilih user ke dalam "items"
  const itemsTable = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
  const items = [];

  for (let i = 0; i < itemsTable.rows.length; i++) {
    const selectElement = itemsTable.rows[i].cells[0].querySelector("select");

    // Check if the row and the first cell with a select element exist
    if (itemsTable.rows[i] && selectElement) {
      const quantityElement = itemsTable.rows[i].cells[1].querySelector("input");

      // Check if the second cell with an input element exists
      if (quantityElement) {
        const productName = selectElement.value;
        const quantity = quantityElement.value;
        items.push({ productName, quantity });
      }
    }
  }

  //order object
  const order = {
    personalInfo,
    items,
  };

  // Log order pada console
  console.log(order);

  // Redirect ke home page
//   window.location.href = 'index.html';
}

// event handler untuk submit form
orderForm.addEventListener("submit", handleSubmit);