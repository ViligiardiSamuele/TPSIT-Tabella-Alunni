//Sono presenti funzioni commentate che ho scritto prima della pubblicazione del progetto modificato
const alunno = document.querySelector("#alunno")
const classe = document.querySelector("#classe")
const tbody = document.querySelector("#tbody")
const divButtons = document.querySelector("#divButtons")
let lastRow = 1

/*function onLoad(){
    //lettura valore da localstorage
    if (localStorage.getItem("allievi") != null){
        allievi = JSON.parse(localStorage.getItem("allievi"))
        console.info("\"allievi\" presente in localStorage")

    }
    else console.info("\"allievi\" non presente in localStorage")
}*/

carica()
function carica() {
    let alunni = []
    let stringa = localStorage.getItem("alunni")
    if ( stringa ) {
        alunni = JSON.parse(stringa)
    }
    alunni.forEach( function(alunno) {
        creaRiga( {
            nominativo:alunno.nominativo, 
            classe: alunno.classe
        })
    })
}

function clearInput() {
    alunno.value = ""
    classe.value = ""
}

function creaAttributo(name, value) {
    let attr = document.createAttribute(name)
    attr.value = value
    return attr
}

function creaColonnaDato(val) {
    let td = document.createElement('td')
    td.setAttributeNode(creaAttributo("scope", "col"))
    let nodoTesto = document.createTextNode(val)
    td.appendChild(nodoTesto)
    return td
}

function creaBottone( title, id, funzione, tipo) {
    let btn = document.createElement('button')
    let nodoTesto = document.createTextNode(title)
    btn.appendChild(nodoTesto)
    btn.setAttributeNode( creaAttributo("type","button") )
    btn.setAttributeNode( creaAttributo( "onclick",  funzione) )
    btn.classList.add("btn")
    if ( tipo == 1 )
        btn.classList.add("btn-outline-danger")
    if ( tipo == 2)
        btn.classList.add("btn-outline-primary")
    return btn
}

function creaRiga(obj) {
    let riga = document.createElement('tr')
    riga.setAttributeNode( creaAttributo("id","riga"+lastRow) )
    riga.appendChild( creaColonnaDato( obj.nominativo ) )
    riga.appendChild( creaColonnaDato( obj.classe ) )
    let td = creaColonnaDato( "" )
    td.appendChild( creaBottone("Elimina", lastRow, "elimina(" + lastRow + ")", 1 ) )
    td.appendChild( creaBottone("Modifica", lastRow, "modifica(" + lastRow + ")", 1 ) )
    riga.appendChild(td)    
    tbody.appendChild( riga )
    lastRow += 1
}

function aggiungi() {
    if ( alunno.value.trim().length < 4 ) return false
    if ( classe.value == 0 ) return false
    let obj = {
        nominativo: alunno.value,
        classe: classe.value
    }
    creaRiga(obj)
    clearInput()
}

function elimina(riga) {
    let row = document.querySelector('#riga' + riga)
    tbody.removeChild(row)
    salvaElenco()
}

function modifica(riga) { // MODIFICATO
    divButtons.children[0].style.display = "none"
    let row = document.querySelector('#riga'+riga)
    alunno.value = row.children[0].innerHTML
    classe.value = row.children[1].innerHTML
    divButtons.appendChild( creaBottone("Registra Modifica", riga, "registraModifica(" + riga + ")", 2 ) )
    divButtons.appendChild( creaBottone("Annulla Modifica", riga, "annullaModifica(" + riga + ")" ,2) )
    nascondiBottoniTabella()
}

function ripristina(riga) { // MODIFICATO
    divButtons.children[1].remove()
    divButtons.children[1].remove()
    divButtons.children[0].style.display = "inline"
    let row = document.querySelector('#riga'+riga)
    mostraBottoniTabella()
}

function annullaModifica(riga) {
    clearInput()
    ripristina(riga)
}

function registraModifica(riga) { // MODIFICATO
    let row = document.querySelector('#riga'+riga)
    row.children[0].innerHTML = alunno.value
    row.children[1].innerHTML = classe.value
    ripristina(riga)
    clearInput()
}

/*function nascondiBottoni(){
    for(let i = 0; i < tbody.childNodes.length; i++)
        for(let j = 1; j < tbody.childNodes[i].childNodes[2].childNodes.length; j++)
            tbody.childNodes[i].childNodes[2].childNodes[j].classList.add('d-none')
}*/

function nascondiBottoniTabella() {
    let tableButtons = document.querySelectorAll(".btn-outline-danger")
    tableButtons.forEach( function(button) {
        button.style.display = "none"
    })
}

/*function mostraBottoniTabella(){
    for(let i = 0; i < tbody.childNodes.length; i++)
        for(let j = 1; j < tbody.childNodes[i].childNodes[2].childNodes.length; j++)
            tbody.childNodes[i].childNodes[2].childNodes[j].classList.remove('d-none')
}*/

function mostraBottoniTabella() {
    let tableButtons = document.querySelectorAll(".btn-outline-danger")
    tableButtons.forEach( function(button) {
        button.style.display = "inline"
    })
}

/*function salvaElenco() {
    allievi = []
    for(let i = 0; i < tbody.childNodes.length; i++)
        allievi.push({
            nominativo:tbody.childNodes[i].childNodes[0].textContent,
            classe:tbody.childNodes[i].childNodes[1].textContent
        })
    console.log(allievi.length)
    localStorage.setItem("allievi",JSON.stringify(allievi))
    console.log("Allievi salvati in localStorage")
}*/

function salva() {
    let alunni = []
    let righe = tbody.querySelectorAll('tr')
    righe.forEach( function(riga) {
        let alunno = {
            nominativo: riga.children[0].innerHTML,
            classe: riga.children[1].innerHTML
        }
        alunni.push(alunno)
    } )
    localStorage.setItem("alunni", JSON.stringify(alunni)) 
}