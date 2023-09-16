
// function search() {
//   // Dapatkan nilai input pencarian
//   const searchInput = document.getElementById("search").value.toLowerCase();

//   // Dapatkan semua produk
//   const products = document.querySelectorAll(".product");

//   // Kosongkan hasil pencarian sebelumnya
//   const hasilPencarian = document.getElementById("hasil-pencarian");
//   hasilPencarian.innerHTML = "";

//   // Iterasi melalui produk dan cek apakah nama produk cocok dengan pencarian
//   products.forEach((product) => {
//     const productName = product.querySelector("p").textContent.toLowerCase();

//     if (productName.includes(searchInput)) {
//       // Jika cocok, tambahkan produk ke hasil pencarian
//       hasilPencarian.appendChild(product.cloneNode(true));
//     }
//   });

//   // Jika tidak ada hasil pencarian, tampilkan pesan "Tidak ditemukan"
//   if (hasilPencarian.children.length === 0) {
//     hasilPencarian.textContent = "Tidak ditemukan.";
//   }
// }
function search(){
  let filter = document.getElementById('find').value.toUpperCase();

  let item = document.querySelectorAll('.product');

  let l = document.getElementsByTagName('p');

  for(var i = 0; i<=l.length; i++){
    let a=item[i].getElementsByTagName('p')[0];

    let value=a.innerHTML || a.innerText || a.textContent;

    if(value.toUpperCase().indexOf(filter) > -1){
      item[i].style.display="";
    } else {
      item[i].style.display="none";
    }
  }
}

// let preveiwContainer = document.querySelector('.product-preview');
// let previewBox = preveiwContainer.querySelectorAll('.preview');

// document.querySelectorAll('.product-catalog .product').forEach(product =>{
//   product.onclick = () =>{
//     preveiwContainer.style.display = 'flex-wrap';
//     let name = product.getAttribute('data-name');
//     previewBox.forEach(preview =>{
//       let target = preview.getAttribute('data-target');
//       if(name == target){
//         preview.classList.add('active');
//       }
//     });
//   };
// });

// previewBox.forEach(close =>{
//   close.querySelector('.fa-times').onclick = () =>{
//     close.classList.remove('active');
//     preveiwContainer.style.display = 'none';
//   };
// });