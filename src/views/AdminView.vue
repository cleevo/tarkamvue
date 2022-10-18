<template>
  <body id="root">
    <div id="root">
        <div class="View">
            <h2 class="Banner">TIME REMAINING : {{time_remaining}}</h2>
            <div class="Message">
                <div class="TitleLeft">
                    <h3>{{ tim_1 }}</h3>
                    <h3>{{ tim_11 }}</h3>
                    <h1>{{ score_1 }}</h1>
                </div>
                <div class="TitleRight">
                    <h3>{{ tim_2 }}</h3>
                    <h3>{{ tim_21 }}</h3>
                    <h1>{{ score_2}}</h1>
                </div>
            </div>
            <h2 class="Banner"><button @click="start">START</button></h2>
            <h2 class="Banner"><button @click="stop">STOP</button></h2>
            <h2 class="Banner"><button @click="playGoal">GOAL</button></h2>
            <!-- <h2 class="Banner">{{score_2}}</h2> -->
        </div>
    </div>
</body>
</template>

<script>
import axios from "axios";
// import mqtt from 'mqtt/dist/mqtt';

export default {

    data() {
        return {
            time_remaining: 60,
            tim_1: 'JIMBARAN',
            tim_11: 'BADUNG',
            score_1: null,
            tim_2: 'SAWAH BARU',
            tim_21: 'TANGSEL',
            score_2: null,
            /*
            connection: {
                host: 'broker.emqx.io',
                port: 8083,
                endpoint: '/mqtt',
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 4000,
                clientId: 'mqttjs_3be2c321',
                username: 'emqx_test',
                password: 'emqx_test',
            },
            subscription: {
                topic: 'fablab/tarkam',
                qos: 0,
            },
            publish: {
                topic: 'fablab/tarkam',
                qos: 0,
                payload: '{ "tim":"tangsel","score":"0"}',
            },
            receiveNews: '',
            qosList: [
                { label: 0, value: 0 },
                { label: 1, value: 1 },
                { label: 2, value: 2 },
            ],
            client: {
                connected: false,
            },
            subscribeSuccess: false,  
            */          
        }
    },

    mounted() {
        this.callApiScoreBali();
        this.callApiScoreTangerang();
        this.intervalFetchData();
        //this.createConnection();
        //this.doSubscribe();
        //this.doPublish();
    },
    /*
    created: function(){
        var self = this;
        setInterval(function(){
            self.time_remaining--;
            if(self.time_remaining == 0){
                self.time_remaining = 60;
            }
        },1000)
    },
    */
    methods: {
        start() {
            this.playWhistle();
            this.playCheeringAlong();
            var self = this;
            this.intervalId = setInterval(function(){
                self.time_remaining--;
                if(self.time_remaining == 0){
                    //audio.pause();
                }
            },1000);
        },
        stop() {
            clearInterval(this.intervalId);
            //if(!this.audio.paused) { this.audio.pause(); }
        },
        callApiScoreBali() {
            axios
            //.get('http://localhost:3000/items')
            //.then(response => (this.score_1 = response.data[1].score ))
            //.get('http://localhost:3000/score/bali')
            .get('https://tarkam.herokuapp.com/score/bali')
            .then(response => this.score_1 = response.data[0].score)
            //.then(response => (this.score_1 = JSON.parse(response.data) ))
            .catch(error => console.log(error))
        },
        callApiScoreTangerang() {
            axios
            //.get('http://localhost:3000/items')
            //.then(response => (this.score_2 = response.data[1].score ))
            //.get('http://localhost:3000/score/tangerang')
            .get('https://tarkam.herokuapp.com/score/tangerang')
            .then(response => this.score_2 = response.data[0].score)
            //.then(response => (this.myObj = JSON.parse(response.data)), this.score_2 = this.myObj)
            .catch(error => console.log(error))
        },
        intervalFetchData() {
            setInterval(() => {
                this.callApiScoreBali();
                this.callApiScoreTangerang();
                //this.callApiScoreTangerang();
            }, 1000);
        },
        playCheeringAlong() {
            var audio = new Audio(require('../assets/cheering-along.mp3'));
            audio.play();
        },
        stopCheeringAlong() {
            var audio = this.playCheeringAlong();
            audio.paused();
        },
        playWhistle() {
            var audio = new Audio(require('../assets/start.mp3'));
            audio.play();
        },
        playGoal() {
            var audio = new Audio(require('../assets/GoalsHorn.mp3'));
            audio.play();
        },
        /* method berikut merupakan method untuk menggunakan mqtt */
        /*
        createConnection() {
            const { host, port, endpoint, ...options } = this.connection
            const connectUrl = `ws://${host}:${port}${endpoint}`
            
            try {
                this.client = mqtt.connect(connectUrl, options)
            } catch (error) {
                console.log('mqtt.connect error', error)
            }
            this.client.on('connect', () => {
                console.log('Connection succeeded!')
            })
            this.client.on('error', error => {
                console.log('Connection failed', error)
            })
            this.client.on('message', (topic, message) => {
                this.receiveNews = this.receiveNews.concat(message)
                this.receiveNews = JSON.parse(this.receiveNews)
                this.receiveNews = this.receiveNews.score
                console.log(`Receive message ${message} from topic ${topic}`)
            })
        },
        doSubscribe() {
            const { topic, qos } = this.subscription
            this.client.subscribe(topic, qos, (error, res) => {
                if (error) {
                    console.log('Subscribe to topics error', error)
                    return
                }
                this.subscribeSuccess = true
                console.log('Subscribe to topics res', res)
            })
        },
        doUnSubscribe() {
            const { topic } = this.subscription
            this.client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error)
                }
            })
        },
        doPublish() {
            const { topic, qos, payload } = this.publish
            this.client.publish(topic, payload, qos, error => {
                if (error) {
                    console.log('Publish error', error)
                }
            })
        },
        destroyConnection() {
            if(this.client.connected) {
                try {
                    this.client.end()
                    this.client = {
                        connected: false,
                    }
                    console.log('Successfully disconnected!')
                } catch (error) {
                    console.log('Disconnected failed', error.toString())
                }
            }
        }
        */
    },

    watch: {
        time_remaining: function(){
            if(this.time_remaining < 0){ 
                this.stop();
                this.time_remaining = 60; 
            }
        },
        score_1: function(newValue, oldValue) {
            if(newValue > oldValue) {
                this.playGoal();
            }
        }
    }
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
    font-family: "Scoreboard", "Merriweather Sans", "Roboto", "Raleway", sans-serif;
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
    text-align: right;
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