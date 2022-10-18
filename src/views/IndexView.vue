<!--
<script setup>
import { ref } from 'vue'

const time_remaining = ref('00:10')
const tim_1 = ref('BALI')
const score_1 = ref('00')
const tim_2 = ref('TANGERANG')
const score_2 = ref('00')
</script>
-->
<template>
  <body id="root">
    <div id="root">
        <div class="View">
            <h2 class="Banner">TIME REMAIN {{time_remaining}}</h2>
            <div class="Message">
                <div class="TitleLeft">
                    <h3>{{ tim_1 }}</h3>
                    <h1>{{ score_1}}</h1>
                </div>
                <div class="TitleRight">
                    <h3>{{ tim_2 }}</h3>
                    <h1>{{ score_2}}</h1>
                </div>
            </div>
        </div>
    </div>
</body>
</template>

<script>
import axios from "axios";
//import timData from "./tim.json";

export default {
    /*
    data: () => ({
        time_remaining: 60,
        tim_1: 'BALI',
        score_1: '00',
        tim_2: 'TANGERANG',
        score_2: '01'
    }),
    */
    data() {
        return {
            time_remaining: 60,
            tim_1: 'BALI',
            score_1: null,
            tim_2: 'TANGERANG',
            score_2: '00' 
        }
    },

    methods: {
        callApiScoreBali: function() {
            axios
            .get('http://localhost:3000/items')
            //.get('http://localhost:3000/score/bali')
            .then(response => (this.score_1 = response.data[0].score ))
            .catch(error => console.log(error))
        },
        callApiScoreTangerang: function() {
            axios
            .get('http://localhost:3000/items')
            //.get('http://localhost:3000/score/bali')
            .then(response => (this.score_2 = response.data[1].score ))
            .catch(error => console.log(error))
        },
        intervalFetchData: function() {
            setInterval(() => {
                this.callApiScoreBali();
                this.callApiScoreTangerang();
                //this.callApiScoreTangerang();
            }, 1000);
        },
        playWhistle(){
            var audio = new Audio(require('../assets/start.mp3'));
            audio.play();
        }
    },
/*
    async created() {
        try {
            const res = await axios.get(`http://localhost:3000/items`);
            const data = await res.json();
            this.score_1 = data.items.score;
        } catch (error) {
            console.log(error);
        }
    },
*/

    mounted() {
        this.callApiScoreBali();
        this.callApiScoreTangerang();
        this.intervalFetchData();
    //    axios
    //    .get('http://localhost:3000/items')
        //.get('https://api.npms.io/v2/search?q=vue')
    //    .then(response => (this.score_1 = response.data[0].score ))
    //    .catch(error => console.log(error))
        //this.score_1 = timData.tim;
    },

    watch: {
        score_1: {
            fetchTasks() {
                axios
                .get('http://localhost:3000/items')
                .then(response => (this.score_1 = response.data[0].score ))
            },
            immediate: true
        }
    }
/*
    methods: {
        async getData() {
            const res = await fetch("http://localhost:3000/score/bali");
            const finalRes = await res.json();
            this.tim_1 = finalRes;
        }
    }
    */
}
</script>

<style>
    @import url("https://fonts.googleapis.com/css?family=Raleway:800|Merriweather+Sans|Share+Tech+Mono");

    :root {
    --ui-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 4px 5px 0 rgba(0, 0, 0, 0.06), 0 1px 10px 0 rgba(0, 0, 0, 0.08);
    fill: rgba(0, 0, 0, 0.54);
    --ui-shadow-border: 1px solid rgba(0, 0, 0, 0.14);
    }

    * {
    box-sizing: border-box;
    }

    html,
    body,
    #root {
    height: 100%;
    width: 100%;
    }

    body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    }

    h1,
    h2,
    h3 {
    font-family: "Roboto", "Raleway", sans-serif;
    text-transform: uppercase;

    padding: 0;
    margin: 0;

    color: #2a3747;
    }

    h1 {
    font-size: 200px;
    font-family: "Scoreboard", "Merriweather Sans", sans-serif;
    text-align: center;
    }

    h2 {
    font-size: 100px;
    font-family: "Scoreboard", "Merriweather Sans", sans-serif;
    text-align: center;
    }

    h3 {
    font-size: 40px;
    text-align: center;
    }

    a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    }

    #root {
    display: flex;
    flex-direction: column;
    }

    .View {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    height: 100%;
    width: 100%;

    padding: 20px;

    background-size: cover;

    font-family: "Roboto", "Merriweather Sans", sans-serif;
    }

    .Banner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    border-radius: 5px;

    overflow: hidden;
    background: white;
    padding: 15px;

    font-family: "Share Tech Mono", monospace;

    border-bottom: var(--ui-shadow-border);
    box-shadow: var(--ui-shadow);
    }

    .Message {
    background: white;
    padding: 30px;
    border-bottom: var(--ui-shadow-border);
    box-shadow: var(--ui-shadow);
    width: 100%;
    height: 70%;
    }

    .Message > .TitleLeft {
     align-items: center;
    float: left;
    }

    .Message > .TitleRight {
    align-items: center;
    float: right;
    }

    .Message > .Details {
    display: flex;
    flex-direction: column;
    line-height: 1.5em;
    }

    .NavButtons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    }

    .NavButton {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 55px;
    width: 150px;

    background: #fa4141;

    border-radius: 30px;

    font-size: 16px;
    font-weight: bold;
    color: white;

    text-transform: capitalize;

    border-bottom: var(--ui-shadow-border);
    box-shadow: var(--ui-shadow);
    }
</style>