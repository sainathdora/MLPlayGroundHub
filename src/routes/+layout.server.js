
export const load = async ()=>{
    const url = 'https://sainath86.pythonanywhere.com/api/MLmodel/LR'
    const response = await fetch('https://sainath86.pythonanywhere.com/api/person',{
        method:'POST',
        body:JSON.stringify({
            name: 'John', age: 30
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    const resJSON = await response.json()
    return {
        resJSON
    }

}