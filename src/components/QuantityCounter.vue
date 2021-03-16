<template>
    <div id="QuantityCounter">
        <button v-on:click="decrement"> - </button>
        {{ counter }}
        <button v-on:click="increment"> + </button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data (){
        return {
        counter: 0,
        }
    },
    methods: {
        decrement: function() {
            if(this.counter > 0) {
                this.counter -= 1;
            }
            this.$emit('counter', this.item, this.counter)
        },
        increment: function() {
            if(this.counter < 10) {
                this.counter += 1;
            } else {
                alert("You cannot buy more than 10 items.")
            }
            this.$emit('counter', this.item, this.counter)
        }
    },
    props: {
        item: Object
    }
}
</script>

<style scoped>
    button {
        font-size: 20px;
        color: white;
        width: 30px;
        height: 30px;
        background-color:rgb(235, 201, 6);
        border-radius: 4px;
        text-align: center;
        margin: 15px;
        border: none;
    }
</style>
