let preveiwContainer = document.querySelector('.product-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.product-catalog .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex-wrap';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});