<script>
    export let link = '#';
</script>

<a href="{link}">
  <button
  class="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 mt-2">
  <slot></slot>
</button>

</a>
<style>
  
  button{
    width:100%;
  }
</style>