<script>
    import {page} from "$app/stores";
	import Rplot from '$lib/Images/Rplot.png'
    export let data;
    $:Age = data['csv_data']['Age'];
    $:Annual_Income = data['csv_data']['Annual Income (k$)']
    $:Spending_Score = data['csv_data']['Spending Score (1-100)'];


	let Age2, Spending_Score2;
    let label = false;
	let SegmentationUsingAnnualSS = {
		Annual_income: 30,
		SS : 30,
		label : true,
		GetLabel : function(){
			console.log('Annual: ', this.Annual_income)
			if(this.Annual_income<55 && this.SS<50){
				console.log('C1')
				return 'Cluster-1'
			}
			else if (this.Annual_income > 55 && this.SS<50){
				console.log('c4')
				return 'Cluster-4'

			}
			else if(this.Annual_income<55 && this.SS>50){
				console.log('C5')
				 return 'Cluster-5'
			}
			else if(this.Annual_income>55 && this.SS>60){
				console.log('c3')
				return 'Cluster-3'
			}
			else if((this.Annual_income >35 && this.Annual_income<80) &&(this.SS>20 && this.SS<80)){
				console.log('c2')
				return 'Cluster-2'
			}
			
		}
	}
    function GetLabel(){
        if(Spending_Score2<33){

            label='Cluster-2'
            
        }
        else if(Age <42 && Spending_Score >= 30 && Spending_Score <= 64){
            label='Cluster-3'
        }
        else if(Age>43 && Spending_Score>33 && Spending_Score<=68){
            label='Cluster-0'
        }
        else if(Spending_Score>68){
            label='Cluster-1'
        }
        Age = Spending_Score = false
    }


</script>

<h1 class="text-4xl font-bold text-center mb-2">Kmeans Clustering</h1>

<div class="flex items-center justify-center">
	<div class="w-2/3">
		<table
			class="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden"
		>
			<thead class="bg-gray-50">
				<tr>
					{#each Object.keys(data['csv_data']) as i}
						<th
							class="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
							>{i}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200">
				{#each Object.keys(Age).slice(0, 9) as i (i)}
					<tr>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{Age[i]}</td>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{Annual_Income[i]}</td>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{Spending_Score[i]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<p class="text-base text-gray-700 font-bold text-center mb-2 underline">
	Entire data can't be displayed due to size
</p>
<h2 class="text-3xl font-bold text-center mb-2 text-purple-500">Graphical Representation</h2>



<div class="h-screen w-screen"> <!-- Parent container with full height and width -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe class="w-full h-full" src="https://wonderful-sopapillas-886153.netlify.app/"></iframe> <!-- Make the iframe full width and height -->
  </div>
  
<div class="w-100 h-100 border rounded-lg overflow-hidden shadow-lg mx-auto">
	<img src={Rplot} alt="Linear regression" class="mx-auto"/>
</div>