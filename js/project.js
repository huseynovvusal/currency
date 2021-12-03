const currency = new Currency();

const form = document.querySelector("#form");
const baseList = document.querySelector(".base select");
const currencyList = document.querySelector(".currency select");
const baseInput = document.querySelector(".base input");
const currencyInput = document.querySelector(".currency input");
const alertElement = document.querySelector(".alert");
const dateElement = document.querySelector("#form p span");

function alertBox(e) {
  alertElement.classList.add("active");

  setTimeout(() => {
    alertElement.classList.remove("active");
  }, 2500);

  e.preventDefault();
}

function eventListeners() {
  form.addEventListener("submit", (e) => {
    if (baseInput.value == "") {
      alertBox(e);
      currencyInput.value = "";
    } else exchangeCurrency(e);
  });
  baseInput.addEventListener("input", exchangeCurrency);
  baseList.addEventListener("change", exchangeCurrency);
  currencyList.addEventListener("change", exchangeCurrency);
  document.addEventListener("DOMContentLoaded", takeDate);
}

eventListeners();

function exchangeCurrency(e) {
  currency
    .exchange(baseList.value, currencyList.value)
    .then((data) => {
      let value = data["result"][currencyList.value.toUpperCase()];
      currencyInput.value = (Number(baseInput.value) * value).toFixed(4);
    })
    .catch((err) => console.error(new Error(err)));

  e.preventDefault();
}

function takeDate() {
  currency
    .exchange(baseList.value, currencyList.value)
    .then((data) => {
      let date1 = data["updated"];
      let date2 = "";

      for (let i = 0; i < date1.length; i++) {
        if (date1[i] != " ") date2 += date1[i];
        else break;
      }

      dateElement.innerHTML = date2;
    })
    .catch((err) => console.error(new Error(err)));
}
