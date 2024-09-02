import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function() {
  updateBalance(); // Use a more descriptive function name
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");

  const depositAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  try {
    if (document.getElementById("input-amount").value.length != 0 && !isNaN(depositAmount)) {
      await dbank.topUp(depositAmount);
      alert("Top-up successful!"); 
    } else if (withdrawalAmount > 0 && !isNaN(withdrawalAmount)) {
      await dbank.withdrawal(withdrawalAmount);
      alert("Withdrawal successful!"); 
    } else {
      alert("Please enter a valid amount."); 
    }

    await dbank.compound();
    alert("Compounding successful!"); 

    updateBalance(); 

  } catch (error) {
    console.error("Error interacting with dbank:", error);
    alert("An error occurred. Please try again later."); 
  } finally {
    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  }
});

async function updateBalance() {
  try {
    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
  } catch (error) {
    console.error("Error fetching balance:", error);
    // Display a user-friendly error message in your HTML
    document.getElementById("error-message").innerText = "Failed to fetch balance. Please try again later."; 
  }
}