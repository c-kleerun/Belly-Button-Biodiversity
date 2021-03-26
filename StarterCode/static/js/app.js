d3.json('../../samples.json').then((data) => {
    console.log(data);

for (var i=0; i<data.names.length; i++) {
    var option = data.names[i];
    var el = document.createElement('option');
    el.textContent = option;
    el.value = option;
    selDataset.appendChild(el);
};     

d3.selectAll('#selDataset').on('change', optionChanged);

function optionChanged () {
    d3.event.preventDefault();
    var inputElement = d3.select('#selDataset')
    var inputValue = inputElement.property('value');

    console.log(inputValue)

    // var names = [];
    
    // if (inputValue == inputElement)
    }

    var trace1 = {
        x: data.samples.map((ids) => {
            return ids.otu_ids
        }),
        y: data.samples.map((values) => {
            return values.sample_values.length
        }),
        type: 'bar',
        name: 'Prevalence of OTU IDs'
    };

    // var trace2 = {
    //     x: data.otu_ids,
    //     y: data.sample_values,
    //     type: 'bubble',
    //     mode: 'markers',
    //     marker: {
    //         size: data.sample_values,
    //         color: otu_ids
    //     },
    //     name: 'Sample Values and OTU Comparison'
    // };

    var data = [trace1]

    var layout = {
    };

    Plotly.newPlot('bar', data, layout);
});
