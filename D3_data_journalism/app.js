(async function(){

    const 
        svgWidth = 960,
        svgHeight = 500;

    // Define the chart's margins as an object
    const chartMargin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    // Define dimensions of the chart area
    const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    const svg = d3.select("body")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
    const chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


    const tvData = await d3.csv("./data.csv").catch(error => console.warn(error));
    console.log(tvData);
    // log a list of names
    const names = tvData.map(data => data.id);
    console.log("names", names);

    // Cast each hours value in tvData as a number using the unary + operator
    tvData.forEach(function(d) {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    const xLinearScale = d3.scaleLinear()
        .domain([8,d3.max(tvData, d => d.poverty)])
        .range([0, chartWidth]);

    // Create a linear scale for the vertical axis.
    const yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(tvData, d => d.healthcare)])
        .range([chartHeight, 0]);

    const bottomAxis = d3.axisBottom(xLinearScale);
    const leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
        .call(leftAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    const help = tvData.map(data => data.abbr);

    const circlesGroup = chartGroup.selectAll("circle")
        .data(tvData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r","10")
        .attr("fill","pink")
        .attr("stroke","white");

    const textElems = svg.append('g')
        .selectAll('text')
        .data(tvData)
        .enter().append('text')
        .text(d => d.abbr)
        .attr('font-size',9)
        .attr('dx', d => 93.5+ xLinearScale(d.poverty))
        .attr('dy',d => 24.5+yLinearScale(d.healthcare))
        .attr("r","5")

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%) ");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
    
})()