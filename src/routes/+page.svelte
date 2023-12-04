<script>
	import Card from '$lib/Components/Card.svelte';
    export let data;
    $:console.log(data)
    let Models = [
      {
        id:1,
        Title:"Linear Regression",
        Description : "Predicting linear relationship between dependent variable and independent variable",
        url : 'https://miro.medium.com/v2/resize:fit:1200/1*Nf2tTTkALYq6RTMQmhjo1A.png',
        tags: ['Machine Learning', 'Supervised', 'Data Science'],
        PageLink : 'LinearRegression'
      },
      {
        id:2,
        Title:'Logistic Regression',
        Description:'Used for binary classification tasks, such as spam detection or medical diagnosis.',
        url:'https://rb.gy/v99hf',
        tags:['Machine Learning', 'Supervised', 'Data Science'],
        PageLink:'LogisticRegression'
      },
      {
        id:3,
        Title:'K-Means Clustering',
        Description:'Groups similar data points into clusters based on their features.',
        url:'https://rb.gy/1c5bm',
        PageLink: "Kmeans",
        tags:['Machine Learning', 'Unsupervised Learning', 'Data Science'] 
      },
      {
        id: 4,
        Title: "Random Forest",
        Description: "Random Forest is an ensemble learning method in machine learning that's widely used for both classification and regression tasks. It's known for its effectiveness, versatility.",
        url: "https://tse2.mm.bing.net/th?id=OIP.1qOkyyUI2eKfnMskLuxNygHaEK&pid=Api&P=0&h=180",
        PageLink:'RandomForest',
        tags: ["Machine Learning", "Supervised", "Ensemble Learning"]
      },
      {
        id: 5,
        Title: "Support Vector Machines (SVM)",
        Description: "A machine learning algorithm used for classification and regression tasks. SVM finds a hyperplane that best separates data points into different classes.",
        url: "https://tse3.mm.bing.net/th?id=OIP.aDzW5IzjZdipiB5f3F1v_wHaFT&pid=Api&P=0&h=180",
        PageLink:'SVM',
        tags: ["Machine Learning", "Supervised", "Classification"]
      },
      {
        id: 6,
        Title: "Decision Trees",
        Description: "A supervised learning algorithm used for classification and regression tasks. Decision trees make decisions by splitting data based on feature values.",
        url: "https://tse2.mm.bing.net/th?id=OIP.FZXRKCMCtRqfkB5Ed6-VwgHaEj&pid=Api&P=0&h=180",
        PageLink:'DecisionTree',
        tags: ["Machine Learning", "Supervised", "Classification"]
      }
    ]
</script>

<div class="container mx-auto grid grid-cols-1 bg-gradient-to-r from-indigo-500 to-pink-500
            sm:max-lg:grid sm:max-lg:grid-cols-2 sm:max-lg:gap-1 lg:grid lg:grid-cols-3 lg:gap-2">
  {#each Models as i (i.id)}
  <div class="Card">
    <Card
    url={i.url}
    Title={i.Title}
    Description={i.Description}
    tags={i.tags}
    PageLink = {i.PageLink}
    />
  </div>
  {/each}
</div>

<style>
  .container{
    width:80%;
  }
  nav li{
    transition: background-color 0.3s ease;
  }
  nav li:hover{
    background-color:rgb(99 102 241);
    border-radius: 20%;
  }
  @media only screen and (max-width: 640px) {
  /* Your styles for screens between 0 to 640 pixels go here */
  .Card{
   
    /* width: 17rem; */
    width: 97%;
    box-sizing: border-box;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .Card{
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>