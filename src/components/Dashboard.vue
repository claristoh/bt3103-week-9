<template>
    <div id="dashboard">
        <ul>
            <li> <router-link to="/" exact> Home </router-link> </li>
            <li> <router-link to="/orders" exact> Orders </router-link> </li>
            <li> <router-link to="/dashboard" exact> Dashboard </router-link> </li>
        </ul> 
        <div id = "bar">
            <BarChart></BarChart>
        </div>
        <div id="chart" style="height:600px">
            <LineChart></LineChart>
        </div>
    </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import LineChart from './charts/LineChart.vue'
export default {
    components: {
        BarChart,
        LineChart
    }
};
</script>

<style scoped>

</style>