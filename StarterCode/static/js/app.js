d3.json('../../samples.json').then((data) => {
    
    console.log(data);

// populate dropdown data
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

    return loadBar(inputValue), loadBubble(inputValue);
};

function loadBar (inputValue) {
    d3.json('../../samples.json').then((data) => {
        var dataFiltered = data.samples.filter((data) => {
            return data.id === inputValue;
        })[0]

        console.log(dataFiltered)
            var trace1 = {
                x: dataFiltered.sample_values.slice(0, 10).reverse(),
                y: dataFiltered.otu_ids.slice(0, 10).map((otu_id) => {
                    return `otu ${otu_id}`
                }).reverse(),
                text: dataFiltered.otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h',
                name: 'Patient Top 10 OTUs'
            };
        
            var data = [trace1]
        
            var layout = {
            };
        
            Plotly.newPlot('bar', data, layout);
        });
    }

    function loadBubble (inputValue) {
        d3.json('../../samples.json').then((data) => {
            var dataFiltered = data.samples.filter((data) => {
                return data.id === inputValue;
            })[0]
    
            console.log(dataFiltered)
                var trace2 = {
                    x: dataFiltered.otu_ids,
                    y: dataFiltered.sample_values,
                    text: dataFiltered.otu_labels,
                    mode: 'markers',
                    marker: {
                        size: dataFiltered.sample_values,
                        color: dataFiltered.otu_ids,
                        colorscale: 'YlGnBu'
                    },
                };
            
                var data = [trace2]
            
                var layout = {
                };
            
                Plotly.newPlot('bubble', data, layout);
            });
        }
});
