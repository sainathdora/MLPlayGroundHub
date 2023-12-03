<script>
    import "../app.css";
    import {page} from "$app/stores";
    import Footer from "../lib/Components/Footer.svelte";

  </script>
  <header>

    <nav class="px-12 py-5 bg-pink-600 text-white flex justify-between">
        <h1 class="font-bold font-mono">MLPlaygroundHub</h1>
        <ul class="flex space-x-3 justify-end h-10 align-middle">
            <li class="mx-2 cursor-pointer"><a href="/">Home</a></li>
            <li class="mx-2 cursor-pointer">About</li>
            <li class="mx-2 cursor-pointer">Contact us</li>
        </ul>
    </nav>
    {#if $page['route']['id'] === '/'}
    <img src="https://i.pinimg.com/originals/2b/91/91/2b9191c0750915300106a457fddec474.gif" alt="machine img"
    class="h-40 m-auto">
    {/if}
</header>

  <slot />


  <Footer/>

  <style>
    
  </style>