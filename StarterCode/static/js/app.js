function init() {
    d3.json('../../samples.json').then((data) => {

        console.log(data);

        // populate dropdown data
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
    });
};


d3.selectAll('#selDataset').on('change', optionChanged);

function optionChanged() {
    d3.event.preventDefault();
    var inputElement = d3.select('#selDataset')
    var inputValue = inputElement.property('value');

    console.log(inputValue)

    return loadBar(inputValue), loadBubble(inputValue), loadDemo(inputValue);
};

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
    // loadGauge(metaFiltered.wfreq)
};



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
