export default function SearchBar() {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    var cities: Cities[] = [];
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(data));
    console.log(cities);
    return (
        <>
            <input type="text" /><button>Acept</button>
        </>
    )
}