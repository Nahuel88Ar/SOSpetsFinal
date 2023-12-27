const { createApp } = Vue
    createApp({
        data() {
            return {
                refugios:[],
                //url:'http://localhost:5000/productos',
                // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
                //url:'http://localhost:5000/refugios', // si ya lo subieron a pythonanywhere
                url:'https://nahuelramos.pythonanywhere.com/refugios', // si ya lo subieron a pythonanywhere
                error:false,
                cargando:true,
                /*atributos para el guardar los valores del formulario */
                id:0,
                nombre:"",
                domicilio:"",
                ciudad:"",
                provincia:"",
            }
            },
            methods: {
                fetchData(url) {
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            this.refugios = data;
                            this.cargando=false
                        })
                        .catch(err => {
                            console.error(err);
                            this.error=true
                        })
                },
                eliminar(refugio) {
                    const url = this.url+'/' + refugio;
                    var options = {
                        method: 'DELETE',
                    }
                    fetch(url, options)
                        .then(res => res.text()) // or res.json()
                        .then(res => {
                            location.reload();
                        })
                },
                grabar(){
                    let refugio = {
                        nombre:this.nombre,
                        domicilio: this.domicilio,
                        ciudad: this.ciudad,
                        provincia:this.provincia
                    }
                    var options = {
                        body:JSON.stringify(refugio),
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        redirect: 'follow'
                    }
                    fetch(this.url, options)
                        .then(function () {
                            alert("Registro grabado")
                            window.location.href = "./refugios.html";
                        })
                        .catch(err => {
                            console.error(err);
                            alert("Error al Grabarr")
                        })
                }
            },
            created() {
                this.fetchData(this.url)
            },
        }).mount('#app')