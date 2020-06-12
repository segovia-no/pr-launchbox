Neutralino.init({
    load: function() {
        
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
})

function searchForWads(){

    let response = []

    Neutralino.filesystem.readDirectory('./',
        function (data) {

            let files = data.files

            let regexFileExt = /(?:\.([^.]+))?$/;

            if(files.length > 0){

                for(let i = 0; i < files.length; i++){

                    let fileextension = regexFileExt.exec(files[i].name)[1]

                    if(!fileextension){
                        continue
                    }

                    if(files[i].type = 'file' && fileextension.toLowerCase() == 'wad'){

                        response.push({
                            name: files[i].name.replace(/\.[^/.]+$/, ""),
                            filename: files[i].name
                        })

                    }
                }
            }

        },
        function () {
            response = null
        }
    )

    return response

}

function launchPrBoom(port, parameters){

    parameters = parameters || ''

    Neutralino.os.runCommand(port + ' ' + parameters,

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
        title: 'Pr-lunchbox',
        selectedport: 'prboom-plus.exe',
        compatlevel: 17,
        fastmonsters: false,
        selectedIwad: 'doom2.wad',
        selectedwad: null,
        wads: [],
        selectedskill: "3 - Hurt me plenty",
        skills: [
            "1 -I'm too young to die",
            "2 - Hey, not too rough",
            "3 - Hurt me plenty",
            "4 - Ultra-Violence",
            "5 - Nightmare!"
        ]
    },
    methods: {
        launchPR: function (extraparameters) {

            if(!this.selectedport){
                return
            }

            if(!this.selectedIwad){
                return
            }

            let iwadparameter =  '-iwad ' + this.selectedIwad

            let wadparameter = ''

            if(this.selectedwad){
                wadparameter = '-file ' + this.selectedwad.join(' ')
            }

            let skillparameter = '-skill ' + this.selectedskill.charAt(0)

            let compatlevel = '-complevel ' + this.compatlevel

            let fastmonsters = this.fastmonsters ? '-fast' : ''

            extraparameters = extraparameters || ''

            let parameters = [
                iwadparameter,
                wadparameter,
                skillparameter,
                compatlevel,
                fastmonsters,
                '-warp 1',
                extraparameters
            ]

            console.log(parameters)

            launchPrBoom(this.selectedport, parameters.join(' '))
        }
    },
    mounted: function(){
        this.wads = searchForWads()
    }
})