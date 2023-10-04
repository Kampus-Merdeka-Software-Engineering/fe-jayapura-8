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

  // Fungsi untuk membuat HTML untuk satu produk
  function createProduct(product) {
    const productHTML = `
      <div class="filter-product ${product.categories.join(" ")}">
        <img src="${product.imageSrc}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">${product.price}</div>
        <div class="stars">
          ${"<i class='fas fa-star'></i>".repeat(Math.floor(product.stars))}
          ${
            product.stars % 1 !== 0
              ? "<i class='fas fa-star-half-alt'></i>"
              : ""
          }
        </div>
      </div>
    `;
    return productHTML;
  }

  // Fungsi untuk menampilkan produk berdasarkan kategori yang dipilih
  function displayProducts(category, searchFilter) {
    productsContainer.innerHTML = ""; // Kosongkan container produk

    // Loop melalui data produk
    productsData.forEach((product) => {
      // Ambil nama produk dalam huruf kecil untuk pencarian
      const productName = product.name.toLowerCase();
      const categoryMatch =
        category === "all" || product.categories.includes(category);
      const searchMatch = productName.includes(searchFilter);

      // Tampilkan produk jika sesuai dengan kategori dan pencarian
      if (categoryMatch && searchMatch) {
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
      const searchFilter = searchInput.value.trim().toLowerCase(); // Ambil kata kunci pencarian

      // Hapus kelas 'active-btn' dari semua tombol filter
      resetActiveBtn();

      // Tambahkan kelas 'active-btn' ke tombol yang diklik
      button.classList.add("active-btn");

      // Tampilkan produk berdasarkan kategori dan pencarian yang dipilih
      displayProducts(filterId, searchFilter);
    });
  });

  // Tampilkan semua produk saat halaman pertama kali dimuat
  displayProducts("all", "");

  // Mendapatkan elemen input pencarian
  const searchInput = document.getElementById("find");

  // Menambahkan event listener untuk input pencarian saat pengguna mengetik
  searchInput.addEventListener("input", () => {
    const filterId = document.querySelector(".active-btn")?.id || "all"; // Dapatkan kategori filter aktif atau "all" jika tidak ada yang aktif
    const searchFilter = searchInput.value.trim().toLowerCase(); // Ambil kata kunci pencarian

    // Tampilkan produk berdasarkan kategori dan pencarian yang dipilih
    displayProducts(filterId, searchFilter);
  });

  // Fungsi untuk mereset status aktif pada semua tombol filter
  function resetActiveBtn() {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
  }
});
