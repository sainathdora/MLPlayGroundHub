<script>
	import LinearRegressionImage from '$lib/Images/LinearRegression.png';
	export let data;
	$: YearsExp = data['csv_data']['YearsExperience'];
	$: Salary_data = data['csv_data']['Salary'];
	let Years_of_exp = 0;
	let showLabel = {
		status : false,
		Label : null
	}
	async function GetLabel(){
		const response = await fetch('/api/LinearRegression',{
			method:'POST',
			body:JSON.stringify({
				Exp: Years_of_exp
			})
		})
		const resJson = await response.json();
		showLabel['status'] = true
		showLabel['Label'] = resJson['Label']
	}
	
</script>
<h1 class="text-4xl font-bold text-center mb-2">Linear Regression Data</h1>
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
				{#each Object.keys(Salary_data).slice(0, 5) as i (i)}
					<tr>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{YearsExp[i]}</td>
						<td class="px-6 py-4 whitespace-no-wrap border-l">{Salary_data[i]}</td>
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
<div class="w-64 h-64 border rounded-lg overflow-hidden shadow-lg imgdata mx-auto">
	<img src={LinearRegressionImage} alt="Linear regression" />
</div>

<h2 class="text-3xl font-bold mb-2 text-pink-500 text-center">Source Code<br />(R-code)</h2>

<section class="mx-auto bg-black rounded-lg p-4">
	<div class="text-white text-sm font-mono">
		<pre class="language-r">
<code>
library(caTools)
library(ggplot2)

# Read the CSV data
df = read.csv('Salary_Data.csv')

# Set seed for reproducibility
set.seed(1)

# Split the data into training and test sets
split = sample.split(df$Salary, SplitRatio = 0.8)
train_set = df[split, ]
test_set = df[!split, ]

# Create a linear regression model
regressor = lm(formula = Salary ~ YearsExperience, data = train_set)

# Make predictions on the test set
y_pred = predict(regressor, newdata = test_set)

# Create a scatter plot with regression line
ggplot() +
  geom_point(aes(x = train_set$YearsExperience, y = train_set$Salary), colour = 'red') +
  geom_line(aes(x = train_set$YearsExperience, y = predict(regressor, newdata = train_set)), colour = 'blue') +
  ggtitle('Salary Vs Experience (Training set)') +
  xlab('Years of experience') +
  ylab('Salary')
</code>
            </pre>
	</div>
</section>



<div class="max-w-md mx-auto mt-8">
	<form class="bg-pink-600 shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={GetLabel}>
	  <div class="mb-4">
		<label class="block text-white text-sm font-bold mb-2" for="yearsOfExperience">
		  Years Of Experience
		</label>
		<input
		  class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
		  id="yearsOfExperience"
		  type="number"
		  placeholder="Enter years of experience"
		  min="0"
		  bind:value={Years_of_exp}
		/>
	  </div>
	  <div class="flex items-center justify-between">
		<button
		  class="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
		  type="submit"
		>
		  Submit
		</button>
	  </div>
	</form>
  </div>

  {#if showLabel['status']}	

	  <h2 class="text-3xl font-bold text-center mb-2 text-purple-500">
		Predicted Salary is: <span class="text-red-900">{showLabel['Label'].toFixed(2)}$</span>
	  </h2>
  
  {/if}


<style>
	.imgdata {
		width: 50%;
		height: auto;
	}
	.imgdata img {
		width: 100%;
	}
	section {
		width: 60%;
		height: auto;
	}
</style>
