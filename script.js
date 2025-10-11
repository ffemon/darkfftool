// Menu and converter logic
const menuButtons = document.querySelectorAll(".menu-buttons button");
const menuScreen = document.getElementById("menuScreen");
const converterScreen = document.getElementById("converterScreen");
const converterTitle = document.getElementById("converterTitle");
const hexInput = document.getElementById("hexInput");
const hexOutput = document.getElementById("hexOutput");
const convertBtn = document.getElementById("convertBtn");
const copyBtn = document.getElementById("copyBtn");
const backBtn = document.getElementById("backBtn");

let currentConversion = "";

menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentConversion = btn.dataset.conversion;
        converterTitle.textContent = btn.textContent;
        menuScreen.classList.add("hidden");
        converterScreen.classList.remove("hidden");
        hexInput.value = "";
        hexOutput.value = "";
    });
});

convertBtn.addEventListener("click", () => {
    const input = hexInput.value.trim();
    if (!input) return;
    let result = "";
    const arr = input.split(/\s+/);
    switch (currentConversion) {
        case "hexTo0x":
            result = arr.map(h => '0x' + h.toUpperCase()).join(', ');
            break;
        case "hexToDecimal":
            result = arr.map(h => parseInt(h, 16)).join(', ');
            break;
        case "hexToBinary":
            result = arr.map(h => parseInt(h, 16).toString(2).padStart(8, '0')).join(' ');
            break;
    }
    hexOutput.value = result;
});

copyBtn.addEventListener("click", () => {
    hexOutput.select();
    navigator.clipboard.writeText(hexOutput.value);
    alert("Copied to clipboard!");
});

backBtn.addEventListener("click", () => {
    converterScreen.classList.add("hidden");
    menuScreen.classList.remove("hidden");
});