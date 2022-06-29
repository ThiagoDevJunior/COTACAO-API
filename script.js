/*API QUE ESTÁ SENDO USADA -->: 'https://economia.awesomeapi.com.br/json/all' */

/*FUNÇÃO PARA FORMATAR VALORES DA API EM PADRÃO BRASIL -> BRL*/
const formatar_valores = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	minimumFranctionDigits: 2,
})

function data(){
	/*DATA EM TEMPO REAL*/
	var dia_f = new Date();
	dia_f.setDate(dia_f.getDate());

	var dia = dia_f.getDate();
	var mes = dia_f.getMonth();
	var ano = dia_f.getFullYear();
	var horas = dia_f.getHours();
	var minutos = dia_f.getMinutes();
	var segund = dia_f.getSeconds();


	data_formatada = 'DATA<br>' + dia + '/' + (mes +1) + '/' + ano + '<br>' + horas + ':' + minutos + ':' + segund
	document.getElementById('data').innerHTML = data_formatada

}


/*A CADA 5 SEGUNDOS DO SITE ABERTO OS VALORES SÃO ATUALIZADOS... SITE EM TEMPO REAL - COTAÇÃO DE MOEDAS*/
function atualizar(){
	
	fetch('https://economia.awesomeapi.com.br/json/all')

	.then(resposta =>{
		return resposta.json()
	})

	.then(corpo=>{

		/*SOLITICANDO E FORMATANDO VALORES RETORNADOS DA API - USANDO A BIBLIOTECA 'Intl' */
		dolar_a = `${corpo.USD.bid}`
		var dolar_a_formatado = formatar_valores.format(dolar_a);

		dolar_c = `${corpo.CAD.bid}`
		var dolar_c_formatado = formatar_valores.format(dolar_c);

		euro = `${corpo.EUR.bid}`
		var euro_formatado = formatar_valores.format(euro);

		libra = `${corpo.GBP.bid}`
		var libra_f = formatar_valores.format(libra);

		iene = `${corpo.JPY.bid}`
		var iene_f = formatar_valores.format(iene);

		bit_coin = `${corpo.BTC.bid}`
		var bit_coin_f = formatar_valores.format(bit_coin);

		peso_argentino = `${corpo.ARS.bid}`
		var peso_argentino_f = formatar_valores.format(peso_argentino);


		/*PASSANDO VALORES PARA A TELA - HTML ATRVÉS DO 'ID' - DE INDENTIFICAÇÃO DAS DIV */
		document.getElementById('dolar_a').innerHTML = 'DOLAR AMERICANO: ' + dolar_a_formatado
		document.getElementById('dolar_C').innerHTML = 'DOLAR CANADENSE: ' + dolar_c_formatado
		document.getElementById('euro').innerHTML = 'EURO: ' + euro_formatado
		document.getElementById('libra').innerHTML = 'LIBRA: ' + libra_f
		document.getElementById('iene').innerHTML = 'ÍENE JAPONÊS: ' + iene_f
		document.getElementById('bit_coin').innerHTML = 'BIT-CÓIN: ' + bit_coin_f
		document.getElementById('p_argentino').innerHTML = 'PESO-ARGÉNTINO: ' + peso_argentino_f


		/*QUANDO CARREGAR, RETIRA O SPINNER DE CARREGAMENTO
		E SUBSTITUE POR '' NADA!*/
		document.getElementById('p_carregar').innerHTML = ``;
		document.getElementById('linha').innerHTML = '_____________________________________';

	})

}

/*TEMPO É DADO EM MILISIGUNDOS! EX: 5000 = 5 SEGUNDOS, 3000 = 3 SEGUNDOS... */
setInterval(atualizar, 1000);
setInterval(data, 1000);
