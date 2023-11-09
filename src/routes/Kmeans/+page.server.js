export const load = async ()=>{
    const csv_data = await import('$lib/CsvData/Kmeans.json')
    return {
        csv_data : csv_data['default']
    }
}