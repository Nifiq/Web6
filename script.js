const basePrices = {
  "1": 100,
  "2": 200,
  "3": 300
};
const optionsData = {
  "2": [
    { name: "Стандартная", value: 1 },
    { name: "Плюс", value: 2 },
    { name: "Про", value: 4 }
  ]
};

const propertiesData = {
  "3": { name: "Дополнительные vip возможности", value: 1.5 }
};

const form = document.getElementById("calcForm");
const quantityInput = document.getElementById("quantity");
const optionsContainer = document.getElementById("optionsContainer");
const totalPriceElement = document.getElementById("totalPrice");

function calculateTotal() {
  const quantity = parseInt(quantityInput.value);
  const serviceType = form.serviceType.value;
  let base = basePrices[serviceType];
  let multiplier = 1;

  if (serviceType === "2") {
    const select = document.getElementById("serviceOption");
    multiplier = parseFloat(select.value);
  }

  if (serviceType === "3") {
    const checkbox = document.getElementById("serviceProperty");
    if (checkbox.checked) {
      multiplier = propertiesData["3"].value;
}
  }

  const total = base * multiplier * quantity;
  totalPriceElement.textContent = total.toFixed(2);
}

function updateOptions() {
  const serviceType = form.serviceType.value;
  optionsContainer.innerHTML = "";

  if (serviceType === "2") {
    // Создаем select для опций
    const label = document.createElement("label");
    label.textContent = "Выберите опцию: ";

    const select = document.createElement("select");
    select.id = "serviceOption";
    optionsData["2"].forEach(function (opt) {
  const option = document.createElement("option");
  option.value = opt.value;
  option.textContent = opt.name;
  select.appendChild(option);
});

    label.appendChild(select);
    optionsContainer.appendChild(label);
    select.addEventListener("change", calculateTotal);
  }

  if (serviceType === "3") {
  const propertyLabel = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "serviceProperty";
  propertyLabel.appendChild(checkbox);
  propertyLabel.appendChild(document.createTextNode(" " + propertiesData["3"].name));
  optionsContainer.appendChild(propertyLabel);
  checkbox.addEventListener("change", calculateTotal);
}

  calculateTotal();
}

quantityInput.addEventListener("input", calculateTotal);
form.serviceType.forEach(function (radio) {
  radio.addEventListener("change", updateOptions);
});
updateOptions();