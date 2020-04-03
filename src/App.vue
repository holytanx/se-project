<template>
<div class="app">
  <v-app class="grey lighten-4">
   <Navbar/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</div>

</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  
  components: {
    Navbar
  },
  

  data: () => ({
    
  }),
};
</script>

