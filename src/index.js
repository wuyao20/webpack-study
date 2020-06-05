console.log('hello world');


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('service-worker register')
            }).catch(error => {
            console.log('service-worker not register error')
            })
    })
}
