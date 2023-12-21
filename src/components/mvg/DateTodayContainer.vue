<script setup>
import { store } from '../../store/index.js';
import { prevDay, nextDay, isToday, gotoToday } from '../../helpers/functions';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

</script>

<template>
    <div class='date_today_container'>
        <div class='date_container'>
          <div class='previous arrows' @click="() => prevDay()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
              <g fill="currentColor">
                <path d="M10.5,0A10.5,10.5,0,1,1,0,10.5,10.5,10.5,0,0,1,10.5,0Zm0,1A9.5,9.5,0,1,0,20,10.5,9.5,9.5,0,0,0,10.5,1Z"/>
                <polygon points="8.58 10.8 12 14.19 11.19 15 6.96 10.8 11.19 6.6 12 7.41 8.58 10.8"/>
              </g>
            </svg>
          </div>
          <div class='date_title'> {{months[store.date.getMonth()]}} {{store.date.getDate()}}, {{store.date.getFullYear()}} </div>
          <div class='next arrows' @click="() => nextDay()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
              <g fill="currentColor">
                <path d="M10.5,0A10.5,10.5,0,1,1,0,10.5,10.5,10.5,0,0,1,10.5,0Zm0,1A9.5,9.5,0,1,0,20,10.5,9.5,9.5,0,0,0,10.5,1Z"/>
                <polygon points="12.42 10.2 9 6.81 9.81 6 14.04 10.2 9.81 14.4 9 13.59 12.42 10.2"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="today_container">
          <span :class="`button today ${(isToday()) ? 'selected' : ''}`" @click="() => {gotoToday()}">Today</span>
        </div>
      </div>
</template>