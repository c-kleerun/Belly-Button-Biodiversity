function init() {
    d3.json('../../samples.json').then((data) => {

        console.log(data);

        // populate dropdown data, set default
        for (var i = 0; i < data.names.length; i++) {
            var option = data.names[i];
            var el = document.createElement('option');
            el.textContent = option;
            el.value = option;
            selDataset.appendChild(el);
        };
        var firstID = data.names[0]
        loadDemo(firstID)
        loadBubble(firstID)
        loadBar(firstID)
        loadGauge(firstID)
    });
};

// Run all graphs on ID No. Change
d3.selectAll('#selDataset').on('change', optionChanged);

function optionChanged() {
    d3.event.preventDefault();
    var inputElement = d3.select('#selDataset')
    var inputValue = inputElement.property('value');

    console.log(inputValue)

    return loadBar(inputValue), loadBubble(inputValue), loadDemo(inputValue), loadGauge(inputValue);
};

// Function to call Demographics info
function loadDemo(inputValue) {
    d3.json('../../samples.json').then((data) => {
        var metaFiltered = data.metadata.filter((data) => {
            return data.id == inputValue;
        })[0]

        console.log(metaFiltered)

        var meta = d3.select("#sample-metadata");
        meta.selectAll("table").remove();
        var table = meta.append("table");
        table.append("tr").append("td").text(`id: ${inputValue}`);
        table.append("tr").append("td").text(`ethnicity: ${metaFiltered.ethnicity}`);
        table.append("tr").append("td").text(`gender: ${metaFiltered.gender}`);
        table.append("tr").append("td").text(`age: ${metaFiltered.age}`);
        table.append("tr").append("td").text(`location: ${metaFiltered.location}`);
    });
};

// Function to pull data and create Gauge for wfreq 
function loadGauge(inputValue) {
    d3.json('../../samples.json').then((data) => {
        var metaFiltered = data.metadata.filter((data) => {
            return data.id == inputValue;
        })[0]

        var data = [{ 
            value: metaFiltered.wfreq,
            title: { text: `Patient ${inputValue} Wash Frequency`},
            type: 'indicator', 
            mode: 'gauge+number', 
            gauge: {
                axis: {visble: false, range: [0, 10]}, 
                bar: {color: 'rgb(134, -0, 237)', thickness: 1}, 
                bgcolor: 'rgb(178, 178, 178', 
                bordercolor: 'rgb(178, 178, 178)',
            }
        }];

        var layout = {
            width: 600,
            height: 600,
        };

        Plotly.newPlot('gauge', data, layout);
    });
};

// Function to pull data and create bar graph for top 10 OTU values 
function loadBar(inputValue) {
    d3.json('../../samples.json').then((data) => {
        var dataFiltered = data.samples.filter((data) => {
            return data.id === inputValue;
        })[0]

        var trace1 = {
            x: dataFiltered.sample_values.slice(0, 10).reverse(),
            y: dataFiltered.otu_ids.slice(0, 10).map((otu_id) => {
                return `otu ${otu_id}`
            }).reverse(),
            text: dataFiltered.otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h'
        };

        var data = [trace1]

        var layout = {
            title: `Patient ${inputValue} Top 10 OTUs`,
            xaxis: {
                title: 'Sample OTU Values'
            },
            yaxis: {
                title: 'OTU ID'
            }
        };

        Plotly.newPlot('bar', data, layout);
    });
};

// function to pull and create bubble graph for all OTU data
function loadBubble(inputValue) {
    d3.json('../../samples.json').then((data) => {
        var dataFiltered = data.samples.filter((data) => {
            return data.id === inputValue;
        })[0]

        var trace2 = {
            x: dataFiltered.otu_ids,
            y: dataFiltered.sample_values,
            text: dataFiltered.otu_labels,
            mode: 'markers',
            marker: {
                size: dataFiltered.sample_values,
                color: dataFiltered.otu_ids,
                colorscale: 'Bluered'
            },
        };

        var data = [trace2]

        var layout = {
            title: `Patient ${inputValue} Top 10 OTUs`,
            xaxis: {
                title: 'OTU IDs'
            },
            yaxis: {
                title: 'Sample OTU Values'
            }
        };

        Plotly.newPlot('bubble', data, layout);
    });
};

init()
