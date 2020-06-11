Neutralino.init({
    load: function() {
        
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
})

function launchPrBoom(parameters){

    parameters = parameters || ''

    Neutralino.os.runCommand('prboom-plus.exe ' + parameters,

        function (data) {
            console.log(data)
        },
        function () {
            console.error('error')
        }
    )

}

let app = new Vue({
    el: '#app',
    data: {
        title: 'Pr-lunch',
        selectedwad: null,
        wads: [
            {
                name: 'Doom',
                filename: 'doom.wad'
            },
            {
                name: 'Doom2',
                filename: 'doom2.wad'
            },
            {
                name: 'Plutonia',
                filename: 'plutonia.wad'
            },
        ]
    },
    methods: {
        launchPR: function (parameters) {
            launchPrBoom()
        }
    }
})