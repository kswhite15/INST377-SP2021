async function dataFilter(mapFromMapFunction) {
    const form = document.querySelector('#search-form');
    const search = document.querySelector('#search');
    const targetList = document.querySelector('.target-list');
   
    const request = await fetch('/api');
    const data = await request.json();
  
    // this code fires when our form submits
    // it filters our data list and returns it to the HTML
    form.addEventListener('submit', async (event) => {
      targetList.innerText = '';
  
      event.preventDefault();
      console.log('submit fired', search.value);
      // eslint-disable-next-line max-len
      // make sure each returned restaurant _can_ be plotted on the map by checking for the value we need
      const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
      const topFive = filtered.slice(0, 5);
  
      console.table(topFive);
  
      topFive.forEach((item) => {
        const longLat = item.geocoded_column_1.coordinates;
        console.log('markerLongLat', longLat[0], longLat[1]);
        const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromMapFunction);
  
        const appendItem = document.createElement('li');
        appendItem.classList.add('block');
        appendItem.classList.add('list-item');
        appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
        targetList.append(appendItem);
      });
  
      const {coordinates} = topFive[0]?.geocoded_column_1;
      console.log('viewSet coords', coordinates);
      mapFromMapFunction.panTo([coordinates[1], coordinates[0]], 0);
    });
  }