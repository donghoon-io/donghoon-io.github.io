// D3 and TopoJSON are loaded by the Fun page before this module.
const { d3, topojson } = window;

const flights = [
    { "from": "ICN", "to": "SFO", "date": "2022-05-01", "flight_code": "UA806" },
    { "from": "SFO", "to": "MYR", "date": "2022-05-01", "flight_code": "UA2068" },
    { "from": "MSY", "to": "DFW", "date": "2022-05-07", "flight_code": "AA1077" },
    { "from": "DFW", "to": "ICN", "date": "2022-05-07", "flight_code": "AA281" },
    { "from": "ICN", "to": "SEA", "date": "2022-09-12", "flight_code": "DL196" },
    { "from": "SEA", "to": "FRA", "date": "2023-04-22", "flight_code": "LH491" },
    { "from": "HAM", "to": "LIN", "date": "2023-04-27", "flight_code": "LH2735" },
    { "from": "LIN", "to": "FRA", "date": "2023-04-29", "flight_code": "LH273" },
    { "from": "FRA", "to": "SEA", "date": "2023-04-29", "flight_code": "LH490" },
    { "from": "SEA", "to": "ICN", "date": "2023-06-03", "flight_code": "DL197" },
    { "from": "ICN", "to": "PUS", "date": "2023-06-20", "flight_code": "KE1401" },
    { "from": "ICN", "to": "KIX", "date": "2023-08-07", "flight_code": "OZ112" },
    { "from": "KIX", "to": "ICN", "date": "2023-08-10", "flight_code": "OZ111" },
    { "from": "ICN", "to": "SEA", "date": "2023-09-20", "flight_code": "KE41" },
    { "from": "SEA", "to": "HND", "date": "2023-12-06", "flight_code": "NH117" },
    { "from": "NRT", "to": "PUS", "date": "2023-12-09", "flight_code": "BX111" },
    { "from": "ICN", "to": "NRT", "date": "2023-12-25", "flight_code": "KE703" },
    { "from": "HND", "to": "SEA", "date": "2023-12-25", "flight_code": "NH118" },
    { "from": "SEA", "to": "YVR", "date": "2024-04-26", "flight_code": "AC8092" },
    { "from": "YVR", "to": "SEA", "date": "2024-04-27", "flight_code": "AC8093" },
    { "from": "SEA", "to": "HNL", "date": "2024-05-10", "flight_code": "AS831" },
    { "from": "HNL", "to": "NRT", "date": "2024-05-16", "flight_code": "NH183" },
    { "from": "NRT", "to": "PUS", "date": "2024-05-16", "flight_code": "BX111" },
    { "from": "PUS", "to": "GMP", "date": "2024-09-14", "flight_code": "BX8804" },
    { "from": "ICN", "to": "SFO", "date": "2024-09-14", "flight_code": "UA806" },
    { "from": "SFO", "to": "SEA", "date": "2024-09-14", "flight_code": "AS339" },
    { "from": "SEA", "to": "SJC", "date": "2024-06-15", "flight_code": "AS522" },
    { "from": "SJC", "to": "SEA", "date": "2024-07-30", "flight_code": "AS523" },
    { "from": "SEA", "to": "SJC", "date": "2024-08-03", "flight_code": "AS522" },
    { "from": "SJC", "to": "SEA", "date": "2024-09-04", "flight_code": "AS523" },
    { "from": "SEA", "to": "ICN", "date": "2024-09-14", "flight_code": "KE42" },
    { "from": "ICN", "to": "SEA", "date": "2024-10-05", "flight_code": "DL196" },
    { "from": "SEA", "to": "ICN", "date": "2024-12-07", "flight_code": "OZ271" },
    { "from": "ICN", "to": "SEA", "date": "2024-12-15", "flight_code": "OZ272" },
    { "from": "SEA", "to": "ICN", "date": "2025-03-12", "flight_code": "DL197" },
    { "from": "ICN", "to": "HNL", "date": "2025-03-30", "flight_code": "KE53" },
    { "from": "HNL", "to": "SEA", "date": "2025-03-30", "flight_code": "DL378" },
    { "from": "SEA", "to": "SJC", "date": "2025-04-14", "flight_code": "AS522" },
    { "from": "SJC", "to": "SEA", "date": "2025-04-17", "flight_code": "AS523" },
    { "from": "SEA", "to": "NRT", "date": "2025-05-31", "flight_code": "JL67" },
    { "from": "HND", "to": "GMP", "date": "2025-06-02", "flight_code": "NH861" },
    { "from": "GMP", "to": "PUS", "date": "2025-06-16", "flight_code": "BX8805" },
    { "from": "PUS", "to": "NRT", "date": "2025-06-18", "flight_code": "BX112" },
    { "from": "NRT", "to": "SEA", "date": "2025-06-18", "flight_code": "JL68" },
    { "from": "SEA", "to": "JFK", "date": "2025-06-21", "flight_code": "DL322" },
    { "from": "EWR", "to": "ORY", "date": "2025-07-04", "flight_code": "UA54" },
    { "from": "CDG", "to": "FNC", "date": "2025-07-05", "flight_code": "AF1630" },
    { "from": "FNC", "to": "PDL", "date": "2025-07-08", "flight_code": "S4161" },
    { "from": "PDL", "to": "YYZ", "date": "2025-07-08", "flight_code": "S4335" },
    { "from": "YYZ", "to": "JFK", "date": "2025-07-10", "flight_code": "DL5238" },
    { "from": "EWR", "to": "ICN", "date": "2025-09-22", "flight_code": "YP131" },
    { "from": "ICN", "to": "SEA", "date": "2025-10-05", "flight_code": "KE41" },
    { "from": "SEA", "to": "HNL", "date": "2025-12-05", "flight_code": "HA21" },
    { "from": "HNL", "to": "SEA", "date": "2025-12-09", "flight_code": "HA22" },
    { "from": "SEA", "to": "EWR", "date": "2026-01-30", "flight_code": "AS24" },
    { "from": "EWR", "to": "ICN", "date": "2026-02-03", "flight_code": "YP131" },
    { "from": "ICN", "to": "SEA", "date": "2026-04-03", "flight_code": "HA460" },
    { "from": "SEA", "to": "EWR", "date": "2026-04-29", "flight_code": "AS14" },
    { "from": "EWR", "to": "SEA", "date": "2026-05-04", "flight_code": "AS15" },
    { "from": "SEA", "to": "ICN", "date": "2026-05-25", "flight_code": "DL197" },
    { "from": "ICN", "to": "SIN", "date": "2026-06-13", "flight_code": "TW161" },
    { "from": "SIN", "to": "ICN", "date": "2026-06-19", "flight_code": "TW162" },
    { "from": "PUS", "to": "GMP", "date": "2026-07-03", "flight_code": "TW162" },
    { "from": "GMP", "to": "PUS", "date": "2026-07-03", "flight_code": "TW162" },
    { "from": "PUS", "to": "GMP", "date": "2026-07-29", "flight_code": "TW162" },
    { "from": "GMP", "to": "PUS", "date": "2026-07-30", "flight_code": "TW162" },
    { "from": "ICN", "to": "SEA", "date": "2026-08-27", "flight_code": "TW162" },
    { "from": "SEA", "to": "ATL", "date": "2026-08-27", "flight_code": "TW162" },
    { "from": "ATL", "to": "EWR", "date": "2026-08-27", "flight_code": "TW162" },
    { "from": "EWR", "to": "SEA", "date": "2026-09-02", "flight_code": "TW162" },
].map(flight => ({
    ...flight,
    parsedDate: new Date(`${flight.date}T12:00:00`)
}));

const csvURL = "https://raw.githubusercontent.com/lxndrblz/Airports/main/airports.csv";
const container = d3.select("#flight-map");
const slider = d3.select("#flight-slider");
const sliderSelected = d3.select("#flight-slider-selected");
const timelineStartLabel = d3.select("#flight-timeline-start");
const timelineEnd = d3.select("#flight-timeline-end");
const aspectRatio = 1.7;
const timelineStart = new Date(Math.min(...flights.map(f => f.parsedDate)));
const timelineEndDate = new Date(Math.max(...flights.map(f => f.parsedDate)));
const millisPerDay = 24 * 60 * 60 * 1000;
const sliderMax = Math.max(0, Math.floor((timelineEndDate - timelineStart) / millisPerDay));
const routeAnimationMs = 800;
const sliderThumbSize = 20;
// Airport data uses ISO alpha-2 codes; the map uses ISO numeric IDs.
const countryIds = {
    US: "840", KR: "410", DE: "276", IT: "380", JP: "392",
    CA: "124", FR: "250", PT: "620", SG: "702"
};
const countryLookup = {};
let svg, projection, path, coordLookup = {}, countryLayer, labelLayer, routeLayer;
let cachedWorld = null;

function haversineDistance(coord1, coord2) {
    const toRad = d => d * Math.PI / 180;
    const R = 3958.8; // Earth radius in miles
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1.025; // 1.025 factor to estimate actual flight path deviations
}

function formatTimelineDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });
}

function sliderValueToDate(value) {
    return new Date(timelineStart.getTime() + Number(value) * millisPerDay);
}

function routeKey(from, to) {
    return [from, to].sort().join("-");
}

function updateSelectedDateBubble(selectedDate) {
    const min = Number(slider.attr("min")) || 0;
    const max = Number(slider.attr("max")) || 1;
    const value = Number(slider.property("value")) || 0;
    const percent = max === min ? 0 : (value - min) / (max - min);
    const sliderWidth = slider.node().offsetWidth || 0;
    const leftPx = sliderWidth <= sliderThumbSize
        ? sliderWidth / 2
        : percent * (sliderWidth - sliderThumbSize) + sliderThumbSize / 2;

    sliderSelected
        .text(formatTimelineDate(selectedDate))
        .style("left", `${leftPx}px`);

    slider.style("--flight-slider-progress", `${(percent * 100).toFixed(3)}%`);
}

function buildArcPath(d) {
    const from = projection(coordLookup[d.from]);
    const to = projection(coordLookup[d.to]);

    if (!from || !to) return null;

    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    const curvature = Math.min(50, distance / 4);
    const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - curvature];

    return d3.line().curve(d3.curveBasis)([from, mid, to]);
}

function updateRouteVisibility(selectedDate) {
    if (!routeLayer || !labelLayer) return;

    const visibleFlights = flights.filter(flight => flight.parsedDate <= selectedDate);
    const visitedCountries = new Set(visibleFlights.flatMap(flight =>
        [countryLookup[flight.from], countryLookup[flight.to]].filter(Boolean)
    ));
    countryLayer.selectAll("path")
        .attr("fill", country => visitedCountries.has(String(country.id).padStart(3, "0"))
            ? "#b8b8b8" : "#ececec");

    const routeCount = {};
    let totalMiles = 0;

    for (const flight of visibleFlights) {
        const key = routeKey(flight.from, flight.to);
        routeCount[key] = (routeCount[key] || 0) + 1;

        const fromCoord = coordLookup[flight.from];
        const toCoord = coordLookup[flight.to];
        if (fromCoord && toCoord) {
            totalMiles += haversineDistance(fromCoord, toCoord);
        }
    }

    const routes = routeLayer
        .selectAll("path")
        .data(visibleFlights, flight => `${flight.from}-${flight.to}-${flight.date}`);

    routes.exit()
        .interrupt()
        .transition()
        .duration(250)
        .style("opacity", 0)
        .remove();

    const enteringRoutes = routes.enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#999")
        .attr("stroke-linecap", "round")
        .style("opacity", 0);

    enteringRoutes.merge(routes)
        .attr("stroke", d => {
            const count = routeCount[routeKey(d.from, d.to)] || 1;
            const shade = Math.max(55, Math.round(153 - 28 * Math.log2(count)));
            return `rgb(${shade}, ${shade}, ${shade})`;
        })
        .attr("stroke-width", d => {
            const count = routeCount[routeKey(d.from, d.to)] || 1;
            return Math.min(0.85, 0.3 + 0.12 * Math.log2(count));
        })
        .attr("d", buildArcPath);

    enteringRoutes.each(function () {
        const length = this.getTotalLength();
        d3.select(this)
            .attr("stroke-dasharray", `${length} ${length}`)
            .attr("stroke-dashoffset", length)
            .style("opacity", 1)
            .transition()
            .duration(routeAnimationMs)
            .ease(d3.easeCubicOut)
            .attr("stroke-dashoffset", 0);
    });

    routes
        .style("opacity", 1)
        .attr("stroke-dasharray", null)
        .attr("stroke-dashoffset", null);

    d3.select("#mileage")
        .html(`Flights by ${formatTimelineDate(selectedDate)}: ${visibleFlights.length}<br/>Total miles: ${Math.round(totalMiles).toLocaleString()} mi (${Math.round(totalMiles / 2389)}% of the 🌎 ↔ 🌕 distance)`);

    const airports = [...new Set(visibleFlights.flatMap(f => [f.from, f.to]))];
    const latestFlight = visibleFlights[visibleFlights.length - 1];
    const latestAirportCode = latestFlight ? latestFlight.to : null;
    const labels = airports
        .filter(code => coordLookup[code])
        .map(code => ({
            code,
            isLatest: code === latestAirportCode,
            x: projection(coordLookup[code])[0],
            y: projection(coordLookup[code])[1],
        }));

    for (let i = 0; i < labels.length; i++) {
        for (let j = i + 1; j < labels.length; j++) {
            const a = labels[i];
            const b = labels[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 15) {
                const angle = Math.atan2(dy, dx);
                const shift = 7;
                a.x -= shift * Math.cos(angle);
                a.y -= shift * Math.sin(angle);
                b.x += shift * Math.cos(angle);
                b.y += shift * Math.sin(angle);
            }
        }
    }

    labelLayer
        .selectAll("text")
        .data(labels, d => d.code)
        .join(
            enter => enter.append("text")
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("dy", "-0.35em")
                .attr("text-anchor", "middle")
                .attr("font-size", d => d.isLatest ? 11 : 10)
                .attr("font-weight", d => d.isLatest ? 600 : 350)
                .attr("fill", d => d.isLatest ? "#111111" : "#666")
                .style("opacity", 0)
                .text(d => d.code)
                .transition()
                .duration(250)
                .style("opacity", 1),
            update => update
                .transition()
                .duration(250)
                .attr("x", d => d.x)
                .attr("y", d => d.y)
                .attr("font-size", d => d.isLatest ? 11 : 10)
                .attr("font-weight", d => d.isLatest ? 600 : 350)
                .attr("fill", d => d.isLatest ? "#111111" : "#666")
                .style("opacity", 1),
            exit => exit
                .transition()
                .duration(200)
                .style("opacity", 0)
                .remove()
        );

    updateSelectedDateBubble(selectedDate);
}

function renderMap() {
    container.selectAll("svg").remove();

    const width = container.node().clientWidth;
    const height = width / aspectRatio;

    svg = container.append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("width", "100%")
        .style("height", "auto");

    projection = d3.geoNaturalEarth1()
        .scale(width / 1.5 / Math.PI)
        .center([0, 20])
        .translate([width / 2, height / 2])
        .rotate([120, 0]);

    path = d3.geoPath().projection(projection);

    const countries = topojson.feature(cachedWorld, cachedWorld.objects.countries);
    countries.features = countries.features.filter(d => d.id !== "010");

    countryLayer = svg.append("g").attr("class", "flight-countries");
    countryLayer.selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("fill", "#ececec")
        .attr("stroke", "rgb(249, 246, 240)")
        .attr("stroke-width", .75)
        .attr("d", path);

    routeLayer = svg.append("g");
    labelLayer = svg.append("g");

    updateRouteVisibility(sliderValueToDate(slider.property("value")));
}

d3.csv(csvURL).then(data => {
    for (const row of data) {
        const code = row.code;
        const lat = parseFloat(row.latitude);
        const lon = parseFloat(row.longitude);
        if (code && !isNaN(lat) && !isNaN(lon)) {
            coordLookup[code] = [lon, lat];
            countryLookup[code] = countryIds[row.country];
        }
    }

    slider
        .attr("min", 0)
        .attr("max", sliderMax)
        .attr("step", 1)
        .property("value", sliderMax);

    timelineStartLabel.text(formatTimelineDate(timelineStart));
    timelineEnd.text(formatTimelineDate(timelineEndDate));
    updateSelectedDateBubble(timelineEndDate);

    slider.on("input", function () {
        updateRouteVisibility(sliderValueToDate(this.value));
    });

    d3.json("https://unpkg.com/world-atlas@2.0.2/countries-50m.json").then(world => {
        cachedWorld = world;
        renderMap();
        window.addEventListener("resize", () => renderMap());
    });
});
