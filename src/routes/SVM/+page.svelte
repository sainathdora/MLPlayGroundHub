<script>
    export let data;
	import KernalSVM from '$lib/Images/KernalSVM.png'
	import KernalSVM2 from '$lib/Images/KernalSVM2.png'
    let Age, Salary = 0;
    let code = `
    
# Importing the dataset
dataset = read.csv('Social_Network_Ads.csv')
dataset = dataset[3:5]

# Encoding the target feature as factor
dataset$Purchased = factor(dataset$Purchased, levels = c(0, 1))

# Splitting the dataset into the Training set and Test set
# install.packages('caTools')
library(caTools)
set.seed(123)
split = sample.split(dataset$Purchased, SplitRatio = 0.75)
training_set = subset(dataset, split == TRUE)
test_set = subset(dataset, split == FALSE)

# Feature Scaling
training_set[-3] = scale(training_set[-3])
test_set[-3] = scale(test_set[-3])

# Fitting Kernel SVM to the Training set
# install.packages('e1071')
library(e1071)
classifier = svm(formula = Purchased ~ .,
                 data = training_set,
                 type = 'C-classification',
                 kernel = 'radial')

# Predicting the Test set results
y_pred = predict(classifier, newdata = test_set[-3])

# Making the Confusion Matrix
cm = table(test_set[, 3], y_pred)

# Visualising the Training set results
library(ElemStatLearn)
set = training_set
X1 = seq(min(set[, 1]) - 1, max(set[, 1]) + 1, by = 0.01)
X2 = seq(min(set[, 2]) - 1, max(set[, 2]) + 1, by = 0.01)
grid_set = expand.grid(X1, X2)
colnames(grid_set) = c('Age', 'EstimatedSalary')
y_grid = predict(classifier, newdata = grid_set)
plot(set[, -3],
     main = 'Kernel SVM (Training set)',
     xlab = 'Age', ylab = 'Estimated Salary',
     xlim = range(X1), ylim = range(X2))
contour(X1, X2, matrix(as.numeric(y_grid), length(X1), length(X2)), add = TRUE)
points(grid_set, pch = '.', col = ifelse(y_grid == 1, 'dodgerblue', 'salmon'))
points(set, pch = 21, bg = ifelse(set[, 3] == 1, 'dodgerblue3', 'salmon3'))

# Visualising the Test set results
library(ElemStatLearn)
set = test_set
X1 = seq(min(set[, 1]) - 1, max(set[, 1]) + 1, by = 0.01)
X2 = seq(min(set[, 2]) - 1, max(set[, 2]) + 1, by = 0.01)
grid_set = expand.grid(X1, X2)
colnames(grid_set) = c('Age', 'EstimatedSalary')
y_grid = predict(classifier, newdata = grid_set)
plot(set[, -3], main = 'Kernel SVM (Test set)',
     xlab = 'Age', ylab = 'Estimated Salary',
     xlim = range(X1), ylim = range(X2))
contour(X1, X2, matrix(as.numeric(y_grid), length(X1), length(X2)), add = TRUE)
points(grid_set, pch = '.', col = ifelse(y_grid == 1, 'dodgerblue', 'salmon'))
points(set, pch = 21, bg = ifelse(set[, 3] == 1, 'dodgerblue3', 'salmon3'))`



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
    Support Vector Machine
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
        <img src={KernalSVM} alt="Logistic regression" />
        <figcaption class="font-extrabold">Fig-1: Training Set</figcaption>
      </figure>
      <figure>
        <img src={KernalSVM2} alt="Logistic regression 2" />
        <figcaption class="text-center font-extrabold">Fig-2: Test Set</figcaption>
      </figure>
   
</div>

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