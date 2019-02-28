// Order states
enum states {
	created = 'created', 
	confirmed = 'confirmed', 
	delivered = 'delivered', 
	cancelled = 'cancelled'
}

export default {
	id: '/orders',
  states: states,
};