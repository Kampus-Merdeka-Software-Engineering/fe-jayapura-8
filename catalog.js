// Ketika halaman web dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Seleksi elemen HTML dengan class "filter-products"
  const productsContainer = document.querySelector(".filter-products");

  // Data produk dalam bentuk array objek
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
});

// Fungsi untuk mereset status aktif pada semua tombol filter
function resetActiveBtn(){
  allFilterBtns.forEach((btn) => {
      btn.classList.remove('active-btn'); // Menghapus kelas 'active-btn' dari semua tombol filter
  });
}

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