document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector("#cart-icon");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#close-cart");
  const buyButton = document.querySelector(".btn-buy");

  cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
  });

  // Ambil semua tombol "Tambah ke Keranjang"
  const addCartButtons = document.querySelectorAll(".add-cart");

  function ready() {
    addCartButtons.forEach((button) => {
      button.addEventListener("click", addCartClicked);
    });
    buyButton.addEventListener("click", buyButtonClicked);
  }

  function buyButtonClicked() {
    alert("Pesanan Anda telah berhasil ditempatkan");
    clearCart();
    updateTotal();
  }

  function removeCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  }

  function quantityChanged(event) {
    const input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }

  function addCartClicked(event) {
    const button = event.target;
    const shopProduct = button.parentElement; // Mengambil elemen induk tombol "Tambah ke Keranjang"
    const title = shopProduct.querySelector(".product-title").innerText;
    const price = shopProduct.querySelector(".price").innerText;
    const productImg = shopProduct.querySelector(".product-img").src;
    addProductToCart(title, price, productImg);
    updateTotal();
  }

  function addProductToCart(title, price, productImg) {
    const cartItems = document.querySelector(".cart-content");
    const cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    const cartBoxContent = `
      <img src="${productImg}" alt="" class="cart-img" />
      <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <label for="quantity">Quantity:</label>
        <input type="number" value="1" class="cart-quantity" />
      </div>
      <!-- Remove Cart -->
      <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
  }

  function updateTotal() {
    let total = 0;
    const cartBoxes = document.querySelectorAll(".cart-box");

    cartBoxes.forEach((cartBox) => {
      const priceElement = cartBox.querySelector(".cart-price");
      const quantityElement = cartBox.querySelector(".cart-quantity");
      const price = parseFloat(priceElement.innerText.replace("Rp", "").replace(/\./g, ""));
      const quantity = parseInt(quantityElement.value);
      total += price * quantity;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector(".total-price").innerText = "Rp" + total.toLocaleString("id-ID");
  }

  function clearCart() {
    const cartContent = document.querySelector(".cart-content");
    cartContent.innerHTML = "";
  }

  ready();
});
