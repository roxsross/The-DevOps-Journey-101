const root = document.querySelector("#root")

const home = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>Home</h2>
        `

    const readerp = container.appendChild(document.createElement('p'))
    const writerp = container.appendChild(document.createElement('p'))
    readerhealth(readerp)
    writerhealth(writerp)
    container.classList.add("mx-auto","align-middle","container")

    return container;
};

const reader = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>Reader Screen</h2>
        `
    const child = container.appendChild(document.createElement('p'))
    readData(child)
    container.classList.add("mx-auto","align-middle","container")

    return container;
};

const writer = () => {
    const container = document.createElement('div');
    container.innerHTML = `
        <h2>Writer Screen</h2>
        <form id="submitdata" role="form">
          <div class="form-group">
            <label for="text">Key Content:</label>
            <input type="text" class="form-control" id="post">
          </div>
          <button type="submit" class="btn btn-default">Enviar</button>
        </form>
    `
    container.classList.add("mx-auto","align-middle","container")
    const formsubmit = container.querySelector("#submitdata")
    formsubmit.addEventListener('submit',writeData)
    return container;
}

const readerhealth = (readerparagraph) => {
    const url='http://localhost:8080/health';
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }).then( response => {
        response.text().then(body => {
            assembleStatus(readerparagraph, "Reader", body)
        }).catch(err => {
            assembleStatus(readerparagraph, "Reader", "down")
        })
    })
    .catch( error => {
        console.log(error)
        assembleStatus(readerparagraph,"Reader","down")
    })
}

 const writerhealth = (writerparagraph) => {
    const url='http://localhost:8081/health';
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }).then( response => {
        response.text().then(body => {
            assembleStatus(writerparagraph, "Writer", body)
        }).catch(err => {
            assembleStatus(writerparagraph, "Writer", "down")
    })
    }).catch( error => {
        assembleStatus(writerparagraph,"Writer","down")
    })
}

const assembleStatus = (paragraph, service, status) => {
    let statusIcon = 'danger'
    let statusBadge = 'danger'
    if (status == "up") {
        statusIcon = 'success'
        statusBadge = 'success'
    }
    paragraph.innerHTML=
            service + ' service status <span class="badge badge-'+statusBadge+'">'+status+'</span>'
}

async function writeData(e) {
    e.preventDefault();

    const url='http://localhost:8081/write';
    fetch(url, {
        method: "POST",
        body: e.target.elements.post.value,
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }).then( response => {

    }).catch( error => {
        console.log(error)
    })
}

const readData = (paragraph) => {
    const url='http://localhost:8080/data';
    fetch(url, {
        method: "GET",
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    }).then( response => {
        response.text().then(body => {
            paragraph.innerHTML = "Valor encontrado = "+body
        }).catch(err => {
            paragraph.innerHTML = `
            <div class="alert alert-warning" role="alert">
              Ocorreu um erro ao buscar a chave
            </div>
        `
        })
    })
        .catch( error => {
            console.log(error)
        })
}


const routes = {
    home: home(),
    reader: reader(),
    writer: writer(),
}

const validateHash = (hash) => hash === ""  ? 'home' : hash.replace('#', '');
const init = () => window.addEventListener('hashchange', renderPage);

const renderPage = () => {
    const page = validateHash(window.location.hash);
    root.innerHTML = '';
    root.appendChild(routes[page])
}

window.addEventListener('load', ()=> {
    renderPage();
    init();
});