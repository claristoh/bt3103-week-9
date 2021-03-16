import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [
                    { 
                        data: [],
                        label: 'West',
                        borderColor: 'Firebrick',
                        fill: false
                    },
                    {
                        data: [],
                        label: 'National',
                        borderColor: 'CornflowerBlue',
                        fill: false
                    },
                    {
                        data: [],
                        label: 'East',
                        borderColor: 'SlateBlue',
                        fill: false
                    },
                    {
                        data: [],
                        label: 'Central',
                        borderColor: 'DeepSkyBlue',
                        fill: false
                    },
                    {
                        data: [],
                        label: 'South',
                        borderColor: 'RosyBrown',
                        fill: false
                    },
                    {
                        data: [],
                        label: 'North',
                        borderColor: 'SeaGreen',
                        fill: false
                    },
                    ]
            },
            options: {
                maintainAspectRatio: false,
            }
        }
    },
    methods: {
        fetchData: function(){
            axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23').then(response=>{
                var dict = response.data.items
                var time_lst = []
                var west = []
                var national = []
                var east = []
                var central = []
                var south = []
                var north = []
                for (let k in dict) {
                    var data = dict[k]
                    var time = data['timestamp']
                    var psi = data.readings['psi_twenty_four_hourly']
                    for (let key in psi) {
                        if (key == 'west') {
                            west.push(psi[key])
                        } else if (key == 'national') {
                            national.push(psi[key])
                        } else if (key == 'east') {
                            east.push(psi[key])
                        } else if (key == 'central') {
                            central.push(psi[key])
                        } else if (key == 'south') {
                            south.push(psi[key])
                        } else {
                            north.push(psi[key])
                        }
                    }
                    time_lst.push(time)
                }
                this.datacollection.labels = time_lst;
                this.datacollection.datasets[0].data = west;
                this.datacollection.datasets[1].data = national;
                this.datacollection.datasets[2].data = east;
                this.datacollection.datasets[3].data = central;
                this.datacollection.datasets[4].data = south;
                this.datacollection.datasets[5].data = north;
                this.renderChart(this.datacollection, this.options);
            })
        },
    },
    created () {
        this.fetchData()
    }
}   