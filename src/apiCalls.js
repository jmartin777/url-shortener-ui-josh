const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(response => {
    if(!response.ok){
      throw new Error("Failed to Fetch Urls")
    }
    return response.json()
    })
      
}

export const postUrl = (data) => {
  // {long_url: <String>, title: <String>}
  fetch('http://localhost:3001/api/v1/urls',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {"Content-Type":"application/json"}

  }).then(res => res.json())
  .then(data => {
       console.log(data);
  })
  .catch(error => console.error(error));
}





export default getUrls;
// // Get all saved urls	
// /api/v1/urls	GET	N/A	All urls on the server: {urls: [{}, {}, ...]}

// // Save a new url and get back a the shortened url	
// /api/v1/urls	POST	{long_url: <String>, title: <String>}	New url that was added with the shortened url: 

// {id: 2, long_url: "https://images.unsplash.com/photo...", short_url: "http://localhost:3001/useshorturl/2", title: 'Awesome photo'}

// // Delete existing saved url	
// /api/v1/urls/:url_id	DELETE	N/A	For successful deletion: No response body (only 204 status code)