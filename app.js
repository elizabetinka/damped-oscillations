let L = 1000;
let R = 10;
let C = 10;
let q0 = 10;
let fi = 0;

const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.innerHeight;
console.log("Ширина", availableScreenWidth );
console.log("Длина", availableScreenHeight );


let L_text = document.getElementById("L_id");
let R_text = document.getElementById("R_id");
let C_text = document.getElementById("C_id");
let q0_text = document.getElementById("q0_id");
let fi_text = document.getElementById("fi_id");
let resultButton = document.getElementById('result');

showMessage(L,C,R,fi,q0);


function showMessage(L,C,R,fi,q0) {
    let massx = [];
    let massy = [];
    let massy2 = [];
    let massy3 = [];
    let b= R/(2*L);
    let w0 = 1/Math.sqrt(L*C);
    let w_2 = w0*w0-b*b;
    let w= Math.sqrt(w0*w0-b*b);
    let T = 2*Math.PI/w;
    console.log("b: ", b, " w0: ",w0, "w: ", w , "w^2: ", w_2);
    for (let i =0; (w_2 > 0  && (i<T)); i +=0.1){
        let q = q0*Math.exp(-b*i)*Math.cos(w*i+fi);
        let I = -b*q0*Math.exp(-b*i)*Math.cos(w*i+fi) - w*q0*Math.exp(-b*i)*Math.sin(w*i+fi);
        let U = q/C;
        massx.push(i)
        massy.push(q);
        massy2.push(I);
        massy3.push(U)
        console.log("i: ", i, " q: ",q, "I: ", I, " U: ",U );
    }

    var result ={
        x: massx,
        y: massy,
        mode:'lines', line: {color: "#04BBEC"}
    };
    var result2 ={
        x: massx,
        y: massy2,
        mode: 'lines', line: {color: "#FF82F4"}
    };
    var result3 ={
        x: massx,
        y: massy3,
        mode: 'lines', line: {color: "#FF82F4"}
    };
    var baseLayout = {
        title: 'Зависимость силы заряда от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'q,Кл',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    var baseLayout2 = {
        title: 'Зависимость силы тока от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'I,А',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    var baseLayout3 = {
        title: 'Зависимость напряжения от времени',
        autosize: true,
        height: 300,
        /*width: 1600,
        height: 300,*/
        xaxis: {
            title: 't,с',
            rangemode: 'tozero',
        },
        yaxis: {
            title: 'U,В',
        },
        margin: {
            l: 50,
            r: 20,
            b: 30,
            t: 50,
            pad: 0
          },
        font: {
            size: 9,
          }
    };
    Plotly.react( 'tester', [result], baseLayout );
    Plotly.react( 'tester2', [result2], baseLayout2 );
    Plotly.react( 'tester3', [result3], baseLayout3 );
}

resultButton.onclick = function(){
    L = L_text.value;
    R = R_text.value;
    C = C_text.value;
    fi = fi_text.value*Math.PI/6;
    q0 = q0_text.value;
    if (L < 0 || R<0 || C < 0 || fi < 0){
        alert("Значения не могут быть отрицательными!")
    }
    else{
        showMessage(L,C,R,fi,q0);
    }

    
}