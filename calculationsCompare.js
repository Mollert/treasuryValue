
document.getElementById("clickV").addEventListener("click", () => {

	let faceValue = document.getElementById("faceV").value;
	let couponRate = document.getElementById("couponR").value;
	let currentRate = document.getElementById("currentR").value;
	let cdRate = document.getElementById("cdR").value;

	faceValue = Number(faceValue);
	couponRate = Number(couponRate / 100);
	currentRate = Number(currentRate / 100);
	cdRate = Number(cdRate / 100);

// Bond data (paid semi-annually)
	let interest = (faceValue * couponRate) / 2;
	let periodRate = currentRate / 2;
	let baseRate = 1 + periodRate;
	let partialRate = Math.pow(baseRate, 10);
	let dividerRate = 1 / partialRate;
	let mainRate = (1 - dividerRate) / periodRate;
	let dividerFace = faceValue / partialRate;

	let currentValue = (interest * mainRate) + dividerFace;

	let totalInterest = interest * 10;

	let bondAllValue = currentValue + totalInterest;

// CD data
	let cdInterest = cdRate * faceValue;
	let cdAllInterest = cdInterest * 5;
	let cdAllValue = faceValue + cdAllInterest;

// Present Bond value
	document.getElementById("presentV").textContent = currentValue.toFixed(2);
	if (bondAllValue > faceValue) {
		document.getElementById("presentDir").textContent = "has increased";		
	} else {
		document.getElementById("presentDir").textContent = "is discounted";
	}

// Present Bond value plus all dividends
	document.getElementById("presentVD").textContent = bondAllValue.toFixed(2);

// CD value including all interenst
	document.getElementById("cdV").textContent = cdAllValue.toFixed(2);

// What is the percentage that triggers a sale
	let trigger = 0;

	for ( let i = .02 ; i < .05 ; i+=.0001 ) {

		let tPeriodRate = i / 2;

		let tBaseRate = 1 + tPeriodRate;
		let tPartialRate = Math.pow(tBaseRate, 10);
		let tDividerRate = 1 / tPartialRate;
		let tMainRate = (1 - tDividerRate) / tPeriodRate;
		let tDividerFace = faceValue / tPartialRate;

		let tCurrentValue = (interest * tMainRate) + tDividerFace;

		let tBondAllValue = tCurrentValue + totalInterest;

		if (tBondAllValue < cdAllValue) {
			trigger = i * 100;
			i = .05;
		}
	}
	document.getElementById("whatRate").textContent = trigger.toFixed(2);

});

// https://www.easycalculation.com/finance/bond-price-calculator.php