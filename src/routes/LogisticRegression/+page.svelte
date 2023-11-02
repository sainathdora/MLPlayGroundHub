<script>
    import LogisticRegressionImage2 from '$lib/Images/Logistic Regression2.png';
    import LogisticRegressionImage from '$lib/Images/LogisticRegression.png';
	import { slide } from 'svelte/transition';
    export let data;
    let Age, Salary = 0;
    let code =`
library(ggplot2)
library(caTools)
set.seed(1)
df <- read.csv('Social_Network_Ads.csv')
split = sample.split(df$Purchased, SplitRatio = 0.75)
training_set = df[split, ]
test_set = df[!split, ]

#Feature Scaling
training_set[, 1:2] = scale(training_set[, 1:2])
test_set[, 1:2] = scale(test_set[, 1:2])

#Logistic regression

classifier = glm(formula = Purchased ~ ., 
                  family = binomial,
                  data = training_set)

predicted_probs <- predict(classifier, newdata = training_set, type = "response")

#function
RelationBetweenX1X2 = function(model, X1, probability){
  intercept = coef(model)[1]
  z = -(log(1/probability - 1))
  X2 = (z-intercept*coef(model)[1]*X1)/(coef(model)[2])
  return(X2)
}

Y_values = function(X){
  Y = c()
  for(i in X){
    Y = append(Y, RelationBetweenX1X2(classifier, i, 0.5))
  }
  return(Y)
}

#Plotting the graph

ggplot() + 
  geom_point(aes(x = training_set[training_set$Purchased == 1, 1],
                 y = training_set[training_set$Purchased == 1, 2],
                 color = 'Purchasedd'), 
             show.legend = TRUE) +
  geom_point(aes(x = training_set[training_set$Purchased == 0, 1],
                 y = training_set[training_set$Purchased == 0, 2],
                 color = 'Not purchased'), 
             show.legend = TRUE) +
  xlab('Age') + ylab('Salary') +
  scale_color_manual(values = c('Purchasedd' = 'blue', 'Not purchased' = 'red'),
                     labels = c('Not Purchased', 'purchased'))+
  labs(colour='Satus')+
  geom_line(aes(x=training_set[, 1], 
                y=Y_values(training_set[, 1])), color='black',
            linetype='dashed', linewidth=1)+
  geom_ribbon(
    data = training_set,
    aes(
      x = training_set[, 1],
      ymin = -Inf,
      ymax = Y_values(training_set[, 1])
    ),
    fill = "red",
    alpha = 0.2
  ) + 
  geom_ribbon(
    data=training_set,
    aes(
      x=training_set[, 1],
      ymin=Y_values(training_set[, 1]),
      ymax=Inf
    ),
    fill='green',
    alpha=0.2
  )`

  let showLabel = {
		status : false,
		Label : null
	}

  async function GetLabel(){
    const response = await fetch('/api/LogisticRegression',{
			method:'POST',
			body:JSON.stringify({
				Age: Age,
        Salary:Salary
			})
		})
    const resJson = await response.json();
    showLabel['status'] = true;
    showLabel['Label'] = resJson;
  }
</script>
<h1 class="text-4xl font-bold text-center mb-2">
    Logistic Regression
</h1>



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
                {#each Object.keys(data['csv_data']['Age']).slice(0,10) as i (i)}
            <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-l">{data['csv_data']['Age'][i]}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-l">{data['csv_data']['EstimatedSalary'][i]}</td>
                <td class="px-6 py-4 whitespace-no-wrap border-l">{data['csv_data']['Purchased'][i]}</td>
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

<div class="grid grid-cols-2 gap-2 p-4">
    <figure class="text-center">
        <img src={LogisticRegressionImage} alt="Logistic regression" />
        <figcaption class="font-extrabold">Fig-1: No Feature Scaling</figcaption>
      </figure>
      <figure>
        <img src={LogisticRegressionImage2} alt="Logistic regression 2" />
        <figcaption class="text-center font-extrabold">Fig-2: Feature Scaling</figcaption>
      </figure>
   
</div>

<h2 class="text-3xl font-bold mb-2 text-pink-500 text-center">Source Code<br />(R-code)</h2>
<section class="mx-auto bg-black rounded-lg p-4 w-auto">
	<div class="text-white text-sm font-mono">
        <pre class="language-r ">
            <code>
                {code}
            </code>
        </pre>
	</div>
</section>

<div class="max-w-md mx-auto mt-8">
	<form class="bg-pink-600 shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={GetLabel}>
	  <div class="mb-4">
		<label class="block text-white text-sm font-bold mb-2" for="Age">
		  Age
		</label>
		<input
		  class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
		  id="Age"
		  type="number"
		  placeholder="Enter Customer Age"
		  min="10"
		  bind:value={Age}
		/>
	  </div>

    <div class="mb-4">
      <label class="block text-white text-sm font-bold mb-2" for="EstimatedSalary">
        EstimatedSalary
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        id="EstimatedSalary"
        type="number"
        placeholder="Enter Customer Age"
        min="0"
        bind:value={Salary}
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
  <h2 class="text-2xl font-bold text-center mb-2 text-purple-500">There's a {(showLabel['Label']['Probability(1)']*100).toFixed(3)}% chances of the person purchasing our Insurance Plan</h2>
  {#if showLabel['Label']['Label']===1}
    <h2 class="text-3xl font-bold text-center text-green-500 b-2">The person will purchase our Insurance Plan</h2>
    {:else}
    <h2 class="text-3xl font-bold text-center text-red-500 mb-2">The person won't Purchase our Insurance Plan</h2>
  {/if}
{/if}


<style>

    section {
        width: 60%;
        height: auto;
    }
</style>