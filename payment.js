document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const cartDataString = urlParams.get("cart");
  const cartData = JSON.parse(decodeURIComponent(cartDataString));

  function showCartItems() {
    const checkoutDiv = document.createElement("div");
    checkoutDiv.classList.add("checkout");

    const orderDiv = document.createElement("div");
    orderDiv.classList.add("order");

    const orderHeader = document.createElement("h2");
    orderHeader.textContent = "Checkout";
    orderDiv.appendChild(orderHeader);

    const orderList = document.createElement("ul");
    orderList.classList.add("order-list");

    let totalAmount = 0;

    cartData.forEach(item => {
      const total = item.price * item.quantity;
      totalAmount += total;

      const listItem = document.createElement("li");
      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      listItem.appendChild(itemImage);

      const itemName = document.createElement("h4");
      itemName.textContent = item.name;
      listItem.appendChild(itemName);

      const itemPrice = document.createElement("h5");
      itemPrice.textContent = `Price: $${item.price.toFixed(2)}`;
      listItem.appendChild(itemPrice);

      const itemQuantity = document.createElement("h5");
      itemQuantity.textContent = `pcs: ${item.quantity.toFixed()}`;
      listItem.appendChild(itemQuantity);

      const itemSize = document.createElement("h5");
      itemSize.textContent = `SIZE: ${item.size.toFixed()}`;
      listItem.appendChild(itemSize);

      orderList.appendChild(listItem);
    });

    orderDiv.appendChild(orderList);

    const totalHeader = document.createElement("h5");
    totalHeader.classList.add("total");
    totalHeader.textContent = "Total";
    orderDiv.appendChild(totalHeader);

    const totalAmountHeader = document.createElement("h1");
    totalAmountHeader.textContent = `$${totalAmount.toFixed(2)}`;
    orderDiv.appendChild(totalAmountHeader);

    checkoutDiv.appendChild(orderDiv);

    const paymentDiv = createPaymentForm();
    checkoutDiv.appendChild(paymentDiv);

    document.body.appendChild(checkoutDiv);
  }

  showCartItems();
});

function createPaymentForm() {
  const paymentContainer = document.createElement("div");
  paymentContainer.id = "payment";
  paymentContainer.className = "payment";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const cardContentDiv = document.createElement("div");
  cardContentDiv.className = "card-content";

  const creditCardLogo = document.createElement("img");
  creditCardLogo.id = "creditCardLogo";
  creditCardLogo.src = "images/creditcardlogo.png";
  creditCardLogo.alt = "";

  const cardInfoDiv = document.createElement("div");
  cardInfoDiv.className = "cardInfo";

  const cardholderNameLabel = createLabel("Card Holder");
  const cardholderNameValue = createLabel("Holder Name", "label-cardholdername", "h6");

  const cardNumberLabel = createLabel("Card Number");
  const cardNumberValue = createLabel("0000 0000 0000 0000", "label-cardnumber", "h6");

  const expirationLabel = createLabel("Expiration");
  const expirationValue = createLabel("MM / YY", "label-cardexpiration", "h6");

  const cvcLabel = createLabel("CVC", "cvc");
  const cvcValue = createLabel("000", "label-cvc", "h6");

  cardInfoDiv.appendChild(cardholderNameLabel);
  cardInfoDiv.appendChild(cardholderNameValue);
  cardInfoDiv.appendChild(cardNumberLabel);
  cardInfoDiv.appendChild(cardNumberValue);
  cardInfoDiv.appendChild(expirationLabel);
  cardInfoDiv.appendChild(expirationValue);
  cardInfoDiv.appendChild(cvcLabel);
  cardInfoDiv.appendChild(cvcValue);

  cardContentDiv.appendChild(creditCardLogo);
  cardContentDiv.appendChild(cardInfoDiv);

  const waveDiv = document.createElement("div");
  waveDiv.className = "wave";

  cardDiv.appendChild(cardContentDiv);
  cardDiv.appendChild(waveDiv);

  const cardFormDiv = document.createElement("div");
  cardFormDiv.className = "card-form";

  const holderNameField = document.createElement("p");
  holderNameField.id = "holderName";
  holderNameField.className = "field";
  const holderNameInput = createInput("text", "cardholder", "Holder Name");
  holderNameInput.addEventListener("input", function () {
    const alphabeticValue = this.value.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, "");
    this.value = alphabeticValue;
    cardholderNameValue.textContent = formatHolderName(alphabeticValue || "Holder Name");
  });
  holderNameField.appendChild(holderNameInput);

  const cardNumberField = document.createElement("p");
  cardNumberField.className = "field";
  const cardNumberInput = createInput("text", "cardnumber", "Card Number");
  cardNumberInput.maxLength = 19;
  cardNumberInput.addEventListener("input", function () {
    const numericValue = this.value.replace(/[^0-9]/g, "");
    const formattedValue = formatCardNumber(numericValue);
    this.value = formattedValue;
    cardNumberValue.textContent = formattedValue;
  });
  cardNumberField.appendChild(cardNumberInput);

  const expirationField = document.createElement("p");
  expirationField.className = "field space";

  const cardExpirationMonthSelect = document.createElement("select");
  cardExpirationMonthSelect.id = "cardexpirationMonth";
  cardExpirationMonthSelect.name = "cardexpirationMonth";
  cardExpirationMonthSelect.title = "Card Expiration Month";

  const defaultMonthOption = document.createElement("option");
  defaultMonthOption.value = "";
  defaultMonthOption.disabled = true;
  defaultMonthOption.selected = true;
  defaultMonthOption.textContent = "Month";

  cardExpirationMonthSelect.appendChild(defaultMonthOption);

  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i.toString().padStart(2, "0");
    option.textContent = i.toString().padStart(2, "0");
    cardExpirationMonthSelect.appendChild(option);
  }

  expirationField.appendChild(cardExpirationMonthSelect);

  const cardExpirationYearSelect = document.createElement("select");
  cardExpirationYearSelect.id = "cardexpirationYear";
  cardExpirationYearSelect.name = "cardexpirationYear";
  cardExpirationYearSelect.title = "Card Expiration Year";

  const defaultYearOption = document.createElement("option");
  defaultYearOption.value = "";
  defaultYearOption.disabled = true;
  defaultYearOption.selected = true;
  defaultYearOption.textContent = "Year";

  cardExpirationYearSelect.appendChild(defaultYearOption);

  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i <= currentYear + 10; i++) {
    const option = document.createElement("option");
    option.value = i.toString().slice(-2);
    option.textContent = i.toString();
    cardExpirationYearSelect.appendChild(option);
  }

  expirationField.appendChild(cardExpirationYearSelect);

  const cvcField = document.createElement("p");
  cvcField.className = "field";
  const cardCvcInput = createInput("text", "cardcvc", "CVC");
  cardCvcInput.maxLength = 3;
  cardCvcInput.addEventListener("input", function () {
    const numericValue = this.value.replace(/[^0-9]/g, "");
    this.value = numericValue;
    cvcValue.textContent = formatCvc(numericValue || "000");
  });
  cvcField.appendChild(cardCvcInput);

  const purchaseButton = document.createElement("button");
  purchaseButton.className = "button-cta";
  purchaseButton.title = "Confirm your purchase";
  purchaseButton.innerHTML = "<span>PURCHASE</span>";


  // personal info dolu olmasıyla ilgili işlem yapılacak //

  purchaseButton.addEventListener("click", function () {
    const holderNameValue = holderNameInput.value.trim();
    const cardNumberValue = cardNumberInput.value.replace(/\s/g, ""); 
    const cardExpirationValue = cardExpirationMonthSelect.value.trim();
    const cardExpirationYearValue = cardExpirationYearSelect.value.trim(); 
    const cardCvcValue = cardCvcInput.value.trim();

    const fullNameParts = holderNameValue.split(" ");

    if (
      checkPersonalInfoFields() && 
      fullNameParts.length >= 2 && 
      cardNumberValue.length === 16 && 
      cardExpirationValue !== "" && 
      cardExpirationYearValue !== "" && 
      cardCvcValue.length === 3 
    ) {
      showcustomPopupSucsess("Payment Sucsessful !");
    } else {
      showCustomPopupDenied("Please enter all your credit card information accurately and correctly.");
    } 
  });

  cardFormDiv.appendChild(cardNumberField);
  cardFormDiv.appendChild(holderNameField);
  cardFormDiv.appendChild(expirationField);
  cardFormDiv.appendChild(cvcField);
  cardFormDiv.appendChild(purchaseButton);

  paymentContainer.appendChild(cardFormDiv);
  paymentContainer.appendChild(cardDiv);

  cardNumberInput.addEventListener("input", function () {
    cardNumberValue.textContent = formatCardNumber(this.value || "0000 0000 0000 0000");
  });

  holderNameInput.addEventListener("input", function () {
    cardholderNameValue.textContent = formatHolderName(this.value || "Holder Name");
  });

  cardExpirationMonthSelect.addEventListener("input", function () {
    expirationValue.textContent = formatExpiration(
      cardExpirationMonthSelect.value + " / " + cardExpirationYearSelect.value
    );
  });

  cardCvcInput.addEventListener("input", function () {
    cvcValue.textContent = formatCvc(this.value || "000");
  });

  const paymentHeader = document.createElement("h2");
  paymentHeader.textContent = "Payment";
  paymentHeader.className = "paymentHeader";
  paymentContainer.insertBefore(paymentHeader, paymentContainer.firstChild);

  return paymentContainer;
}
function formatCardNumber(number) {
  const formatted = number.replace(/[^0-9]/g, "");
  const groups = formatted.match(/.{1,4}/g); 
  if (groups) {
    return groups.join(" ");
  }
  return "";
}

function formatHolderName(name) {
  const onlyValidChars = name.replace(/[^A-Za-zÇçĞğİıÖöŞşÜü\s]/g, "");
  return onlyValidChars;
}

function formatCvc(cvc) {
  const formatted = cvc.replace(/[^\d]/g, "");
  return formatted;
}

function createLabel(text, id = "", spanClass = "") {
  const label = document.createElement(spanClass !== "" ? "h6" : "h5");
  label.textContent = text;

  if (id !== "") {
    label.id = id;
  }
  return label;
}

function createInput(type, id, placeholder) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  return input;
}

function showcustomPopupSucsess(message) {
  const customPopupSucsess = document.getElementById("customPopupSucsess");
  const popupSucsessMessage = document.getElementById("popupSucsessMessage");
  const popupSucsessBtn = document.getElementById("popupSucsessBtn");
  const backToShopping = document.getElementById("backToShopping");

  popupSucsessMessage.textContent = message;
  customPopupSucsess.style.display = "flex";

  popupSucsessBtn.addEventListener("click", function () {
    customPopupSucsess.style.display = "none";
  });

  backToShopping.addEventListener("click", function () {
    customPopupSucsess.style.display = "none";
    window.location.href = "index.html";
  });
}

function showCustomPopupDenied(message) {
  const customPopupDenied = document.getElementById("customPopupDenied");
  const popupDeniedMessage = document.getElementById("popupDeniedMessage");
  const popupDeniedBtn = document.getElementById("popupDeniedBtn");

  popupDeniedMessage.textContent = message;
  customPopupDenied.style.display = "flex";

  popupDeniedBtn.addEventListener("click", function () {
    customPopupDenied.style.display = "none";
  });
}

function customPopupPersonalInfo(message) {
  const customPopupPersonalInfo = document.getElementById("customPopupPersonalInfo");
  const popupPersonalInfoMessage = document.getElementById("popupPersonalInfoMessage");
  const popupDeniedBtn = document.getElementById("popupDeniedBtn");

  popupPersonalInfoMessage.textContent = message;
  customPopupPersonalInfo.style.display = "flex";

  popupDeniedBtn.addEventListener("click", function () {
    customPopupPersonalInfo.style.display = "none";
  });
}

function checkPersonalInfoFields() {
  var fullname = document.getElementById("fullname").value;
  var address = document.getElementById("address").value;
  var postalcode = document.getElementById("postalcode").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  var isPersonalInfoValid = true;

  if (fullname === "" || address === "" || postalcode === "" || email === "" || phone === "") {
    isPersonalInfoValid = false;
    showCustomPopupDenied("Lütfen önce personal info alanını eksiksiz şekilde doldurunuz.");
  } else {
    var cardNumberValue = cardNumberInput.value.replace(/\s/g, ""); 
    var cardExpirationValue = cardExpirationMonthSelect.value.trim();
    var cardExpirationYearValue = cardExpirationYearSelect.value.trim(); 
    var cardCvcValue = cardCvcInput.value.trim();

    var fullNameParts = fullname.split(" "); // Split name into parts

    if (
      fullNameParts.length >= 2 && 
      cardNumberValue.length === 16 && 
      cardExpirationValue !== "" && 
      cardExpirationYearValue !== "" && 
      cardCvcValue.length === 3 
    ) {
      // Personal info and credit card info are valid, proceed with purchase
    } else {
      showCustomPopupDenied("Please enter all your credit card information accurately and correctly.");
      isPersonalInfoValid = false;
    }
  }

  return isPersonalInfoValid;
}

