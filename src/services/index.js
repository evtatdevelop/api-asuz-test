export default class Service {

  getResource = async (url, data) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'API-Key': data.api_key
      }
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json();   
  }

  postResource = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'API-Key': data.api_key
      }
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  updateResource = async (url, data) => {
    const res = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'API-Key': data.api_key
      }
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  deleteResource = async (url, api_key) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'API-Key': api_key
      }
    });
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return await res.json(); 
  }

  uploadFile = async (url, data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data.file);
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'API-Key': data.api_key
      }
    })
    if (!res.ok) throw new Error(`Could non fetch ${url}. Status: ${res.status}`);
    return res; 
  }

}
