export const load = async()=>{
    const csv_data = await import('$lib/CsvData/LinearRegression.json')
    return {
        csv_data : csv_data['default']
    }
}