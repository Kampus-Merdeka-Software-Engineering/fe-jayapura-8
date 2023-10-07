const orderForm = document.getElementById("orderForm");

//Function untuk add row dalam table items yang ingin dibeli user
function addRow() {
  const tableBody = document.querySelector("tbody");
  const newRow = document.createElement("tr");

  // Create an empty string to store the options HTML
  let optionsHTML = '';

  // Fetch data produk dari localhost:3000/products
  fetch("https://be-jayapura-8-aurevoir.up.railway.app/products")
  .then((response) => response.json())
  .then((data) => {
    const productsData = data.productsData;

  // Iterate through the productsData array and generate options with 'id' as value
  for (const product of productsData) {
    optionsHTML += `<option value="${product.id}">${product.name}</option>`;
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
})
.catch((error) => {
  console.error("Error fetching data:", error);
});

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
        const productId = selectElement.value;
        const quantity = quantityElement.value;
        // Find the product in the productsData array based on productId
        const selectedProduct = productsData.find(product => product.id === parseInt(productId));

        if (selectedProduct) {
          // Calculate the total price for this item (product price * quantity)
          const total_price_item = selectedProduct.price * quantity;
          items.push({ productId, quantity, total_price_item});
        }
      }
    }
  }

  // Function to send the order to the backend
function sendOrderToBackend(orderData) {
  fetch('https://be-jayapura-8-aurevoir.up.railway.app/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message); // Output the response from the server
      // You can redirect the user or perform other actions based on the server response
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors gracefully
    });
}

// In your handleSubmit function, after constructing the `order` object:
// ...

// Call the sendOrderToBackend function with the order data
sendOrderToBackend(order);

  //order object
  const order = {
    personalInfo,
    items,
  };

  fetch('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order), // Send the order object as JSON
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server (e.g., show a success message)
      console.log(data);
      // Redirect to a success page or take other actions as needed
    })
    .catch((error) => {
      // Handle errors gracefully
      console.error('Error:', error);
    });

  // Log order pada console
  console.log(order);

  // Redirect ke home page
  window.location.href = 'ordersuccess.html';
}

// event handler untuk submit form
orderForm.addEventListener("submit", handleSubmit);