
// Gather and post present month/year
let today = new Date();
let presentMonth = today.getMonth() + 1;
let presentYear = today.getFullYear();
let presentDate = presentMonth + "/" + presentYear;

document.getElementById("newD").placeholder = presentDate;


document.getElementById("clickR").addEventListener("click", () => {

	let currentRate = document.getElementById("whatR").value;
	let startDate = document.getElementById("newD").value;

	currentRate = Number(currentRate / 100);

	if (startDate === "") {
		startDate = presentDate;
	}

// Calculate the number of interest payments from the start date
	let theMonth = "";
	if (startDate.length === 6) {
		theMonth = Number(startDate.slice(0, 1));
	} else {
		theMonth = Number(startDate.slice(0, 2));
	}
	let theYear = Number(startDate.slice(-4));

// Maturity date is 2/2042
	let periods = ((2042 - theYear) * 2) + 1;
	if (theMonth > 1 && theMonth < 8) {
		periods = periods - 1;
	}
	if (theMonth > 7) {
		periods = periods - 2;
	}

// Bond data (paid semi-annually)
	let periodRate = currentRate / 2;
	let baseRate = 1 + periodRate;
	let partialRate = Math.pow(baseRate, periods);
	let dividerRate = 1 / partialRate;
	let mainRate = (1 - dividerRate) / periodRate;
	let dividerFace = 1000 / partialRate;

	let currentPrice = (11.875 * mainRate) + dividerFace;

// Present Bond price
	document.getElementById("currentV").textContent = currentPrice.toFixed(2);

// Total return - cost + payments to date
	let payments= 11.875 * (40 - periods);
	let aReturn = currentPrice + payments;

	document.getElementById("aReturn").textContent = aReturn.toFixed(2);

// Figuring a rough yearly percentage
	let profit = aReturn - 996.6738;
	let profitYield = profit / 996.6738;

	let timeSpan = 0;
	if (theYear === 2022) {
		timeSpan = theMonth - 2;
	} else if (theYear === 2023) {
		timeSpan = theMonth + 10;
	} else {
		timeSpan = (((theYear - 2022) - 1) * 12) + theMonth + 10;
	}
	timeSpan = timeSpan / 12;

	console.log(timeSpan);
// Stepping through annualized formula
	let profitPlus = 1 + profitYield;
	let timePower = 1 / timeSpan;
	let returnPower = Math.pow(profitPlus, timePower);
	let annualizedPercent = (returnPower - 1) * 100;

	console.log(annualizedPercent);

	document.getElementById("intPay").textContent = (40 - periods);
	document.getElementById("yearR").textContent = annualizedPercent.toFixed(2);	
});