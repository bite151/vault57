export const useAppStatesStore = defineStore('appStates', () => {
    const startLoading = ref<boolean>(false)
    const isLoaded = ref<boolean>(false)
    const isMobileMenuOpened = ref<boolean>(false)

    function setLoading(value: boolean): void {
        startLoading.value = value
    }

    return {startLoading, isLoaded, isMobileMenuOpened, setLoading}
})
