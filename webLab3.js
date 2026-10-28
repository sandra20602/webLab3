const display = document.querySelector("#display");
const keys = document.querySelector(".keys");

let expr = "";   
const operators = "+−×÷";

function calculate() {
  const math = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/%/g, "/100")
    .replace(/\b0+(\d)/g, "$1"); 
  try {
    const result = Function("return " + math)();
    expr = isFinite(result) ? String(Math.round(result * 1e10) / 1e10) : "Error";
  } catch {
    expr = "Error";
  }
}

keys.addEventListener("click", (e) => {
  const key = e.target.dataset.key;
  if (!key) return;

  if (expr === "Error") expr = "";
  const last = expr.slice(-1);

  if (key === "AC") {
    expr = "";
  } else if (key === "=") {
    if (expr) calculate();
  } else if (operators.includes(key)) {
    if (!expr) return;                                   
    if (operators.includes(last)) expr = expr.slice(0, -1); 
    expr += key;
  } else {
    expr += key;
  }

  display.textContent = expr || "0";
});