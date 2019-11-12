// // @TODO: YOUR CODE HERE!
// (async function (){
//     const 
//         svgWidth = 900,
//         svgHeight = 600;
    
//     const chartMargin = {
//         top: 30,
//         right: 30,
//         bottom: 30,
//         left: 30
//     };

//     const chartWidth = svgWidth-chartMargin.left-chartMargin.right;
//     const chartHeight = svgHeight-chartMargin.top-chartMargin.bottom;

//     const svg = d3.select("body")
//         .append("svg")
//         .attr("height",svgHeight)
//         .attr("width",svgWidth);

//     const chartGroup = svg.append("g");

//     const healthdata = await d3.csv("data.csv");
//     console.log(healthdata);
//     console.log("hello")
// })

(async function(){
    const tvData = await d3.csv("./data.csv").catch(error => console.warn(error));
    console.log(tvData);
    // log a list of names
    const names = tvData.map(data => data.id);
    console.log("names", names);

    // Cast each hours value in tvData as a number using the unary + operator
    tvData.forEach(function(data) {
        data.poverty = +data.poverty;
        console.log("Name:", data.id);
        console.log("Hours:", data.poverty);
    });
})()