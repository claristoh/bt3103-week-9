<template>
    <div>
        <ul>
            <li> <router-link to="/" exact> Home </router-link> </li>
            <li> <router-link to="/orders" exact> Orders </router-link> </li>
            <li> <router-link to="/dashboard" exact> Dashboard </router-link> </li>
        </ul>   
        <ul id="itemsList">
            <li id='items' v-for="item in items" v-bind:key="item.name">
                <p id='itemName'> {{item.name}} </p>
                <img v-bind:src="item.imageURL">
                <p id='price'> {{"$" + item.price}} </p>
                <QuantityCounter v-bind:item = "item" v-on:counter="onCounter"> </QuantityCounter>
            </li>
        </ul>
        <Basket v-bind:itemsSelected = "itemsSelected" v-bind:items = "items" id='shoppingBasket'> </Basket>
    </div>
</template>

<script>
    import QuantityCounter from "./QuantityCounter.vue"
    import Basket from "./Basket.vue"
    import database from "../firebase.js"

    export default {
        name: 'PageContent',
        components: {
            QuantityCounter,
            Basket,
        },
        data () {
            return {
                itemsSelected: [],
                items: [],
            } 
        },
        methods: {
            onCounter: function(item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {

                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const item_name = curr_item[0];
                var contains = false;

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.name && count > 0) {
                        this.itemsSelected.splice(i, 1, [curr_item[0], count, curr_item[2]])
                        contains = true
                        break;
                    }
                    // Next, item_name is the same as item.name and the count is 0
                    if (item_name == item.name && count === 0) {
                        this.itemsSelected.splice(i, 1);
                        contains = true;
                        break;
                    }
                }
                // otherwise, if the item is not in itemSelected,
                if (!contains) {
                    this.itemsSelected.push([item.name, count, item.price])
                }
            }
            },
            fetchItems:function(){
                database.collection('menu').get().then((snapshot)=>{
                    snapshot.docs.forEach(doc=>{
                        this.items.push(doc.data()) 
                    })      
                })    
            }
        },
        created(){
            this.fetchItems()   
        } 
    }
</script>

<style scoped>
    #itemsList {
        width: 100%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    ul {
        line-height: 35px;
        font-size: 20px;
        width: 70%;
        float:left

    }
    /*
    #items {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    } */
    img {
        width: 135px;
        height: 135px;
    }
    #price {
        font-size: 30px;
    }
    #itemName {
        font-size: 30px;
    }
    #shoppingBasket {
        position: absolute;
        top: 23%;
        left: 78%;
    }
</style>
