document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'no-api-1.0',
			passQueueLength: 0,
			tQueueLength: 0,

			joinQueue() {
				this.passQueueLength += 1;
			},
			leaveQueue() {
				if(this.passQueueLength > 0){
					this.passQueueLength -= 1;
				}
			},

			joinTaxiQueue() {
				this.tQueueLength += 1;
			},

			queueLength() {
				return (this.passQueueLength)
			},

			taxiQueueLength() {
				return (this.tQueueLength);
			},

			taxiDepart() {
				if(this.passQueueLength >= 12 && this.tQueueLength > 0){
					this.tQueueLength -= 1;
					this.passQueueLength -= 12;
				}
				else{
					alert('Not enough passengers or no taxi to depart');
				}
			}
		}

	});

});