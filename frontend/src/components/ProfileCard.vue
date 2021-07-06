<template>

   <!-- Start of component -->
   <div class="max-w-sm bg-white border-2 border-gray-300 p-6 rounded-lg tracking-wide shadow-lg">
      <div id="header" class="flex items-center mb-4"> 
         <img alt="avatar" class="w-20 rounded-full border-2 border-gray-300" src="https://picsum.photos/seed/picsum/200" />
         <div id="header-text" class="leading-5 ml-6 sm">
            <h4 id="name" class="text-xl font-semibold">{{name}}</h4>
            <h5 id="job" class="font-semibold text-blue-600">Designer</h5>
         </div>
      </div>
     
   </div>
   <!-- End of component -->

</template>

<script>
export default {
    name: 'ProfileCard',
    props: {
        name: String
    }
}
</script>
