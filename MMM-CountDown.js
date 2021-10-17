Module.register("MMM-CountDown",{
	// Default module config.
	defaults: {
		event: "New Millenium:",
		date: "3000-01-01",
		showHours: true,
		showMinutes: true,
		showSeconds: true,
		customInterval: 1000,
		daysLabel: 'd',
		hoursLabel: 'h',
		minutesLabel: 'm',
		secondsLabel: 's',
	},
	getScripts: function () {
		return [
      			this.file("lib/countdown.min.js"),
      			this.file("lib/moment.min.js")
    		];
	},

	// set update interval
	start: function() {
		var self = this;
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.customInterval); 
	},

	// Update function
	getDom: function() {
		var pregnancy_date_length = {"9":"0.85","10": "1.22", "11": "1.61", "12": "2.13", "13": "2.64", "14": "5.79", "15": "6.57", "16": "7.32", "17": "8.03", "18": "8.74", "19": "9.45", "20": "10.12", "21": "10.79", "22": "11.42", "23": "12.05", "24": "12.68", "25": "13.27", "26": "13.82", "27": "14.41", "28": "14.80", "29": "15.47", "30": "15.95", "31": "16.46", "32": "16.93", "33": "17.36", "34": "17.83", "35": "18.23", "36": "18.62", "37": "19.02", "38": "19.41", "39": "19.72", "40": "20.08", "41": "20.39"}
		var ppi = 94.34
		var conception = moment("20210809", "YYYYMMDD")
		var weeks = moment().diff(conception, 'weeks')
		var fetal_length = 0.85
		if (weeks >= 9 && weeks <=41){
		    fetal_length = pregnancy_date_length[weeks]
		    //console.log("Oh ya! We've got measurements.")
		}
		    
		var wrapper = document.createElement("div");

		var timeWrapper = document.createElement("div");
		var textWrapper = document.createElement("div");
		var imageWrapper = document.createElement("div");
		var linebreak = document.createElement("br");
		
		var image = document.createElement("img")
		image.src = "https://i.ibb.co/kS3xXs6/baby.jpg"
		image.style.width = "" + fetal_length*ppi + "px"

		imageWrapper.appendChild(image)

		textWrapper.className = "align-left week dimmed medium";
		timeWrapper.className = "time bright xlarge light";
		textWrapper.innerHTML=this.config.event;

		var today = new Date(Date.now());
		var target = new Date(this.config.date);
		var timeDiff = target - today;

		// Set days, hours, minutes and seconds
		var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		var diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		
		// Build the output
		var hrs = '';
		var mins = '';
		var secs = '';
		var days = diffDays + this.config.daysLabel;

		if(this.config.showHours == true) hrs = diffHours + this.config.hoursLabel;
		if(this.config.showMinutes == true) mins = diffMinutes + this.config.minutesLabel;
		if(this.config.showSeconds == true) secs = diffSeconds + this.config.secondsLabel;

		/*timeWrapper.innerHTML = days + hrs + mins + secs;*/
		timeWrapper.innerHTML = countdown( new Date("5/17/22"), null, countdown.WEEKS |  countdown.DAYS ).toString();

		wrapper.appendChild(textWrapper);
		wrapper.appendChild(timeWrapper);
		wrapper.appendChild(linebreak);
		wrapper.appendChild(imageWrapper);

		return wrapper;
	}
});
