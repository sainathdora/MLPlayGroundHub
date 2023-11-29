import { error, json } from "@sveltejs/kit";

export const POST = async({request})=>{

    const data = await request.json()
    const url = 'https://sainath86.pythonanywhere.com/api/LogisticRegression';
        const feature = {
            Age: data['Age'],
            Salary:data['Salary']
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
          console.log(responseData)
          return json(responseData)
        }else{
            console.log('Error', response.status)
            throw error(response.status, response.statusText)
        }
        
} 
