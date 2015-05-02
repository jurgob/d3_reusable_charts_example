
var barsGraph = function() {
	var width = 250;
	var barHeight = 20;
	var dispatch = d3.dispatch('barClick', 'barMouseOver', 'barMouseOut');

	var textConfig = {}
	textConfig.attrs = {
		"x": 10,
		"y": barHeight /2,
		"dy": ".35em",
	}
	textConfig.style = {
		'fill': '#111',
		'text-anchor': 'initial',
		'font-size': '10px',
		'stroke': '#111'
	}

	var valueBarValues = {}
	valueBarValues.attr = {
		"height": barHeight - 1
	}
	valueBarValues.style = {
		'fill': function(d, i){
			return d.highlighted ? d3.rgb('#333399').brighter(): d3.rgb('#6666ff');
		}
	}

	var update = function(data, selection)
	{

		var dataVals = data.map(function(el){ return el.value });
		var dataLabels = data.map(function(el){ return el.name });
		var x = d3.scale.linear()
	  	.domain([0, d3.max(dataVals)])
	  	.range([0, width]);

		selection
			.attr("height", '400px')
			//.attr("height", barHeight * data.length)
		  .attr("width", width)

		var bar = selection.selectAll("g").data(data)
		var barEnter = bar.enter().append("g");

		barEnter.attr("transform", function(d, i) {
	  	return "translate(0," + i * barHeight + ")";
	  });

		barEnter.append("rect");
		barEnter.append("text");

		var textBar = bar.selectAll("text")
		textBar
			.attr(textConfig.attrs)
	    .style(textConfig.style)
	    .text(function(d) { return d.name; })

		var valueBar = bar.selectAll("rect");
		valueBar
	    .attr(valueBarValues.attr)
	    .attr("width", function(d){return x(d.value)})
	    .style(valueBarValues.style);

	  barEnter.style("opacity",0).transition().duration(1000).style("opacity",1);

		bar.exit()
			.transition().duration(1000).style("opacity",0)
			// .remove();


		bar.on('mouseover', function(d, i){
	  	var event = {
	  		d:d,
	  		i:i
	  	};
	  	console.log('-> dispatch mouseover');
	  	dispatch.barMouseOver(event);
	  });

		bar.on('mouseout', function(d, i){
	  	var event = {
	  		d:d,
	  		i:i
	  	};
	  	console.log('<- dispatch mouse--out');
	  	dispatch.barMouseOut(event);
	  });

	  dispatch.on('barMouseOver', function(event){
	   		event.d.highlighted = true;
	   		console.log('barMouseOver '+event.d.name);
	   		console.dir(data);
	   		update(data, selection);
	   });

	   dispatch.on('barMouseOut', function(event){
	   		event.d.highlighted = false;
	   		console.log('barMouseOut');
	   		console.dir(data);
	   		update(data, selection);
	   });

	}
	//end update


  function d3Module(selection) {
  	selection.each(function(data) {
  		update(data, d3.select(this));
		});
  }

  d3Module.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return d3Module;
  };

  d3Module.barHeight = function(value) {
    if (!arguments.length) return barHeight;
    barHeight = barHeight;
    return d3Module;
  };

  d3Module.fillColor = function(value) {
    if (!arguments.length) return valueBarValues.style.fill;
    valueBarValues.style.fill =value;
    return d3Module;
  };

  d3Module.dispatcher = function(){
  	return dispatch;
  }

  return d3Module;

}
