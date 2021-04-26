# react-data-pager

![data-pager](https://user-images.githubusercontent.com/44566371/86520200-7cddf600-be4a-11ea-8b84-f89fe44d2dcd.gif)

## Installation
`npm install --save react-data-pager`

This library using react hooks.
Note that to enable Hooks, all React packages need to be 16.8.0 or higher.

## Prop Types
|Prop|Type|Description|
|---|---|---|
|data|array|all the data you want|
|dataEachPage|arrayOf(number)|count of data you want to show in each page, you can set `[10, 20, 30]` and the client select how much data he want to see in each page|
|onChange|func|event that return the filtered data for the selected page|
|style|oneOfType(object, array)|set different style to container|
|selectedPageColor|string|set different color for the selected page|
|stylePager|oneOfType(object, array)|set different style to pager|
|styleNextPrevButton|oneOfType(object, array)|set different style to next and prev button like color and more, the buttons are svg|
|styleDataEachPage|oneOfType(object, array)|set different style to data each page|

## Example Code
[demo](https://almogbakhshi.github.io/#/react-data-pager)
```javascript
import React, { useState, useEffect } from 'react';
import DataPager from 'react-data-pager';

const App = () => {
  const [data, setData] = useState();
  const [showData, setShowData] = useState();

  const [dataPager_1, setDataPager_1] = useState();
  const [dataPager_2, setDataPager_2] = useState();
  const [dataPager_3, setDataPager_3] = useState();

  useEffect(() => {
    fetch('http://api.tvmaze.com/shows', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        const show_100 = res.length > 100 ? res.slice(0, 100) : res;
        setShowData(show_100);
        const showName = show_100.map(show => show.name);
        setData(showName);
      })
      .catch(err => console.error(err));
  }, [])

  const ShowTable = ({ dataTable }) => {
    return (
      <table border={1} style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Language</th>
            <th>Genres</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {dataTable && dataTable.map((show, index) => <tr key={index} >
            <td><img style={{ height: '100px' }} src={show.image.medium} /></td>
            <td>{show.name}</td>
            <td>{show.language}</td>
            <td><ul> {show.genres.map(item => <li key={item}>{item}</li>)}</ul></td>
            <td>{show.rating.average}</td>
          </tr>)}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        {dataPager_1 && dataPager_1.map((showName, index) => dataPager_1.length - 1 === index ? showName : `${showName}, `)}
      </div>

      <DataPager
        data={data}
        onChange={e => setDataPager_1(e)}
        style={{ marginTop: '5px' }}
      />

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <ShowTable dataTable={dataPager_2} />
      </div>

      <DataPager
        data={showData}
        dataEachPage={[5]}
        onChange={e => setDataPager_2(e)}
        selectedPageColor='#00ff00'
        style={{ width: '30%', margin: 'auto', marginTop: '5px' }}
        stylePager={{ width: '100%' }}
      />

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <ShowTable dataTable={dataPager_3} />
      </div>

      <DataPager
        data={showData}
        dataEachPage={[5, 10, 15]}
        onChange={e => setDataPager_3(e)}
        selectedPageColor='#dd0d00'
        style={{ width: '50%', margin: 'auto', marginTop: '5px' }}
        stylePager={{ width: '50%', borderRadius: '0', backgroundColor: '#d8d8d8' }}
        styleNextPrevButton={{ color: '#02ddd2' }}
        styleDataEachPage={{ borderRadius: '0', backgroundColor: '#d8d8d8' }}
      />
    </div>
  );
}


export default App;
```
