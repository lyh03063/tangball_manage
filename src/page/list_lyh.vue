
<template>
  <div class>
    <dm_debug_list>
      <dm_debug_item v-model="scoreList" text="scoreList" />
    </dm_debug_list>

    <score_card_confront v-model="scoreList" :readOnly="false" :isTeam="true" :multiple="true"></score_card_confront>
  </div>
</template>
<script>
import score_card_confront from "@/components/bussiness/score_card_confront";

export default {
  components: { score_card_confront },

  data() {
    return {
       scoreList:[
    {
        "_id": "5d8f675f3eaaa91a1dbea4cf",
        "P1": 67,
        "roundNum": 1,
        "teamId": 19,
        "participantsId": 91,
        "groupNum": 1,
        "tee": 1,
        "scoreList": [
            {
                "holeNum": 1,
                "score": 2
            },
            {
                "holeNum": 2,
                "score": 2
            },
            {
                "holeNum": 3,
                "score": 1
            },
            {
                "holeNum": 4,
                "score": 1
            },
            {
                "holeNum": 5,
                "score": 1
            },
            {
                "holeNum": 6,
                "score": 1
            },
            {
                "holeNum": 7,
                "score": 1
            },
            {
                "holeNum": 8,
                "score": 1
            },
            {
                "holeNum": 9,
                "score": 1
            },
            {
                "holeNum": 10,
                "score": 2
            },
            {
                "holeNum": 11,
                "score": 2
            },
            {
                "holeNum": 12,
                "score": 1
            },
            {
                "holeNum": 13,
                "score": 1
            },
            {
                "holeNum": 14,
                "score": 1
            },
            {
                "holeNum": 15,
                "score": 1
            },
            {
                "holeNum": 16,
                "score": 1
            },
            {
                "holeNum": 17,
                "score": 1
            },
            {
                "holeNum": 18,
                "score": 1
            }
        ],
        "matchScore": 22
    },
    {
        "_id": "5d8f68303eaaa91a1dbea4d7",
        "P1": 69,
        "roundNum": 1,
        "teamId": 19,
        "participantsId": 98,
        "groupNum": 1,
        "tee": 1,
        "scoreList": [
            {
                "holeNum": 1,
                "score": 2
            },
            {
                "holeNum": 2,
                "score": 1
            },
            {
                "holeNum": 3,
                "score": 1
            },
            {
                "holeNum": 4,
                "score": 2
            },
            {
                "holeNum": 5,
                "score": 2
            },
            {
                "holeNum": 6,
                "score": 2
            },
            {
                "holeNum": 7,
                "score": 1
            },
            {
                "holeNum": 8,
                "score": 1
            },
            {
                "holeNum": 9,
                "score": 1
            },
            {
                "holeNum": 10,
                "score": 2
            },
            {
                "holeNum": 11,
                "score": 1
            },
            {
                "holeNum": 12,
                "score": 1
            },
            {
                "holeNum": 13,
                "score": 2
            },
            {
                "holeNum": 14,
                "score": 2
            },
            {
                "holeNum": 15,
                "score": 2
            },
            {
                "holeNum": 16,
                "score": 1
            },
            {
                "holeNum": 17,
                "score": 1
            },
            {
                "holeNum": 18,
                "score": 1
            }
        ],
        "matchScore": 26
    },
    {
        "_id": "5d8f67f03eaaa91a1dbea4d6",
        "P1": 68,
        "roundNum": 1,
        "teamId": 20,
        "participantsId": 93,
        "groupNum": 1,
        "tee": 1,
        "scoreList": [
            {
                "holeNum": 1,
                "score": 2
            },
            {
                "holeNum": 2,
                "score": 1
            },
            {
                "holeNum": 3,
                "score": 2
            },
            {
                "holeNum": 4,
                "score": 2
            },
            {
                "holeNum": 5,
                "score": 2
            },
            {
                "holeNum": 6,
                "score": 1
            },
            {
                "holeNum": 7,
                "score": 4
            },
            {
                "holeNum": 8,
                "score": 2
            },
            {
                "holeNum": 9,
                "score": 2
            },
            {
                "holeNum": 10,
                "score": 2
            },
            {
                "holeNum": 11,
                "score": 1
            },
            {
                "holeNum": 12,
                "score": 2
            },
            {
                "holeNum": 13,
                "score": 2
            },
            {
                "holeNum": 14,
                "score": 2
            },
            {
                "holeNum": 15,
                "score": 1
            },
            {
                "holeNum": 16,
                "score": 2
            },
            {
                "holeNum": 17,
                "score": 2
            },
            {
                "holeNum": 18,
                "score": 2
            }
        ],
        "matchScore": 34
    },
    {
        "_id": "5d8f66f83eaaa91a1dbea4ce",
        "P1": 66,
        "roundNum": 1,
        "teamId": 20,
        "participantsId": 92,
        "groupNum": 1,
        "timeStart": "2019-09-27T16:00:00.000Z",
        "timeEnd": "2019-09-27T17:00:00.000Z",
        "tee": 1,
        "scoreList": [
            {
                "holeNum": 1,
                "score": 1
            },
            {
                "holeNum": 2,
                "score": 2
            },
            {
                "holeNum": 3,
                "score": 1
            },
            {
                "holeNum": 4,
                "score": 1
            },
            {
                "holeNum": 5,
                "score": 2
            },
            {
                "holeNum": 6,
                "score": 1
            },
            {
                "holeNum": 7,
                "score": 1
            },
            {
                "holeNum": 8,
                "score": 2
            },
            {
                "holeNum": 9,
                "score": 1
            },
            {
                "holeNum": 10,
                "score": 1
            },
            {
                "holeNum": 11,
                "score": 2
            },
            {
                "holeNum": 12,
                "score": 1
            },
            {
                "holeNum": 13,
                "score": 1
            },
            {
                "holeNum": 14,
                "score": 2
            },
            {
                "holeNum": 15,
                "score": 1
            },
            {
                "holeNum": 16,
                "score": 1
            },
            {
                "holeNum": 17,
                "score": 2
            },
            {
                "holeNum": 18,
                "score": 1
            }
        ],
        "matchScore": 24
    },
    
],
      scoreList111: [
    {
        "holeNum": 1,
        "score": -2
    },
    {
        "holeNum": 2,
        "score": -1
    },
    {
        "holeNum": 3,
        "score": -2
    },
    {
        "holeNum": 4,
        "score": 0
    },
    {
        "holeNum": 5,
        "score": 0
    },
    {
        "holeNum": 6,
        "score": 0
    },
    {
        "holeNum": 7,
        "score": 0
    },
    {
        "holeNum": 8,
        "score": 0
    },
    {
        "holeNum": 9,
        "score": 0
    },
    {
        "holeNum": 10,
        "score": 0
    },
    {
        "holeNum": 11,
        "score": 0
    },
    {
        "holeNum": 12,
        "score": 0
    },
    {
        "holeNum": 13,
        "score": 0
    },
    {
        "holeNum": 14,
        "score": 0
    },
    {
        "holeNum": 15,
        "score": 0
    },
    {
        "holeNum": 16,
        "score": 0
    },
    {
        "holeNum": 17,
        "score": 0
    },
    {
        "holeNum": 18,
        "score": 0
    }
]
    };
  },

  async created() {},

  methods: {}
};
</script>