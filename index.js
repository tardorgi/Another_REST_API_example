//npms a serem usadas na API
const express = require('express');
const app = express();
const http = require('https');

//variável salva para ser usada depois, caso ela não existisse aqui
//o código quebra mais tarde.
let display = '';

//link passado para nós
const link = 'https://jsonplaceholder.typicode.com/todos'

//aqui criamos uma requisição para o express, onde ele recebe uma requisição, que mais tarde será
//o id para buscar na lista passada, e nos dara uma resposta, que no caso será uma, que usaremos
//para indicar se todo o processo deu certo.
app.get('/:id', async(req, resp) => {

    //pedimos para tentar pegar o link e nos devolver uma resposta em formato http, onde a informação
    //pode ser qualquer coisa, como indicado no let data = ''.
    try {
        http.get(link, (http_res) => {
            let data = '';

            //aqui existe para que não procure números além dos que temos na lista.
            http_res.on('data', (chunk) => {
                data += chunk
             });

             //pegamos aquela resposta em formato http, tranformamos em JSON
             http_res.on('end', async () => {
                const listaFormatada = (JSON.parse(data));

                //criamos uma forma de encontrar o id que pedimos em meio a lista passada para nós.
                const selectedData = listaFormatada.find((elem) => elem.id === Number(req.params.id));
                
                //por fim, pedimos para a informação da lista ser pega e tranformada naquela
                //variável declarada no começo, caso ela fosse declarada agora, o código quebra.
                const { title } = await selectedData;
                display = title;
             });
            });
            //aqui finalmente, pedimos o status 200, de sucesso, e para enviar a informação
            //que convertemos, no caso, o título(nomeado display).
            resp.status(200).send(display);
        
    //caso desse errado, receberiamos no console a mensagem de erro.
 } catch (error) {console.error(error)}
    
});

//pedindo ao express criar uma rota na porta 3000.
app.listen('3000')