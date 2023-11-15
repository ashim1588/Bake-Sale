const apiHost = 'http://localhost:3000';

export default {
    async fetchInitialDeals() {
        try {
            let response = await fetch(apiHost + '/api/deals');
            let responseJson = await response.json();
            return responseJson;
        } catch(error){
            console.log(error);
        }
    }
}