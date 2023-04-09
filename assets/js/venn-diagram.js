var sets = [
    {"sets": [2], "label": "Design", "position": "bottom", "size": 50, "data":"TalkingBoogie (CHI '20)<br>Persona in Chatbot (MobileHCI '20; CHI '20)<br>LiquidEye (JMIR, '21)<br>BlahBlahBot (CHI '21)<br>Older Adults in MOOC (CHI '22, currently under R&R)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [0], "label": "Translational Science", "position": "top", "size": 50, "data":"TalkingBoogie (CHI '20)<br>BlahBlahBot (CHI '21)<br>Persona in Chatbot (MobileHCI '20; CHI '20)<br>Trkic G00gle (CSCW '21)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [1], "label": "Generative AI", "position": "top", "size": 50, "data":"BlahBlahBot (CHI '21)<br>Trkic G00gle (CSCW '21)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [0, 1], "label": "", "position": "top", "size": 10, "data":"BlahBlahBot (CHI '21)<br>Trkic G00gle (CSCW '21)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [0, 2], "label": "", "position": "top", "size": 10, "data":"TalkingBoogie (CHI '20)<br>BlahBlahBot (CHI '21)<br>Persona in Chatbot (MobileHCI '20; CHI '20)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [1, 2], "label": "", "position": "top", "size": 10, "data":"BlahBlahBot (CHI '21)<br>Satellite imagery XAI (NeurIPS '21)"},
    {"sets": [0, 1, 2], "label": "", "position": "top", "size":20, "data":"BlahBlahBot (CHI '21)<br>Satellite imagery XAI (NeurIPS '21)"}];

var svgContainer = d3.select("#venn").append("svg")
    .attr("width", 250)
    .attr("height", 250)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 250 250")
    .attr("id", "vennsvg");


var venngroup = svgContainer.append("g")
    .attr("id", "venngroup");
;

var chart = venn.VennDiagram()
    .width(250)
    .height(250)
    .styled(false);

var div = d3.select("#venngroup")
div.datum(sets).call(chart);
var tooltip = d3.select("#tooltip").append("div")
    .attr("class", "venntooltip");
div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#666666")
    .style("stroke-width", 0)
    .style("transform-origin", "50% 50%");


div.selectAll("g.venn-area")
    .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);
        // Display a tooltip with the current size
        d3.select("#venngroup").selectAll("path").transition().duration(250).style("stroke-width", 1.5);
        tooltip.style("z-index", 0);
        tooltip.transition().duration(250).style("opacity", 1);

        if (d.sets.includes(0)) {
            d3.select("#translational-science").transition().duration(150).style("background-position-y", "100%");
        }
        if (d.sets.includes(1)) {
            d3.select("#generative-ai").transition().duration(150).style("background-position-y", "100%");
        }
        if (d.sets.includes(2)) {
            d3.select("#design").transition().duration(150).style("background-position-y", "100%");
        }

        if (d.position == "top") {
            tooltip.style("top","0")
            tooltip.style("bottom","auto")
        } else {
            tooltip.style("top","auto")
            tooltip.style("bottom","15px")
        }
        tooltip.html(d.data);

        // d3.select("#venn").selectAll("path").transition("filter").duration(250).style("filter", "grayscale(20%)").style("filter", ("filter", "url(#desaturate)");

        //   var circleUnderMouse = this;
        //  d3.select("#venn").selectAll("path").transition("opacity").duration(250).style("opacity",  function () {return (this === circleUnderMouse) ? 1.0 : 0.5;});


        // d3.select(this).selectAll("path").transition("opacity").duration(250).style("fill-opacity", 1);
        // d3.select(this).raise();

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(250);
        selection.select("path")
            .style("fill-opacity", 1)
            .style("stroke-opacity", 1)
            .style("transform", "scale(1.01,1.01)")
            .style("transform-origin", "50% 50%");
    })
    // .on("mousemove", function() {
    //     tooltip.style("left", (d3.event.pageX) + "px")
    //            .style("top", (d3.event.pageY - 28) + "px");
    // })
    .on("mouseout", function (d, i) {
        d3.select("#translational-science").transition().duration(150).style("background-position-y", "-0%");
        d3.select("#generative-ai").transition().duration(150).style("background-position-y", "-0%");
        d3.select("#design").transition().duration(150).style("background-position-y", "-0%");
        
        tooltip.transition().duration(250).style("opacity", 0).style("z-index", -1000);
        d3.select("#venngroup").selectAll("path").transition().duration(250).style("stroke-width", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? 1 : 1)
            .style("stroke-opacity", 0)
            .style("transform", "scale(1,1)")
            .style("transform-origin", "50% 50%");
        // d3.select("#venn").selectAll("path").transition("opacity").duration(250).style("opacity", 1);
        // d3.select(this).lower();

    });

// svg.append('filter')
//   .attr('id','desaturate')
//   .append('feColorMatrix')
//   .attr('type','matrix')
//   .attr('values',"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");

var stuffToBeWrapped = d3.selectAll("svg");

stuffToBeWrapped.each(function () {

    d3.select(this.childNode).insert("g", function () { return this; })
        //insert a new <g> element immediately before this element
        .attr("class", "wrapper") //set anything you want to on the <g>
        .append(function () { return this; });
    //move the content element into the group

});