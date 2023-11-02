<script>
	import Page from "../../routes/+page.svelte";
    export let url='';
    export let Title='';
    export let Description='';
    export let tags = [];
    export let PageLink = ''
    import Button from "./Button.svelte";
</script>


    <div class="max-w-sm rounded overflow-hidden shadow-lg card bg-white m-auto mt-4">
      <section>
        <aside>
            <img class="mt-2 transition-transform
            duration-300 transform-gpu" src={url} alt="Url">
        </aside>
        <div class="px-6 py-4 bg-white text-center">
          <div class="font-bold text-xl mb-2">{Title}</div>
          <p class="text-gray-700 text-base">
            {Description}
          </p>
          <Button link={PageLink}>
            Play With Model
          </Button>
        </div>
        <div class="px-6 pt-4 pb-2 bg-white">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tags[0]}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tags[1]}</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tags[2]}</span>
        </div>
      </section>
      </div>

    
<style>
  .card:hover img {
    transform: scale(1.09);
    }
    img{
        width: 100%;
    }
    aside img{
        height: 45vh;
    }
    .card{
      width:100%;
    }
    
</style>