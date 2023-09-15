const text = ["Best Shoes For You!", "VividStep is the Best Choice!", "Don't Miss the Discount on Classic Shoes!", "High-Quality, Affordable, Reliable"];
let textIndex = 0;
let currentText = "";
let typingInterval = 100;
function type() {
  if (textIndex == text.length) {
    textIndex = 0;
  }

  currentText = text[textIndex];

  let i = 0;
  const typing = setInterval(() => {
    document.getElementById("siteTitleText").innerHTML = currentText.substring(0, i);
    i++;
    if (i > currentText.length) {
      clearInterval(typing);
      setTimeout(erase, 3000);
    }
  }, typingInterval);
}

function erase() {
  let i = currentText.length;
  const erasing = setInterval(() => {
    document.getElementById("siteTitleText").innerHTML = currentText.substring(0, i);
    i--;
    if (i < 0) {
      clearInterval(erasing);
      textIndex++;
      setTimeout(type, 2000);
    }
  }, 50);
}

type();

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');
const productCards = Array.from(document.querySelectorAll('.productCard'));

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('input', performSearch);

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  resultsContainer.innerHTML = ''; // Clear previous results

  if (searchTerm.trim() === '') {
    return; // If the search term is empty, don't show any products
  }

  const filteredProducts = productCards.filter(card => {
    const productName = card.querySelector('.cardDetails h3').textContent.toLowerCase();
    return productName.includes(searchTerm);
  });

  if (filteredProducts.length > 0) {
    filteredProducts.forEach(card => {
      resultsContainer.appendChild(card.cloneNode(true));
    });
  } else {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No products found.';
    resultsContainer.appendChild(noResultsMessage);
  }
}

function toggleDropdown() {
  let dropdownContent = document.getElementById("singUpContent");
  dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}

function isValidEmail(email) {
  // Using regex for a simple email format check.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function register() {
  let username = document.querySelector("#singUpContent input[type='text']").value;
  let email = document.querySelector("#singUpContent input[type='email']").value;
  let password = document.querySelector("#singUpContent input[type='password']").value;

  // Simulated registration process; in a real application, it could be saved to a database.
  // Checking email and password formats.
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
  } else if (username === "" && email === "" && password === "") {
    alert("Please fill in all fields.");
  } else if (username === "" || (username !== "" && email === "" && password === "")) {
    alert("Please fill in the other fields.");
  } else if (username !== "" && email === "" && password !== "") {
    alert("Please enter your email address.");
  } else if (username !== "" && email !== "" && password === "") {
    alert("Please enter your password.");
  } else {
    // After registration, you can display a message to the user.
    alert(`Hi ${username}, your registration process has been successfully completed. An activation email will be sent to you shortly.`);
  }
  // Close the dropdown after registration:
  let dropdownContent = document.getElementById("singUpContent");
  dropdownContent.style.display = "none";
}

function singIn() {
  let username = document.querySelector("#singUpContent input[type='text']").value;
  let email = document.querySelector("#singUpContent input[type='email']").value;
  let password = document.querySelector("#singUpContent input[type='password']").value;

  // Simulated login process; in a real application, it could be checked against a database.
  // Checking email and password formats.
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
  } else if (username === "" && email === "" && password === "") {
    alert("Please fill in all fields.");
  } else if (username === "" || (username !== "" && email === "" && password === "")) {
    alert("Please fill in the other fields.");
  } else if (username !== "" && email === "" && password !== "") {
    alert("Please enter your email address.");
  } else if (username !== "" && email !== "" && password === "") {
    alert("Please enter your password.");
  } else {
    // After login, you can display a message to the user.
    alert(`Hi ${username}, We are currently experiencing some issues with our servers, so we are unable to complete the login activity. Please try again later.`);
  }
  // Close the dropdown after login:
  let dropdownContent = document.getElementById("singUpContent");
  dropdownContent.style.display = "none";
}

// Slider

const slides = document.querySelectorAll('.mainSlide');
const delay = 5000; // Transition interval (ms)
let currentSlide = 0;

function transitionSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

transitionSlide();
setInterval(transitionSlide, delay);

const favoriteProducts = []; // Array holding favorite products

function closeFavPopup() {
  const favPopup = document.querySelector('.favPopup');
  favPopup.style.display = 'none';
}

// Function to add to favorites
function addToFavorites(button) {
  const productCard = button.closest('.productCard');
  const productName = productCard.querySelector('h3').innerText;
  const selectedSize = parseInt(productCard.querySelector('#sizeSelect').value); // Get the selected size

  const existingProductIndex = favoriteProducts.findIndex(item => item.name === productName && item.size === selectedSize);

  if (existingProductIndex === -1) {
    const productPriceText = productCard.querySelector('p').innerText;
    const productPrice = parseFloat(productPriceText.replace('Price: $', ''));
    const productImage = productCard.querySelector('img').src;

    favoriteProducts.push({
      name: productName,
      price: productPrice,
      image: productImage,
      size: selectedSize, // Include the selected size
    });

    populateFavPopup(); // Update the favorite popup
  }

  // Update the favorite count
  const favCountSpan = document.querySelector('.favCount');
  favCountSpan.innerText = favoriteProducts.length.toString();
}

// Function to toggle the favorite popup display
function toggleFavPopup() {
  const favPopup = document.querySelector('.favPopup');

  if (favPopup.style.display === 'block') {
    favPopup.style.display = 'none';
  } else {
    populateFavPopup();
    favPopup.style.display = 'block';
  }
}

function removeFromFavorites(productName) {
  const existingProductIndex = favoriteProducts.findIndex(item => item.name === productName);

  if (existingProductIndex !== -1) {
    favoriteProducts.splice(existingProductIndex, 1);
    populateFavPopup(); // Update the favorite popup
    updateFavCount(); // Update the favorite count
    updateCartPopup(); // Add this line
  }
}

function updateFavCount() {
  const favCountSpan = document.querySelector('.favCount');
  favCountSpan.innerText = favoriteProducts.length.toString();

  // Update the favorite count in the cart popup if needed
  updateCartPopup(); // Add this line
}

// Function to populate the favorite popup content
function populateFavPopup() {
  const favItemsDiv = document.querySelector('.favItems');
  favItemsDiv.innerHTML = ''; // Clear the content

  favoriteProducts.forEach(item => {
    const favItemDiv = document.createElement('div');
    favItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <h4>${item.name}</h4>
      <span>Price: $${item.price}</span>
      <span>Size: ${item.size}</span>
      <div class="favButtons">
      <button id="favToCart" class="addToCartBtn" onclick="addToCartFromFavorites('${item.name}')">Add to Cart</button>
      <button class="removeBtn" onclick="removeFromFavorites('${item.name}')">Remove</button>
      </div>
    `;
    favItemsDiv.appendChild(favItemDiv);
    favItemDiv.className = "favItemDisplay"
  });
}
// Function to add favorite products to the cart
function addToCartFromFavorites(productName) {
  const product = favoriteProducts.find(item => item.name === productName);
  if (product) {
    const productKey = createProductKey('', productName, product.size); // Include size in the product key
    const existingProductIndex = cart.findIndex(item => item.key === productKey);

    if (existingProductIndex === -1) {
      // Include all necessary attributes here
      cart.push({
        key: productKey,
        brand: product.brand,
        name: productName,
        price: product.price,
        image: product.image,
        size: product.size, // Include the correct size attribute
        quantity: 1,
      });
    } else {
      cart[existingProductIndex].quantity += 1;
    }

    updateCartIconCount();
    updateCartPopup();
  }
}

// Cart Operations

function createProductKey(brand, name, size) {
  return `${brand}-${name}-${size}`;
}

const cart = [];

const addToCartButtons = document.querySelectorAll('.addToCartBtn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

const cartIcon = document.querySelector('.cartIcon');
if (cartIcon) {
  cartIcon.addEventListener('click', showCartPopup);
}

updateCartPopup();

function addToCart(event) {
  const productCard = event.currentTarget.closest('.productCard');
  const productName = productCard.querySelector('h3').innerText;
  const productPriceText = productCard.querySelector('p').innerText;
  const productPrice = parseFloat(productPriceText.replace('Price: $', ''));
  const productImage = productCard.querySelector('img').src;
  const productBrand = productCard.dataset.brand;
  const selectedSize = parseInt(productCard.querySelector('#sizeSelect').value);
  const productKey = createProductKey(productBrand, productName, selectedSize);

  const existingProductIndex = cart.findIndex(item => item.key === productKey);

  if (existingProductIndex === -1) {
    cart.push({
      key: productKey,
      brand: productBrand,
      name: productName,
      price: productPrice,
      image: productImage,
      size: selectedSize,
      quantity: 1,
    });
  } else {
    cart[existingProductIndex].quantity += 1;
  }

  updateCartIconCount();
  updateCartPopup();
}

function updateCartIconCount() {
  const cartCountSpan = document.querySelector('.cartCount');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountSpan.innerText = totalItems;
}

function showCartPopup() {
  const cartPopup = document.querySelector('.cartPopup');
  cartPopup.classList.toggle('active');
}

function closeCart() {
  const cartPopup = document.querySelector('.cartPopup');
  cartPopup.classList.remove('active');
}

function updateCartPopup() {
  const cartItemsDiv = document.querySelector('.cartItems');
  cartItemsDiv.innerHTML = '';

  cart.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
      <div class="itemDes">
      <img src="${item.image}" alt="${item.name}" width="50">
      <h4>${item.name}</h4>
      <span>Price: ${item.price}</span>
      <p>Size: ${item.size}</p>
      </div>
      <button id="removeCart" onclick="removeFromCart('${item.key}')"><i class="fa-solid fa-x" style="color: #000000;"></i></button>
      <div class="itemQuantitiy">
      <button class="increaseCartItemBtn" onclick="increaseCartItem('${item.key}')"><i class="fa-solid fa-plus" style="color: #000000;"></i></button>
      <p class="cartItemQuantity">${item.quantity}</p>
      <button class="decreaseCartItemBtn" onclick="decreaseCartItem('${item.key}')"><i class="fa-solid fa-minus" style="color: #000000;"></i></button>
      </div>
    `;
    cartItemsDiv.appendChild(cartItemDiv);
  });

  const totalAmount = calculateTotalAmount();
  const cartTotalDiv = document.querySelector('.cartTotal');
  cartTotalDiv.innerText = `Total: $${totalAmount.toFixed(2)}`;
}

function decreaseCartItem(productKey) {
  const productIndex = cart.findIndex(item => item.key === productKey);
  if (productIndex !== -1 && cart[productIndex].quantity > 1) {
    cart[productIndex].quantity -= 1;
    updateCartIconCount();
    updateCartPopup();
  }
}

function increaseCartItem(productKey) {
  const productIndex = cart.findIndex(item => item.key === productKey);
  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
    updateCartIconCount();
    updateCartPopup();
  }
}

function removeFromCart(productKey) {
  const productIndex = cart.findIndex(item => item.key === productKey);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    updateCartIconCount();
    updateCartPopup();
  }
}

function removeAllFromCart() {
  cart.length = 0; 
  updateCartIconCount();
  updateCartPopup();
}

function calculateTotalAmount() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  return total;
}

const increaseBtns = document.querySelectorAll('.increaseCartItemBtn');
const decreaseBtns = document.querySelectorAll('.decreaseCartItemBtn');

increaseBtns.forEach(button => {
  button.addEventListener('click', increaseQuantity);
});

decreaseBtns.forEach(button => {
  button.addEventListener('click', decreaseQuantity);
});

const checkoutButton = document.querySelector('.checkoutBtn');
checkoutButton.addEventListener('click', redirectToPaymentPage);

function redirectToPaymentPage() {
  if (cart.length === 0) {
    alert("Your cart is empty. To make a payment, you need to add products first.");
    return;
  }

const cartData = JSON.stringify(cart);
const paymentPageURL = `paymentpage.html?cart=${encodeURIComponent(cartData)}`;
window.open(paymentPageURL, '_blank');
}


