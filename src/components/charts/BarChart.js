import {Bar} from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends:Bar,
    data: function () {
        return {
            datacollection: {
                labels:[],
                datasets: [{
                    data:[],
                    barThickness: 90,
                    backgroundColor: ['DarkSalmon','LemonChiffon','PowderBlue','LightSteelBlue','Thistle','Plum'],
                    hoverBackgroundColor: 'Gainsboro'
                }]  
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    text: 'Total Number of each dish',
                    display: true,
                    fontColor:'Grey',
                    fontSize:15
                },
                legend: {
                    display: false
                 },
                 scales: {
                     yAxes: [{
                         ticks: {
                             beginAtZero: true
                         }
                     }]
                 }
            }
        }
    },
    methods: {
        fetchData : function(){
            var names = [];
            var qty = [];
            var combined = {};
            database.collection('orders').get().then((snapshot) =>{
                snapshot.docs.forEach(doc=>{
                    var curr_order = doc.data()
                    for (let k in curr_order) {
                        if (!(k in combined)) {
                            combined[k] = curr_order[k];
                            names.push(k);
                        } else {
                            combined[k] += curr_order[k];
                        }
                    }
                })
                names.sort()  
                for (let i=0; i < names.length; i++) {
                    qty.push(combined[names[i]])
                }
                this.datacollection.labels = names;
                //console.log(combined)
                //console.log(qty)
                this.datacollection.datasets[0].data = qty; 
                this.renderChart(this.datacollection, this.options)
            })
        },        
    },
    created(){
        console.log("created")
        this.fetchData()
    }
}