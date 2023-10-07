const orderForm = document.getElementById("orderForm");
const productsData = [];
// Function untuk add row dalam table items yang ingin dibeli user
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

// Function untuk mengirim pesanan ke server
async function sendOrderToServer(order) {
  try {
    const response = await fetch("https://be-jayapura-8-aurevoir.up.railway.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.order_id;
    } else {
      throw new Error("Failed to create order on the server");
    }
  } catch (error) {
    console.error("Error sending order:", error);
    throw error;
  }
}

// Function untuk handle submisi form (ketika user klik tombol checkout)
async function handleSubmit(event) {
  event.preventDefault(); // Mencegah default form submission

  // Memasukkan personal info yang dimasukkan user ke dalam "personalInfo"
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

  // Memasukkan items yang dipilih user ke dalam "items"
  const itemsTable = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
  const items = [];

  for (let i = 0; i < itemsTable.rows.length; i++) {
    const selectElement = itemsTable.rows[i].cells[0].querySelector("select");

    // Check if the row and the first cell with a select element exist
    if (itemsTable.rows[i] && selectElement) {
      const quantityElement = itemsTable.rows[i].cells[1].querySelector("input");

      if (quantityElement) {
        const productId = selectElement.value;
        const quantity = quantityElement.value;
        const selectedProduct = productsData.find(product => product.id === parseInt(productId));

        if (selectedProduct) {
          const total_price_item = selectedProduct.price * quantity;
          const item = {
            productId,
            quantity,
            total_price_item,
          };
          items.push(item);
        }
      }
    }
  }

  // Order object
  const order = {
    personalInfo,
    items,
  };

  try {
    const order_id = await sendOrderToServer(order);

    // Log order_id pada console (order_id yang diterima dari server)
    console.log("Order ID:", order_id);

    // Redirect ke halaman sukses dengan menyertakan order_id
    window.location.href = `ordersuccess.html?order_id=${order_id}`;
  } catch (error) {
    // Handle error, misalnya dengan menampilkan pesan kesalahan kepada pengguna
    console.error("Failed to send order:", error);
  }
}

// event handler untuk submit form
orderForm.addEventListener("submit", handleSubmit);