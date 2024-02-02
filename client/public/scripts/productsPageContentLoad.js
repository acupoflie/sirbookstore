



console.log('hello');

const jwtString = 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjExMzI4OTYzMzQwYWYyYzI4ZDM1MiIsImlhdCI6MTcwNjgzNDI4NSwiZXhwIjoxNzA2ODM3ODg1fQ.gipl_8Ukg3Wb-7m1_zAoCwUM_vOwJF2yQB7UjQqQuJc';

// document.cookie= "";
document.cookie = jwtString
// document.cookie = document.cookie + '=; expires=' + new Date(0).toUTCString();

console.log(document.cookie)


fetch('http://localhost:3355/books', {
    credentials: 'include',
    method: 'GET',
    headers: {
        // 'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjExMzI4OTYzMzQwYWYyYzI4ZDM1MiIsImlhdCI6MTcwNjgwNjgxMiwiZXhwIjoxNzA2ODA3NDEyfQ.km_GniECHaBUXEGVHE53eSIo0mI59KguzjE8dtOflXE',
        // 'Content-type': 'application/json'
    }
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        loadBooks(data);
    });


function loadBooks(data) {
    let cards = document.querySelectorAll('.tiles article');
    const books = data['data']['books'];

    cards.forEach((card, index) => {
        card.querySelector('h2').textContent = books[index].name;
        card.querySelector('strong').textContent = '$' + books[index].price;
        card.querySelector('del').setAttribute('style', 'display : none');
        card.querySelector('.desc').textContent = books[index].author;
    })
}