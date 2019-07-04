<template>
  <div class>
    <!-- 赛程联动下拉框 ,通过matchId进行初始化-->

    <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
  </div>
</template>
<script>
import select_match_progress from "../components/form_item/select_match_progress.vue";

export default {
  components: { select_match_progress },
  data() {
    return {
      formData: {
        matchType: 2,
        matchProgress111: { bigProgress: null, smallProgress: null }
      },
      cityId: "4402",
      arr1: [
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

