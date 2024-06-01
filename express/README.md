read me node-ts-

aplicação em express para upload de files organizados em pastas utilizando multer para upload.


para rodar a aplicação basta:

 1. cd express/
 2. npm install
 3. node app.js
 
 run port 3000

usar alguma aplicação para teste de apis como postman para bater nas rotas.

1. criar um usuario, que irá criar uma pasta onde os arquivos daquele usuario serão salvos:

    - curl --location --request POST 'http://127.0.0.1:3000/create/user/<user>'

2. deletar um usuario, a pasta do usuario e todo o conteudo será deletado:

    - curl --location --request DELETE 'http://127.0.0.1:3000/user/carlos'

3. registrar (upload) de um file:

    - curl  --location 'http://127.0.0.1:3000/register/file' \
            --header 'user: USER' \
            --form 'folder="NAME FOLDER"' \
            --form 'file=@"PATH FILE.png"'
 
4. retornar arquivo salvo em pasta do usuario, é necessario ter o nome do arquivo e pasta para requisição:

    - curl --location 'http://127.0.0.1:3000/file/<folder>/<file_name>' \--header 'user: USER'

5. retornar todos os nomes dos arquivos salvos em uma determinada pasta:

    - curl --location 'http://127.0.0.1:3000/files/available/<folder>' \
           --header 'user: USER'

6. deletar arquivo salvo em pasta do usuario:

    - curl --location --request DELETE 'http://127.0.0.1:3000/file/<folder>/<file>' \
           --header 'user: delete'

7. deletar pasta de arquivos do usuario:

    - curl --location --request DELETE 'http://127.0.0.1:3000/file/<folder>' \
           --header 'user: USER'