<template>
    <div> 
        Menu: 
        <ul>
            <li id='basket' v-for="item in itemsSelected" v-bind:key="item.name">
                {{item[0] + " x" + item[1]}}
            </li>
        </ul>
        <button v-on:click="findTotal()"> Calculate Total </button>
        <button v-on:click="sendOrder()"> Submit Order </button>
        <p v-show='isClicked'> Subtotal: ${{subtotal}} </p>
        <p v-show='isClicked'> Grand Total: ${{grandtotal}} </p>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: 'Basket',
    data (){
        return {
            isClicked: false,
            subtotal: 0,
            grandtotal: 0,
            multiplier: 1.07,
        }
    },
    props: {
       itemsSelected: Array,
       items: Array
    },
    methods: {
        findTotal: function() {
            this.subtotal = 0;
            this.grandtotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var curr_item = this.itemsSelected[i];
                this.subtotal += curr_item[1]*curr_item[2];
                this.grandtotal = this.subtotal*this.multiplier
            }
            if (!this.isClicked) {
                this.isClicked = true;
            }
        },
        sendOrder: function() {
            var order = {}
            for (let i = 0; i < this.items.length; i++) {
                order[this.items[i].name] = 0;
            }
            for (let i = 0; i < this.itemsSelected.length; i++) {
                var curr_item = this.itemsSelected[i];
                var item_name = curr_item[0];
                var item_qty = curr_item[1];
                order[item_name] = item_qty;
            }
            database.collection('orders').add(order).then(() => location.reload());
        }
    },
    watch: {
        result: function() {
            this.grandtotal = this.subtotal*this.multiplier;
            this.grandtotal.toFixed(2);
            if (!this.isClicked) {
                this.isClicked = true;
            }
        }
    }
}
</script>

<style scoped>
    button {
        font-size: 14px;
        color: white;
        height: 30px;
        background-color:cornflowerblue;
        border-radius: 4px;
        text-align: center;
        margin: 15px;
        width:120px;
        float:left;
    }
</style>