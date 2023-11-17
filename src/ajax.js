const apiHost = 'http://localhost:3000';

export default {
    async fetchInitialDeals() {
        try {
            const response = await fetch(apiHost + '/api/deals');
            const responseJson = await response.json();
            return responseJson;
        } catch(error){
            console.log(error);
        }
    },
    async fetchDealDetails(dealId) {
        try {
            const response = await fetch(apiHost + '/api/deals/'+dealId);
            const responseJson = await response.json();
            return responseJson;
        } catch(error){
            console.log(error);
        }
    },
    async fetchDealSearchResults(searchTerm) {
        try {
            const response = await fetch(apiHost + '/api/deals?searchTerm='+ searchTerm);
            const responseJson = await response.json();
            return responseJson;
        } catch(error){
            console.log(error);
        }
    }
}