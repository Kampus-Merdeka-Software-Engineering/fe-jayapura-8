// Memilih semua elemen dengan kelas 'filter-product' (item produk) dan 'filter-btn' (tombol filter)
const allFilterItems = document.querySelectorAll('.filter-product');
const allFilterBtns = document.querySelectorAll('.filter-btn');

// Menambahkan event listener untuk memastikan tombol pertama aktif saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
  allFilterBtns[0].classList.add('active-btn');
});

// Menambahkan event listener untuk setiap tombol filter
allFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
      showFilteredContent(btn);
  });
});

// Fungsi untuk menampilkan konten yang sesuai dengan tombol filter yang diklik
function showFilteredContent(btn){
  allFilterItems.forEach((item) => {
    // Memeriksa apakah elemen produk memiliki kelas yang sesuai dengan tombol filter yang diklik
      if(item.classList.contains(btn.id)){
          resetActiveBtn(); // Mereset status aktif pada semua tombol filter
          btn.classList.add('active-btn'); // Menandai tombol filter yang aktif
          item.style.display = "block"; // Menampilkan elemen produk
      } else {
          item.style.display = "none"; // Menyembunyikan elemen produk yang tidak sesuai
      }
  });
}

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