
document.getElementById("clickV").addEventListener("click", () => {

	let faceValue = document.getElementById("faceV").value;
	let couponRate = document.getElementById("couponR").value;
	let currentRate = document.getElementById("currentR").value;
	let cdRate = document.getElementById("cdR").value;

	faceValue = Number(faceValue);
	couponRate = Number(couponRate / 100);
	currentRate = Number(currentRate / 100);
	cdRate = Number(cdRate / 100);

// Bond data
	let dividend = faceValue * couponRate;
	let dividendFinal = faceValue + (faceValue * couponRate);
	let divider = 1 + currentRate;

	let bondAllDividends = dividend * 5;
	let firstDividend = dividend / divider;
	let secondDividend = dividend / Math.pow(divider, 2);	
	let thirdDividend = dividend / Math.pow(divider, 3);
	let fourthDividend = dividend / Math.pow(divider, 4);
	let fifthDividend = dividendFinal / Math.pow(divider, 5);

	let currentValue = firstDividend + secondDividend + thirdDividend + fourthDividend + fifthDividend;

	let bondAllValue = currentValue + bondAllDividends;

// CD data
	let cdDividend = cdRate * faceValue;
	let cdAllDividends = cdDividend * 5;
	let cdAllValue = faceValue + cdAllDividends;

// Present Bond value
	document.getElementById("presentV").textContent = currentValue.toFixed(2);
	if (currentValue > faceValue) {
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

		let trigDivider = 1 + i;

		let trigFirstDividend = dividend / trigDivider;
		let trigSecondDividend = dividend / Math.pow(trigDivider, 2);	
		let trigThirdDividend = dividend / Math.pow(trigDivider, 3);
		let trigFourthDividend = dividend / Math.pow(trigDivider, 4);
		let trigFifthDividend = dividendFinal / Math.pow(trigDivider, 5);

		let trigCurrentValue = trigFirstDividend + trigSecondDividend + trigThirdDividend + trigFourthDividend + trigFifthDividend;

		let trigBondAllValue = trigCurrentValue + bondAllDividends;

		if (trigBondAllValue < cdAllValue) {
			trigger = i * 100;
			i = .05;
		}
	}
	document.getElementById("whatRate").textContent = trigger.toFixed(2);
});