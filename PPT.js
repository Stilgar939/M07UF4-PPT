const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());

const PORT = 8888;

//Emmagatzemem les partides
var partides = [];

//Emmagatzemem els punts


//Classe partides
function partida(codiP) {
    this.codiP = codiP;
    this.puntsJ1 = 0;
    this.puntsJ2 = 0;
    this.jugadors = 0;
  }

//Creació de la partida
app.post("/iniciarJoc/:CodiPartida", (req, res) => {
    let codiP = {codi:req.params.CodiPartida};
    for(var i = 0; i < partides.length; i++) {
        if (partides[i].codiPartida == codiP) {
            //comprovar si ja n'hi ha dos jugadors en cas afirmatiu no deixar unir-se al nou jugador
            if(partides[i].jugadors < 2){
                partides[i].jugadors++;
            }else{
                res.send("Partida completa");
            }
            break;
        }
    }
    partides.push(new partida(codiP));
    res.send(partides);
});

//Comprovar partides
app.get("/ConsultarPartides",(req,res) => {
    res.send(partides);
});

//Consulta punts

app.get("/ConsultarPunts",(req,res) => {
    res.send("" + puntsJ1 + "," + puntsJ2);
});

//Moviments jugadors
app.put("/moureJugador/:codiPartida/:jugador/:tipusMoviment", (req, res) =>{

    //Emmagatzemar valor moviments
    let movJ1 = "";
    let movJ2 = "";
    
    //var codi = {c:req.params.codiPartida};
    var jugador = {jug:req.params.jugador};
    let j = jugador.toString();
    

    if(j == '1'){
        movJ1 = {mov1:req.params.tipusMoviment};
        console.log(movJ1);
        movJ1 = movJ1.toString();
        //res.send(movJ1);
    }else if(j == '2'){
        movJ2 = {mov2:req.params.tipusMoviment};
        console.log(movJ2);
        movJ2 = movJ2.toString();
        //res.send(movJ2);
    }else{
        console.log("Codi jugador incorrecte");
    }

    console.log(typeof j);

    //if(movJ1 && movJ2){
    if(movJ1 != "" && movJ2 != ""){
        console.log("entra-if");
        if(movJ1 === 'pedra' && movJ2 === 'tisora' || movJ1 === 'tisora' && movJ2 === 'paper' || movJ1 === 'paper' && movJ2 === 'pedra'){
            puntsJ1++;
    
        }else if(movJ1 != movJ2){
            puntsJ2++;
        }
    }

    res.send();

});

//Consultar punts


//Acabar joc
app.delete("/acabarJoc/:codiPartida", (req, res) =>{
    var partidaF = partides.find(a =>a.codiPartida === parseInt(req.params.codiPartida));
    res.send(partidaF);
});

function acabarP(codiP){
    var xhr = new XMLHttpRequest();

    var partidaF = partides.find(a =>a.codiPartida === parseInt(req.params.codiPartida));

    xhr.open("DELETE", "http://localhost:8888//acabarJoc/:" + codiP);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(partidaF);
}

app.listen(PORT, () => {
    console.log(`Servidor execuntant-se en el port ${PORT}.`);
});

/*
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());

const PORT = 8888;

//Emmagatzemem les partides
var partides = [];
var result = [0, 0];

//Creació de la partida
app.post("/iniciarJoc/:CodiPartida", (req, res) => {
    let codiP = {codi:req.params.CodiPartida};
    partides.push(codiP);
    res.send(partides);
});

//Comprovar partides
app.get("/ConsultarPartides/:CodiPartida", (req, res) => {
    res.send(partides);
});

//Moviments jugadors
app.put("/moureJugador/:codiPartida/:jugador/:tipusMoviment", (req, res) =>{
      //Emmagatzemar valor moviments
      let movJ1 = "";
      let movJ2 = "";
      
      //var codi = {c:req.params.codiPartida};
      let jugador = {jug:req.params.jugador};
  
      if(jugador === "jugador1"){
          movJ1 = {mov:req.params.tipusMoviment};
          //res.send(movJ1);
      }else{
          movJ2 = {mov:req.params.tipusMoviment};
          //res.send(movJ2);
      }
      console.log(movJ1);
      console.log(movJ2);

      if(movJ1 != "" && movJ2 != "")
        Logica(movJ1, movJ2);
});

//Acabar joc
app.delete("/acabarJoc/:codiPartida", (req, res) =>{
    var partidaF = partides.find(a =>a.codiPartida === parseInt(req.params.codiPartida));
    res.send(partides);
});


app.listen(PORT, () => {
    console.log(`Servidor execuntant-se en el port ${PORT}.`);
});


function Logica(p1, p2){
    if(p1 == p2){
        console.log("Empat");
    }else if(p1 == "Tissores"){
        if(p2 == "Paper"){
            console.log("j1 guanya");
            result[0]++;
        }else{
            console.log("j2 guanya");
            result[1]++;
        }
    }else if(p1 == "Paper"){
        if(p2 == "Pedra"){
            console.log("j1 guanya");
            result[0]++;
        }else{
            console.log("j2 guanya");
            result[1]++;
        }
    }else if(p1 == "Pedra"){
        if(p2 == "Tissores"){
            console.log("j1 guanya");
            result[0]++;
        }else{
            console.log("j2 guanya");
            result[1]++;
        }
    }
    if(result[0] == 3 || result[1] == 3){
        //acaba partida
    }
}*/