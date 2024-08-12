<template>
    <div>
        {{ value }}
    </div>
    <div>
        {{ doubleValue }}
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect }  from 'vue'
const props = defineProps({
    value: {
        type: Number,
        required: true
    }
})
// 1
// const doubleValue = ref(props.value * 2)

// 2
// const doubleValue = computed(() => props.value * 2

// 3
// const doubleValue = ref(0)
// watchEffect(() => {
//     doubleValue.value = props.value * 2
// })

// 4
// const useDouble = (count: number) => {
//     const doubleCount = ref(count * 2)
//     watchEffect(() => {
//         doubleCount.value = count * 2
//     })
//     return doubleCount
// }
// const doubleValue = useDouble(props.value)

// 4-1
// const useDouble = (props: any) => {
//     const doubleCount = ref(props.value * 2)
//     watchEffect(() => {
//         doubleCount.value = props.value * 2
//     })
//     return doubleCount
// }
// const doubleValue = useDouble(props)

// 5
// const useDouble = (value: number) => {
//     const doubleCount = computed(() => value * 2)
//     return doubleCount
// }
// const doubleValue = useDouble(props.value)

//5 -1

const useDouble = (prop: any) => {
    const doubleCount = computed(() => prop.value * 2)
    return doubleCount
}
const doubleValue = useDouble(props)
</script>

<style lang="scss" scoped>

</style>