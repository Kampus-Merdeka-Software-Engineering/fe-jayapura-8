// Ketika halaman web dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Seleksi elemen HTML dengan class "filter-products"
  const productsContainer = document.querySelector(".filter-products");

  // Data produk dalam bentuk array objek
  const productsData = [
    {
      id: 1,
      name: "Beach Shirt #01",
      imageSrc: "../img/f1.jpg",
      price: "$15.99",
      stars: 5,
      categories: ["all", "best-sellers"],
    },
    {
      id: 2,
      name: "Beach Shirt #02",
      imageSrc: "../img/f2.jpg",
      price: "$13.99",
      stars: 4.5,
      categories: ["all", "new"],
    },
    {
      id: 3,
      name: "Beach Shirt #03",
      imageSrc: "../img/f3.jpg",
      price: "$14.99",
      stars: 4.5,
      categories: ["all", "new", "best-sellers"],
    },
    {
      id: 4,
      name: "Beach Shirt #04",
      imageSrc: "../img/f4.jpg",
      price: "$14.99",
      stars: 4.5,
      categories: ["all", "new", "best-sellers"],
    },
    {
      id: 5,
      name: "Beach Shirt #05",
      imageSrc: "../img/f5.jpg",
      price: "$15.99",
      stars: 4,
      categories: ["all", "new"],
    },
    {
      id: 6,
      name: "Flower Trouser",
      imageSrc: "../img/f7.jpg",
      price: "$21.99",
      stars: 5,
      categories: ["all", "best-sellers", "specials"],
    },
    {
      id: 7,
      name: "Windy Shirt",
      imageSrc: "../img/f8.jpg",
      price: "$14.99",
      stars: 5,
      categories: ["all", "best-sellers", "specials"],
    },
    {
      id: 8,
      name: "Grey Short Super Fluffy",
      imageSrc: "../img/n6.jpg",
      price: "$19.99",
      stars: 4,
      categories: ["all", "best-sellers", "specials"],
    },
  ];

  // Fetch data untuk header
// function fetchproductsData() {
//   fetch('http://localhost:3000/products')
//       .then(response => response.json())
//       .then(data => {
//           const headerElement = document.querySelector('header .filter-products');
//           headerElement.querySelector('h3').textContent = data.name;
//           const productsData = data;
//           // headerElement.querySelector('p').textContent = data.description;
//       })
//       .catch(error => console.error('Error fetching header data:', error));
//       return productsData;
// }

// document.addEventListener('DOMContentLoaded', fetchproductsData);

  // Fungsi untuk membuat HTML untuk satu produk
  function createProduct(product) {
    const productHTML = `
      <div class="filter-product ${product.categories.join(" ")}">
        <img src="${product.imageSrc}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
        <div class="stars">
          ${"<i class='fas fa-star'></i>".repeat(Math.floor(product.stars))}
          ${product.stars % 1 !== 0 ? "<i class='fas fa-star-half-alt'></i>" : ""}
        </div>
      </div>
    `;
    return productHTML;
  }

  // Fungsi untuk menampilkan produk berdasarkan kategori yang dipilih
  function displayProducts(category) {
    productsContainer.innerHTML = ""; // Kosongkan container produk

    // Loop melalui data produk
    // const productsData = fetchproductsData()
    productsData.forEach((product) => {
      // Tampilkan produk jika kategori sesuai dengan yang dipilih atau "all"
      if (category === "all" || product.categories.includes(category)) {
        const productHTML = createProduct(product);
        productsContainer.innerHTML += productHTML;
      }
    });
  }

  // Seleksi semua tombol filter dengan class "filter-btn"
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Tambahkan event listener untuk setiap tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterId = button.id; // Dapatkan ID tombol yang diklik
      displayProducts(filterId); // Tampilkan produk berdasarkan kategori yang dipilih
    });
  });

  // Tampilkan semua produk saat halaman pertama kali dimuat
  displayProducts("all");
  // Mendapatkan elemen input pencarian
const searchInput = document.getElementById('find');

// Mendapatkan semua elemen produk
const allProducts = document.querySelectorAll('.filter-product');

// Menambahkan event listener untuk input pencarian saat pengguna mengetik
searchInput.addEventListener('input', () => {
  searchProducts();
});

// Fungsi untuk melakukan pencarian produk
function searchProducts() {
  const filter = searchInput.value.trim().toLowerCase();

  // Iterasi melalui semua elemen produk
  allProducts.forEach((product) => {
    const productName = product.querySelector('h3').innerText.toLowerCase();

    // Memeriksa apakah nama produk mengandung kata kunci pencarian
    if (productName.includes(filter)) {
      product.style.display = 'block'; // Menampilkan produk jika cocok
    } else {
      product.style.display = 'none'; // Menyembunyikan produk jika tidak cocok
    }
  });
}
});

// Fungsi untuk mereset status aktif pada semua tombol filter
function resetActiveBtn(){
  allFilterBtns.forEach((btn) => {
      btn.classList.remove('active-btn'); // Menghapus kelas 'active-btn' dari semua tombol filter
  });
}