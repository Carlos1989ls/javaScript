// EJERCICIO 1: Contador
let contador = 0;
        function actualizarContador() {
            document.getElementById("contador").textContent = contador;
        }
        function incrementar() {
            if (contador < 10) {
                contador++;
                actualizarContador();
            } else {
                alert("El contador no puede ser mayor que 10");
            }
        }
        function disminuir() {
            if (contador > 0) {
                contador--;
                actualizarContador();
            } else {
                alert("El contador no puede ser negativo");
            }
        }
        function resetear() {
            contador = 0;
            actualizarContador();
        }

// EJERCICIO 2: Juego de Dados

 const imagenesDados = {
            1: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Dice-1-b.svg",
            2: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dice-2-b.svg",
            3: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Dice-3-b.svg",
            4: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Dice-4-b.svg",
            5: "https://upload.wikimedia.org/wikipedia/commons/0/08/Dice-5-b.svg",
            6: "https://upload.wikimedia.org/wikipedia/commons/2/26/Dice-6-b.svg"
        };
        
        function tirarDados() {
            let dado1 = Math.floor(Math.random() * 6) + 1;
            let dado2 = Math.floor(Math.random() * 6) + 1;
            document.getElementById("dado1").src = imagenesDados[dado1];
            document.getElementById("dado2").src = imagenesDados[dado2];
            document.getElementById("resultado").textContent = `Suma: ${dado1 + dado2}`;
        }

// EJERCICIO 3: SIMULADOR

  document.getElementById("liftoffButton").addEventListener("click", function() {
            document.getElementById("statusReport").textContent = "Houston, we have liftoff!";
        });

        document.getElementById("abortMission").addEventListener("mouseover", function() {
            this.style.backgroundColor = "red";
        });

        document.getElementById("abortMission").addEventListener("mouseout", function() {
            this.style.backgroundColor = "";
        });

        document.getElementById("abortMission").addEventListener("click", function() {
            let confirmAbort = confirm("Are you sure you want to abort the mission?");
            if (confirmAbort) {
                document.getElementById("statusReport").textContent = "Mission aborted! Space shuttle returning home.";
            }
        });

// EJERCICIO 4: AHORCADO

        let palabraSecreta = "";
        let palabraAdivinada = [];
        let intentos = 10;

        async function obtenerPalabra() {
            try {
                let response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
                let data = await response.json();
                palabraSecreta = data[0].toUpperCase();
                palabraAdivinada = Array(palabraSecreta.length).fill("_");
                document.getElementById("palabra").textContent = palabraAdivinada.join(" ");
            } catch (error) {
                alert("Error obteniendo la palabra");
            }
        }

        function comprobarLetra() {
            let letra = document.getElementById("letra").value.toUpperCase();
            document.getElementById("letra").value = "";

            if (letra && palabraSecreta.includes(letra)) {
                for (let i = 0; i < palabraSecreta.length; i++) {
                    if (palabraSecreta[i] === letra) {
                        palabraAdivinada[i] = letra;
                    }
                }
            } else {
                intentos--;
            }
            document.getElementById("palabra").textContent = palabraAdivinada.join(" ");
            document.getElementById("intentos").textContent = `Intentos restantes: ${intentos}`;

            if (!palabraAdivinada.includes("_")) {
                alert("¡Felicidades! Has adivinado la palabra: " + palabraSecreta);
                obtenerPalabra();
            } else if (intentos === 0) {
                alert("Game over! La palabra era: " + palabraSecreta);
                obtenerPalabra();
            }
        }

        obtenerPalabra();

// EJERCICIO 5: CRUD API

        const API_URL = "https://crudcrud.com/api/87b5f66d7d8545048a88d418f133f5b6/elementos";
        
        async function obtenerElementos() {
            let response = await fetch(API_URL);
            let data = await response.json();
            let lista = document.getElementById("lista");
            lista.innerHTML = "";
            data.forEach(item => {
                let li = document.createElement("li");
                li.textContent = item.nombre;
                let btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.onclick = () => eliminarElemento(item._id);
                li.appendChild(btnEliminar);
                lista.appendChild(li);
            });
        }
        
        async function crearElemento() {
            let nombre = document.getElementById("nombre").value;
            if (!nombre) return;
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre })
            });
            document.getElementById("nombre").value = "";
            obtenerElementos();
        }
        
        async function eliminarElemento(id) {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            obtenerElementos();
        }
        
        obtenerElementos();

//EJERCICIO 6: CARRITO          

   function actualizarTotal() {
            let total = 0;
            document.querySelectorAll("tbody tr").forEach(row => {
                let precio = parseFloat(row.querySelector(".precio").textContent);
                let cantidad = parseInt(row.querySelector(".cantidad").value);
                let subtotal = precio * cantidad;
                row.querySelector(".subtotal").textContent = subtotal;
                total += subtotal;
            });
            document.getElementById("total").textContent = total;
        }

        document.querySelectorAll(".cantidad").forEach(input => {
            input.addEventListener("input", actualizarTotal);
        });
        
//EJERCICIO INDEX 

   document.getElementById("githubLink").href = "https://github.com/Carlos1989ls/javaScript";   