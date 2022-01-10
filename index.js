//D3 tutorial

d3.select() //return first element that match
d3.selectAll(); // return all matching element

//D3 allow chain method that made code readable and clean
d3.select('h1').style('color', 'hotpink')
.attr('class', 'heading') // can add class /ID to element 
.text('updated h1')

// d3.select('body').append('h3').text('Awesome class')

//Change the background color
d3.select("body").transition()
    .duration(3000)
    .style("background-color", "lightyellow");



///Manipulate Circle
d3.selectAll('circle')
.style("fill", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
})
  .attr('r', function() {
    return 10 + Math.random() * 40;
  });

  //Event Dom 
  d3.selectAll('circle')
  .on('click', function(e, d) {
    d3.select(this)
      .style('fill', 'black');
  });


//Maniuplate text
d3.select("body .presentation")
.selectAll("p")
.data([4, 8, 15, 16, 29])
.enter().append("p")
.text(function(d) { return "I’m number " + d + "!"; });

d3.selectAll("p").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});


  ///*********** line chart ************/

  var lineGenerator = d3.line();

  var points = [];
  for(var i = 0; i < 200; i++)
    points.push([ i * 3, Math.random() * 100 ]);
  
  var pathData = lineGenerator(points);
  
  d3.select('path')
    .attr('d', pathData);

    d3.selectAll('path')
    .on('mouseover', function(e, d) {
      d3.select(this)
        .style('stroke', 'hotpink');
    }).on('mousemove', function(){
      d3.select(this)
      .style('stroke', 'hotpink');
    }).on('mouseout', function(){
      d3.select(this)
      .style('stroke', '#999');
    })

  // ///*********** bar chart************/
  
  //   var myData = [
  //     {day : 'Mon', value: 10},
  //     {day : 'Tue', value: 40},
  //     {day : 'Wed', value: 200},
  //     {day : 'Thu', value: 60},
  //     {day : 'Fri', value: 30}
  //   ];
    
  //   var bandScale = d3.scaleBand()
  //     .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
  //     .range([0, 200])
  //     .paddingInner(0.05);
    
  //   d3.select('#wrapper')
  //     .selectAll('rect')
  //     .data(myData)
  //     .join('rect')

  //     .attr('y', function(d) {
  //       return bandScale(d.day);
  //     })
  //     .attr('height', bandScale.bandwidth())
  //     .attr('width', function(d) {
  //       return d.value;
  //     })
    


  ///*********** Bar ************/

myData = [
  {
    "name": "Ahmad",
    "score": 37
  },
  {
    "name": "Prue",
    "score": 39
  },
  {
    "name": "Jared",
    "score": 31
  },
  {
    "name": "Eleanor",
    "score": 35
  },
  {
    "name": "Ceo",
    "score": 38
  }
];

var barWidth = 700;
var barScale = d3.scaleLinear().domain([0, 100]).range([0, barWidth]);

var u = d3.select('#wrapper')
  .selectAll('.person')
  .data(myData)

var entering = u.enter()
  .append('div')
  .classed('person', true);



entering.append('div')
  .classed('label', true)
  .text(function(d) {
    return d.name;
  });

entering.append('div')
  .classed('bar', true)
  .style('width', function(d) {
    return barScale(d.score) + 'px';
  }).style("background-color", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  }).on('mouseover', function(e, d) {
    d3.select(this)
      .style('background-color', 'hotpink');
  }).on('mouseout', function(e, d) {
    d3.select(this)
      .style('background-color', 'black');
  });;

function sort() {
  d3.selectAll('.person')
    .sort(function(a, b) {
      return b.score - a.score;
    });
}
  

    
  ///*********** Wave chart************/

      var yScale = d3.scaleLinear().domain([0, 800]).range([200, 0]);

      var areaGenerator = d3.area()
        .x(function(d, i) {
          return i * 50;
        })
        .y0(function(d) {
          return yScale(d[0]);
        })
        .y1(function(d) {
          return yScale(d[1]);
        })
        .curve(d3.curveCatmullRom);
      
      var colors = ['#FBB65B', '#FBCF3B', '#de3163', '#4A79A4'];
      
      var data = [
        {day: 1, apricots: 100, bananas: 140, cherries: 105, damsons: 80 },
        {day: 2, apricots: 110, bananas: 150, cherries: 105, damsons: 40},
        {day: 3, apricots: 130, bananas: 160, cherries: 115, damsons: 50},
        {day: 4, apricots: 110, bananas: 200, cherries: 110, damsons: 90},
        {day: 5, apricots: 100, bananas: 220, cherries: 105, damsons: 120},
        {day: 6, apricots: 120, bananas: 240, cherries: 105, damsons: 150},
        {day: 7, apricots: 80, bananas: 230, cherries: 105, damsons: 150},
        {day: 8, apricots: 100, bananas: 215, cherries: 110, damsons: 100},
        {day: 9, apricots: 60, bananas: 185, cherries: 105, damsons: 150},
        {day: 10, apricots: 120, bananas: 180, cherries: 130, damsons: 150}
      ];
      
      var stack = d3.stack()
        .keys(['apricots', 'bananas', 'cherries', 'damsons'])
        .order(d3.stackOrderInsideOut)
        .offset(d3.stackOffsetWiggle);
      
      var stackedSeries = stack(data);
      
      d3.select('.chart')
        .selectAll('path')
        .data(stackedSeries)
        .join('path')
        .style('fill', function(d, i) {
          return colors[i];
        })
        .attr('d', areaGenerator)
      
  

        var pieGenerator = d3.pie()
	.value(function(d) {return d.quantity;})
	.sort(function(a, b) {
		return a.name.localeCompare(b.name);
	});


  ///***********Pie chart************/

var fruits = [
	{name: 'Apples', quantity: 20},
	{name: 'Bananas', quantity: 40},
	{name: 'Cherries', quantity: 50},
	{name: 'Damsons', quantity: 10},
	{name: 'Elderberries', quantity: 30},
];

// Create an arc generator with configuration
var arcGenerator = d3.arc()
	.innerRadius(20)
	.outerRadius(100);

var arcData = pieGenerator(fruits);

// Create a path element and set its d attribute
d3.select('.cir')
	.selectAll('path')
	.data(arcData)
	.join('path')
	.attr('d', arcGenerator);


// Labels
d3.select('.cir')
	.selectAll('text')
	.data(arcData)
	.join('text')
	.each(function(d) {
		var centroid = arcGenerator.centroid(d);
		d3.select(this)
			.attr('x', centroid[0])
			.attr('y', centroid[1])
			.attr('dy', '0.33em')
			.text(d.data.name);
	});


  ///***********tree layout ************/

  var data = {
    "name": "A1",
    "children": [
      {
        "name": "B1",
        "children": [
          {
            "name": "C1",
            "value": 100
          },
          {
            "name": "C2",
            "value": 300
          },
          {
            "name": "C3",
            "value": 200
          }
        ]
      },
      {
        "name": "B2",
        "value": 200
      }
    ]
  };

  
  var treemapLayout = d3.treemap()
    .size([400, 200])
    .paddingOuter(16);
  
  var rootNode = d3.hierarchy(data)
  
  rootNode.sum(function(d) {
    return d.value;
  });
  
  treemapLayout(rootNode);
  
  var nodes = d3.select('.tree g')
    .selectAll('g')
    .data(rootNode.descendants())
    .join('g')
    .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
  
  nodes
    .append('rect')
    .attr('width', function(d) { return d.x1 - d.x0; })
    .attr('height', function(d) { return d.y1 - d.y0; })
  
  nodes
    .append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .text(function(d) {
      return d.data.name;
    })
  
  




  ///*********** Geographic ************/


let geojson = {}

let context = d3.select('#content canvas')
  .node()
  .getContext('2d');

let projection = d3.geoOrthographic()
  .scale(300);

let geoGenerator = d3.geoPath()
  .projection(projection)
  .pointRadius(4)
  .context(context);

let yaw = 300;

function update() {
  projection.rotate([yaw, -45])

  context.clearRect(0, 0, 800, 600);

  context.lineWidth = 0.5;
  context.strokeStyle = '#333';

  context.beginPath();
  geoGenerator({type: 'FeatureCollection', features: geojson.features})
  context.stroke();

  // Graticule
  let graticule = d3.geoGraticule();
  context.beginPath();
  context.strokeStyle = '#ccc';
  geoGenerator(graticule());
  context.stroke();

  yaw -= 0.2
}



// REQUEST DATA
d3.json('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json')
	.then(function(json) {
  geojson = json;
  window.setInterval(update, 100);
})

  
