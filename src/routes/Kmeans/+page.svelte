<script>
    import {page} from "$app/stores";

    export let data;
    $:console.log(data)
    $:Age = data['csv_data']['Age'];
    $:Annual_Income = data['csv_data']['Annual Income (k$)']
    $:Spending_Score = data['csv_data']['Spending Score (1-100)'];
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
    <iframe class="w-full h-full" src="https://wonderful-sopapillas-886153.netlify.app/"></iframe> <!-- Make the iframe full width and height -->
  </div>
  