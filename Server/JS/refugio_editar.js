console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
    createApp({
        data() {
            return {
                id:0,
                nombre:"",
                domicilio:"",
                ciudad:"",
                provincia:"",
                url:'https://nahuelramos.pythonanywhere.com/refugios/'+id,
                }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombre = data.nombre;
                    this.domicilio=data.domicilio
                    this.ciudad=data.ciudad
                    this.provincia=data.provincia
                })
                .catch(err => {
                    console.error(err);
                    this.error=true
                })
            },
            modificar() {
                let refugio = {
                    nombre:this.nombre,
                    domicilio: this.domicilio,
                    ciudad: this.ciudad,
                    provincia:this.provincia
                }
                var options = {
                    body: JSON.stringify(refugio),
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url, options)
                    .then(function () {
                        alert("Registro modificado")
                        //window.location.href = "./lista_refugios.html";
                        window.location.href = "./lista_refugios.html";
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Modificar")
                    })
                }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')
