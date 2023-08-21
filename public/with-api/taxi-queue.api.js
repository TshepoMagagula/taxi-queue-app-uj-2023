document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',
			queueLength1 : 0,
			queueLengthTaxi: 0,

			init() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			joinQueue() {
				axios
					.post('/api/passenger/join')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			leaveQueue(){
				axios
					.post('/api/passenger/leave')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			joinTaxiQueue(){
				axios
					.post('/api/passenger/join')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			queueLength(){
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			taxiQueueLength(){
				axios
					.get('/api/taxi/queue')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			},

			taxiDepart(){
				axios
					.post('/api/taxi/depart')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount;
						this.queueLengthTaxi = result.data.queueCountTaxi;
					});
			}
		}

	});
});


