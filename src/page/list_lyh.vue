<template>
  <div class>
    <city_venue_list v-model="arr1"></city_venue_list>
  </div>
</template>
<script>
import city_venue_list from "../components/form_item/city_venue_list.vue";
export default {
  components: { city_venue_list },
  data() {
    return {

      arr1:[
        {
          cityId: "001",
          cityName: "深圳A",
          venueId: "15",
          venueName: "深圳唐球馆1"
        },
        {
          cityId: "001",
          cityName: "深圳1",
          venueId: "15",
          venueName: "深圳唐球馆2"
        },
        {
          cityId: "001",
          cityName: "深圳1",
          venueId: "15",
          venueName: "深圳唐球馆3"
        }
      ]
    };
  },
  
  methods: {}
};
</script>

