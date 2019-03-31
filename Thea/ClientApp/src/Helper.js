export function clearUrlHash() {
    if (window.performance) {
        if (performance.navigation.type == 1) {
            window.location.hash = "";
        }
    }
}