<template>
  <div>
    <h1> Ah Huat's Zi Char </h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  h1 {
    text-align: center;
    background-color:cornflowerblue;
    padding: 30px;
    color: white;
    font-family:'Franklin Gothic Medium', Arial, sans-serif;
    font-size: 50px;
  }
  h2 {
    text-align: center;
    background-color:dimgray;
    color: white;
    padding: 20px;
    font-family:'Franklin Gothic Medium', Arial, sans-serif;
  }
</style>
