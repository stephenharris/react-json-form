import Rembrandt from 'rembrandt'
import Colors from 'colors'


export default function (screenshotPath, modelPath, tolerance) {
	const rembrandt = new Rembrandt({
	  imageA: screenshotPath,
	  imageB: modelPath,
	  thresholdType: Rembrandt.THRESHOLD_PERCENT,
	  maxThreshold: tolerance,
	  maxDelta: 2,
	  maxOffset: 0,	 
	  renderComposition: false, // Should Rembrandt render a composition image? 
	})

	 
	// Run the comparison 
    return rembrandt.compare()
	  .then(function (result) {
	  	var difference = 'Difference: ' + (result.threshold * 100).toFixed(2) + '%';

	    if (result.passed) {
				console.log(" Images are equal".gray);	    	
				console.log(difference.gray);
	    } else {
	    	console.log("Passed: false".bold.gray);
	    	console.log(difference.bold.red);
	    	throw new Error("Images are different".bold.red);
	    }
	  })
}