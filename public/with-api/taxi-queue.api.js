document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {

		return {
			version: 'api-1.0',

			/* init() {
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength1 = result.data.queueCount
					});
			}, */

			joinQueue() {
				axios
					.post('/api/passenger/join')
			},

			leaveQueue(){
				axios
					.post('/api/passenger/leave')
			},

			joinTaxiQueue(){
				axios
					.post('/api/taxi/join')
			},

			queueLength(){
				axios
					.get('/api/passenger/queue')
					.then(result => {
						// an example API call
						this.queueLength = result.data.queueCount
					});
			},

			taxiQueueLength(){
				axios
					.get('/api/taxi/queue')
					.then(result => {
						// an example API call
						this.taxiQueueLength = result.data.queueCount
					});
			},

			taxiDepart(){
				axios.post('/api/taxi/depart')
			}
		}

	});
});