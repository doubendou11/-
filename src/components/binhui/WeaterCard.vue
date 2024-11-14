<template>
    <v-card-subtitle>
        <v-icon  color="error" icon="mdi-map-marker" size="16"></v-icon>
        {{ location }}
    </v-card-subtitle>
    <v-card-text>
        <div v-if="weather">
            <v-row align="center" justify="space-around">
                <v-col cols="5" class="pt-0">
                    <img :src="`/src/assets/icons/weater/${weather.icon}-fill.svg`" style="width: 80%; height: 100%"
                        v-if="weather" />
                </v-col>
                <v-col class="text-h4" cols="6">
                    {{ weather.temp }}°C
                </v-col>
                <v-row justify="space-between">
                        <v-list-item prepend-icon="mdi-cloud">
                            {{ weather.text }}
                        </v-list-item>
                        <v-list-item prepend-icon="mdi-water">
                            {{ weather.humidity }}%
                        </v-list-item>
                </v-row>
            </v-row>
        </div>
        <v-progress-circular v-else color="primary"></v-progress-circular>
    </v-card-text>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
//天气信息
const weather = ref(null);
const location = 'Gulou';

const fetchWeather = async () => {
    try {
        const response = await axios.get(
            'https://devapi.qweather.com/v7/weather/now?location=101230106&key=9b993cbfd80b464fa9d645202cebc62e'
        );
        const weatherData = response.data.now;
        weather.value = {
            temp: weatherData.temp,
            text: weatherData.text,
            humidity: weatherData.humidity,
            icon: weatherData.icon,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

onMounted(fetchWeather);
</script>

<style scoped></style>