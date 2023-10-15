const userInput = document.getElementById('input_datos');
const userSelect = document.getElementById('moneda_select');
const addBtn = document.querySelector('button');
const chart = document.getElementById('myChart');
const result = document.getElementById('renderChart');
let resultAPI = '';
let resulSelect = '';

let myChart;

addBtn.addEventListener('click', ()=>{
    const valueSelect = userSelect.value;
    resulSelect = valueSelect;
    const operator = userInput.value / resultAPI[valueSelect].valor;
    result.innerHTML = `
    <p>Resultado
    ${valueSelect === 'dolar' ? '$' : '€'}${operator.toFixed(2)}</p>
    `;    
})

const getDataCoin = async () =>{
    try{
        const api = await fetch('https://mindicador.cl/api');
        if(!api.ok){
            throw new Error(`No llego la info, status: "${api.status}"`)
        }
        const stock = await api.json();
        resultAPI = stock;
        return stock;

    }catch(error){
        alert(error.message || 'Ocurrio un error')
    }
}



const OptionSelect = async () =>{
    const data = await getDataCoin();
    
    if (data){
        for (let info in data){
            if(info === 'dolar' || info === 'euro'){
                userSelect.innerHTML +=`<option value="${data[info].codigo}">${data[info].nombre}</option>`
            }   
        }
    }
}

OptionSelect();



// graphData = new Chart(chart, {
//     type: 'line',
//     data: {
//         labeles: [],
//         datasets:[{
//             label:'',
//             data:[],
//         }]
//     }
// }) 
    



