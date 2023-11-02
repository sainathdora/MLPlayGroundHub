import { error, json } from "@sveltejs/kit";

export const POST = async({request})=>{

    const data = await request.json()
    const url = 'https://sainath86.pythonanywhere.com/api/LinearRegression';
    const feature = {
        'Exp':data['Exp']
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feature),
    });
   
    if (response.ok) {
      const responseData = await response.json();
      return json(responseData);
    } else {
      throw error(response.status, response.message)
    }
        
} 
