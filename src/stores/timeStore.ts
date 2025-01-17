import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTimeStore = defineStore('time', () => {
    const currentDateTime = ref(new Date())
    const timeSpeed = ref(1) // 1x speed

    const formattedDateTime = computed(() => {
        return currentDateTime.value.toLocaleString('en-GB', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    })

    function updateTime() {
        const msToAdd = 1000 * timeSpeed.value // Convert speed to milliseconds
        currentDateTime.value = new Date(currentDateTime.value.getTime() + msToAdd)
    }

    function setTimeSpeed(speed: number) {
        timeSpeed.value = speed
    }
    // Start timer when store is created
    setInterval(updateTime, 1000)

    return {
        currentDateTime,
        formattedDateTime,
        setTimeSpeed,
        timeSpeed
    }
})