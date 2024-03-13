const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const dropdown = document.querySelectorAll(".dropdown");
const sound = new Audio("./click_audio.mp3");
for (let selectD of dropdown) {
  for (let country in List) {
    let newEle = document.createElement("option");
    newEle.val = country;
    newEle.innerText = country;
    selectD.appendChild(newEle);
    if (selectD.name === "selectFrom" && country === "USD") {
      newEle.selected = "selected";
    } else if (selectD.name === "selectTo" && country === "INR") {
      newEle.selected = "selected";
    }
  }
  selectD.addEventListener("change", (evt) => {
    changeImg(evt.target);
  });
}
const changeImg = (ele) => {
  let newSrc = `https://flagsapi.com/${List[ele.value]}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newSrc;
};
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg = document.querySelector(".ans");
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount_input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.value = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
const btn = document.querySelector("button");
btn.addEventListener("click", (evt) => {
  sound.play();
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});
