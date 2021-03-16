<template>
    <div> 
         <ul>
            <li v-for="(qty,name,index) in datapacket" v-bind:key="index">
                <p> {{name}} : {{qty}} </p>
                <input v-bind:id=index placeholder=0 type="number" min=0 max=10>
            </li>
        </ul>
        <button v-on:click = "updateOrder"> Update Order </button>
    </div>
</template>

<script>
import database from "./firebase.js"
export default {
    name: 'modify',
    props: {
        id: {
            type: String
        }
    },
    data () {
        return {
            datapacket: {},
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.id).get().then((snapshot)=>{
                this.datapacket = snapshot.data();   
            })    
        },
        updateOrder: function() {
            var newOrder = {}
            for (var order in this.datapacket) {
                newOrder[order] = order.value
            }
            var i = 0;
            for (var item in newOrder) {
                var newQty = document.getElementById(i).value;
                if (newQty == '') {
                    newOrder[item] = 0;
                } else {
                    newOrder[item] = Number(newQty);
                }
                i++;
            }
            database.collection('orders').doc(this.id).update(newOrder).then(() => this.$router.push('Orders'))
        }
    },
    created(){
        this.fetchItems()   
    } 
}


</script>

<style scoped>
    button {
        font-size: 14px;
        color: white;
        width: 80px;
        height: 40px;
        background-color:rgb(235, 201, 6);
        border-radius: 4px;
        text-align: center;
        margin: 15px;
        border: none;
    }
</style>