
var myBars = barsGraph()
.width(320)
.barHeight(80)




//.fillColor('#660000');

// myBars.dispatcher()
// 	.on('barMouseOver.external1', function(e){
// 		alert('public bar clicked');
// 	})

	// .on('barClick.external2', function(e){
	// 	alert('public  bar clicked 2');
	// });

var data = [
	{'name': 'I.T. Administration', value: 32},
	{'name': 'Systems Analysis/Design', value: 12},
	{'name': 'Hardware/Embedded Software', value: 22},
	{'name': 'Management', value: 42},
	{'name': 'Data', value: 31},
	{'name': 'Industry-specific', value: 22},
	{'name': 'Design', value: 13},
	{'name': 'Communication', value: 8},
	{'name': 'Software Development 2', value: 2},
];

d3.select(".chart")
	.datum(data)
	.call(myBars);


setTimeout(function(){
	console.log('setTimeout');


	//reconfigure
	myBars
		.width(430);

	//change data
  data = data.slice(1);

  //update graph
	d3.select(".chart")
		.datum(data)
		.call(myBars);



}, 2000);

