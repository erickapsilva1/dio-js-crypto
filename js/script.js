// My API key
var apikey = {
    key: 'use your API key here'
}

var url = "";

// get Fetch requisition
fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=' + 
        apikey.key)
        .then((response) => {
            if(!response.ok) throw new Error('Request error, status ' + response.status);
            return response.json();
        })
        .then((api) => {
            
            var texto = "";
            // get 10 coins and symbols
            for(let i = 0; i < 10; i++){
                
                fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?CMC_PRO_API_KEY=' + apikey.key + '&id=' + api.data[i].id)
                    .then((response) => {
                        if(!response.ok) throw new Error('Error to collect img info.' + response.status);
                        return response.json();
                    })
                    .then((api2) => {
                        var id = api.data[i].id;
                        this.url = `${api2.data[id].logo}`

                        texto = texto + `
                
                        <div class="media">
                            <img src="${url}" class="align-self-center mr-3" alt="coin" width="64" height="64">
                            <div class="media-body">
                            <h5 class="mt-2">${api.data[i].name}</h5>
                            <p>${api.data[i].symbol}</p>
                            <p>${api.data[i].quote.USD.price}
                            </div>
                        </div>
                        `;
                        document.getElementById("coins").innerHTML = texto;
                        url = "";
                    })
                    .catch((error) => {
                        console.error(error.message);
                    });
                
            }

            // console.log(api);
        })
        .catch((error) => {
            console.error(error.message);
        });

