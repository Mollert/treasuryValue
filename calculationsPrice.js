
document.getElementById("clickP").addEventListener("click", () => {

	let couponRate = document.getElementById("couponR").value;
	let currentRate = document.getElementById("currentR").value;
	let matureDate = document.getElementById("matureD").value;

	couponRate = Number(couponRate / 100);
	currentRate = Number(currentRate / 100);

// Calculate number of interest paying periods from present day
	let today = new Date();
	let presentMonth = Number(today.getMonth() + 1);
	let presentYear = Number(today.getFullYear());

	let matureMonth = "";
	if (matureDate.length === 6) {
		matureMonth = Number(matureDate.slice(0, 1));
	} else {
		matureMonth = Number(matureDate.slice(0, 2));
	}
	let matureYear = Number(matureDate.slice(-4));

	let periods = (matureYear - presentYear) * 2;
	if (matureMonth < presentMonth) {
		periods -= 1;
	}

// Bond data (paid semi-annually)
	let interest = (1000 * couponRate) / 2;
	let periodRate = currentRate / 2;
	let baseRate = 1 + periodRate;
	let partialRate = Math.pow(baseRate, periods);
	let dividerRate = 1 / partialRate;
	let mainRate = (1 - dividerRate) / periodRate;
	let dividerFace = 1000 / partialRate;

	let currentPrice = (interest * mainRate) + dividerFace;

// Number of semi-annual payments
	document.getElementById("payments").textContent = periods;

// Present Bond price
	document.getElementById("presentP").textContent = currentPrice.toFixed(2);

});